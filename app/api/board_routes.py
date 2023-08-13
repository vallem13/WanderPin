from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Board, db
from .auth_routes import validation_errors_to_error_messages


board_routes = Blueprint('boards', __name__)


# Get all Boards
@board_routes.route('/')
def getAllBoards():

    boards = Board.query.all()
    return [board.to_dict() for board in boards]


# Get Board by ID
@board_routes.route('/<int:boardId>')
def getSingleBoard(boardId):

    board = Board.query.get(boardId)
    return board.to_dict()
