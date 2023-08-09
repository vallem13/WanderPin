from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
from datetime import datetime


class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    type = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    # foreignkeys
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    # relationships
    user = db.relationship('User', back_populates='boards')
    pins_boards = db.relationship('PinBoard', back_populates='boards', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'type': self.type,
            'user_id': self.user_id,
            'pins_boards': [pin_board.to_dict() for pin_board in self.pins_boards],
            'created_at': self.created_at
        }
