from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text


def seed_boards():

    board1 = Board(
        user_id = 1,
        title = 'Nooks and Crooks',
        description = 'Hidden gems around the world'
    )
    board2 = Board(
        user_id = 1,
        title = 'Retreats',
        description = 'The best places to retreat and relax'
    )
    board3 = Board(
        user_id = 2,
        title = 'Adventure',
        description = 'Top spots for adrenaline seekers'
    )
    board4 = Board(
        user_id = 2,
        title = 'Honeymoon Spots',
        description = 'Best resots for the perfect honeymoon'
    )
    board5 = Board(
        user_id = 1,
        title = 'New Board',
        description = 'Empty'
    )

    boards_list = [board1, board2, board3, board4, board5]
    single_board = [db.session.add(board) for board in boards_list]
    db.session.commit()

def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
