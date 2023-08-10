from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from .aws_helpers import (upload_file_to_s3, get_unique_filename)
from app.models import Pin, db
from app.forms import PinForm


pin_routes = Blueprint('pins', __name__)


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
@pin_routes.route('/')
def getAllPins():

    pins = Pin.query.all()
    return [pin.to_dict() for pin in pins]


# Get Pin by ID
@pin_routes.route('/<int:pinId>')
def getSinglePin(pinId):

    pin = Pin.query.get(pinId)
    return pin.to_dict()
