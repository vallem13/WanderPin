from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Pin


user_routes = Blueprint('pins', __name__)
