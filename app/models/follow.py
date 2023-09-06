from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from datetime import datetime


class Follow(db.Model):
    __tablename__ = 'follows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    # foreignkeys
    current_user = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    following_user = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    # relationships
    follower = db.relationship('User', foreign_keys=[current_user], back_populates='follower')
    following = db.relationship('User', foreign_keys=[following_user], back_populates='following')

    def to_dict(self):
        return {
            'id': self.id,
            'current_user': self.current_user,
            'following_user': self.following_user,
            'created_at': self.created_at
        }
