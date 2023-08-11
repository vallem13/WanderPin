from app.models import db, PinBoard, environment, SCHEMA
from sqlalchemy.sql import text


def seed_pins_boards():

    pin_board1 = PinBoard(
        pin_id = 1,
        board_id = 1
    )
    pin_board2 = PinBoard(
        pin_id = 2,
        board_id = 1
    )
    pin_board3 = PinBoard(
        pin_id = 3,
        board_id = 1
    )
    pin_board4 = PinBoard(
        pin_id = 4,
        board_id = 1
    )
    pin_board5 = PinBoard(
        pin_id = 5,
        board_id = 1
    )
    pin_board6 = PinBoard(
        pin_id = 6,
        board_id = 2
    )
    pin_board7 = PinBoard(
        pin_id = 7,
        board_id = 2
    )
    pin_board8 = PinBoard(
        pin_id = 8,
        board_id = 2
    )
    pin_board9 = PinBoard(
        pin_id = 9,
        board_id = 2
    )
    pin_board10 = PinBoard(
        pin_id = 10,
        board_id = 2
    )
    pin_board11 = PinBoard(
        pin_id = 11,
        board_id = 3
    )
    pin_board12 = PinBoard(
        pin_id = 12,
        board_id = 3
    )
    pin_board13 = PinBoard(
        pin_id = 13,
        board_id = 3
    )
    pin_board14 = PinBoard(
        pin_id = 14,
        board_id = 3
    )
    pin_board15 = PinBoard(
        pin_id = 15,
        board_id = 3
    )
    pin_board16 = PinBoard(
        pin_id = 16,
        board_id = 4
    )
    pin_board17 = PinBoard(
        pin_id = 17,
        board_id = 4
    )
    pin_board18 = PinBoard(
        pin_id = 18,
        board_id = 4
    )
    pin_board19 = PinBoard(
        pin_id = 19,
        board_id = 4
    )
    pin_board20 = PinBoard(
        pin_id = 20,
        board_id = 4
    )

    pin_board21 = PinBoard(
        pin_id = 1,
        board_id = 2
    )
    pin_board22 = PinBoard(
        pin_id = 2,
        board_id = 3
    )
    pin_board23 = PinBoard(
        pin_id = 3,
        board_id = 4
    )

    pins_boards_list = [pin_board1, pin_board2, pin_board3, pin_board4, pin_board5, pin_board6, pin_board7, pin_board8, pin_board9, pin_board10, pin_board11, pin_board12, pin_board13, pin_board14, pin_board15, pin_board16, pin_board17, pin_board18, pin_board19, pin_board20, pin_board21, pin_board22, pin_board23]
    single_pin_board = [db.session.add(pin_board) for pin_board in pins_boards_list]
    db.session.commit()

def undo_pins_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins_boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins_boards"))

    db.session.commit()
