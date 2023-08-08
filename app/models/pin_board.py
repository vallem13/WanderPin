from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
from datetime import datetime


class PinBoard(db.Model):
    __tablename__ = 'pins_boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    # foreignkeys
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id')))
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')))

    # relationships
    pins = db.relationship('Pin', back_populates='pins_boards')
    boards = db.relationship('Board', back_populates='pins_boards')
