from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Board, db
from .auth_routes import validation_errors_to_error_messages
from app.forms import BoardForm, EditBoardForm


board_routes = Blueprint('boards', __name__)


# Post a new Board
@board_routes.route('/new-board', methods=['POST'])
@login_required
def createBoard():

    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_board = Board(
            title = form.data['title'],
            description = form.data['description'],
            user_id = form.data['user_id']
        )

        db.session.add(new_board)
        db.session.commit()
        return new_board.to_dict()

    print(form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}


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
