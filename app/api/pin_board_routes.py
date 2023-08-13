from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import PinBoard, db
from .auth_routes import validation_errors_to_error_messages


pin_board_routes = Blueprint('pins_boards', __name__)


# Get all Pins-Boards
@pin_board_routes.route('/')
def getAllPinBoards():

    pins_boards = PinBoard.query.all()
    return [pin_board.to_dict() for pin_board in pins_boards]


# Get Pin-Board by ID
@pin_board_routes.route('/<int:pinBoardId>')
def getSinglePinBoard(pinBoardId):

    pin_board = PinBoard.query.get(pinBoardId)
    return pin_board.to_dict()
