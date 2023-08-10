from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from .aws_helpers import (upload_file_to_s3, get_unique_filename)
from app.models import Pin, db


pin_routes = Blueprint('pins', __name__)

# Get all Pins
@pin_routes.route('/')
@login_required
def getAllPins():

    pins = Pin.query.all()
    return [pin.to_dict() for pin in pins]


# Get Pin by ID
@pin_routes.route('/<int:pinId>')
@login_required
def get_restaurant(pinId):

    pin = Pin.query.get(pinId)
    return pin.to_dict()
