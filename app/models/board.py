from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from datetime import datetime
from .pin import Pin
from .pin_board import PinBoard


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

        pins = Pin.query.join(PinBoard).filter(PinBoard.board_id == self.id).all()
        # pinBoard = PinBoard.query.filter(PinBoard.board_id == self.id).first()

        numPins = len(pins)

        pinImgs = []

        if numPins > 0:
            pinImgs = [pin.images for pin in pins]

        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'numPins': numPins,
            'pinImgs': pinImgs,
            # 'pins_boards': [pin.to_dict() for pin in self.pins_boards],
            'created_at': self.created_at
        }
