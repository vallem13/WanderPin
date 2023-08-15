from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Board, db, Pin, PinBoard
from .auth_routes import validation_errors_to_error_messages
from app.forms import BoardForm, EditBoardForm, PinBoardForm


board_routes = Blueprint('boards', __name__)


# Remove Pin from Board
@board_routes.route('/<int:boardId>/removePin/<int:pinId>', methods=['DELETE'])
@login_required
def removePinBoard(boardId, pinId):

    board = Board.query.get(boardId)
    board.pins = [pin for pin in board.pins if pin.id != pinId]

    db.session.commit()
    return board.to_dict()


# Add Pin to Board
@board_routes.route('/addPin', methods=['PUT'])
@login_required
def addPinBoard():

    form = PinBoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

            board = Board.query.get(form.data['board_id'])
            pin = Pin.query.get(form.data['pin_id'])

            if not board or not pin:
                return {'errors': "Invalid board_id or pin_id"}, 400

            board.pins_boards.append(PinBoard(pin_id=pin.id))

            db.session.commit()
            return board.to_dict()

    return {'errors': form.errors}, 400


# Delete Board
@board_routes.route('/<int:boardId>', methods=['DELETE'])
@login_required
def deletePin(boardId):

    current_user_id = current_user.to_dict()['id']
    board_owner = Board.query.get(boardId)

    if not board_owner:
        return {'errors': "board not found"}, 400
    if (current_user_id != board_owner.user_id):
        return {'errors': "can only delete your own board"}, 401

    db.session.delete(board_owner)
    db.session.commit()

    return {"message":f"Successfully deleted {board_owner}"}


# Edit a Board
@board_routes.route('/edit/<int:boardId>', methods=['PUT'])
@login_required
def editBoard(boardId):

    form = EditBoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        board = Board.query.get(boardId)

        board.title = form.data['title']
        board.description = form.data['description']

        db.session.commit()

        return board.to_dict()

    return {'errors': "Could not edit Board"}, 500



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
