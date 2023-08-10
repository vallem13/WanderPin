from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
from datetime import datetime


class Pin(db.Model):
    __tablename__ = 'pins'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    alt_text = db.Column(db.String(255), nullable=True)
    website = db.Column(db.String(255), nullable=True)
    images = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

     # foreignkeys
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    # relationships
    user = db.relationship('User', back_populates='pins')
    pins_boards = db.relationship('PinBoard', back_populates='pins', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'alt_text': self.alt_text,
            'website': self.website,
            'images': self.images,
            'user_id': self.user_id,
            'user': {
                'id': self.user.id,
                'firstName': self.user.first_name,
                'profile_img': self.user.profile_img,
            },
            'pins_boards': [pin_board.to_dict() for pin_board in self.pins_boards],
            'created_at': self.created_at
        }
