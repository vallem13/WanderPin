from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

     # foreignkeys
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("pins.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    # relationships
    user = db.relationship('User', back_populates='comments')
    pin = db.relationship('Pin', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'pin_id': self.pin_id,
            'user_id': self.user_id,
            'user': {
                'id': self.user.id,
                'firstName': self.user.first_name,
                'profile_img': self.user.profile_img,
            },
            'created_at': self.created_at
        }
