from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from .aws_helpers import (upload_file_to_s3, get_unique_filename)
from .auth_routes import validation_errors_to_error_messages
from app.models import Pin, Comment, db
from app.forms import PinForm, EditPinForm, CommentForm


pin_routes = Blueprint('pins', __name__)


# Create Comment for Pin
@pin_routes.route('/<int:pinId>/comments', methods=['POST'])
@login_required
def createComment(pinId):

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_comment = Comment(
            content = form.data['content'],
            pin_id = pinId,
            user_id = current_user.id
        )

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}



# Delete Pin
@pin_routes.route('/<int:pinId>', methods=['DELETE'])
@login_required
def deletePin(pinId):

    current_user_id = current_user.to_dict()['id']
    pin_owner = Pin.query.get(pinId)

    if not pin_owner:
        return {'errors': "pin not found"}, 400
    if (current_user_id != pin_owner.user_id):
        return {'errors': "can only delete your own pin"}, 401

    db.session.delete(pin_owner)
    db.session.commit()

    return {"message":f"Successfully deleted {pin_owner}"}


# Edit a Pin
@pin_routes.route('/edit/<int:pinId>', methods=['PUT'])
@login_required
def editPin(pinId):

    form = EditPinForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        pin = Pin.query.get(pinId)

        pin.name = form.data['name']
        pin.description = form.data['description']
        pin.alt_text = form.data['alt_text']
        pin.website = form.data['website']

        db.session.commit()

        return pin.to_dict()

    return {'errors': "Could not edit Pin"}, 500

# Post a new Pin
@pin_routes.route('/new-pin', methods=['POST'])
@login_required
def createPin():

    form = PinForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        image = form.data["images"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if 'url' not in upload:
            return upload['errors']

        new_pin = Pin(
            name = form.data['name'],
            description = form.data['description'],
            alt_text = form.data['alt_text'],
            website = form.data['website'],
            images = upload['url'],
            user_id = form.data['user_id']
        )

        db.session.add(new_pin)
        db.session.commit()
        return new_pin.to_dict()

    return {'errors': "Could not create new Pin"}, 500


# Get all Pins
@pin_routes.route('')
def getAllPins():

    pins = Pin.query.all()
    return [pin.to_dict() for pin in pins]


# Get Pin by ID
@pin_routes.route('/<int:pinId>')
def getSinglePin(pinId):

    pin = Pin.query.get(pinId)
    return pin.to_dict()
