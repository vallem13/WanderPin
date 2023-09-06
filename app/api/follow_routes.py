from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from app.models import Follow, db
from app.forms import FollowForm


follow_routes = Blueprint('follows', __name__)


# Unfollow a User
@follow_routes.route('/<int:followId>', methods=['DELETE'])
@login_required
def unfollowUser(followId):

    follow = Follow.query.get(followId)

    if not follow:
        return {'errors': "follow not found"}, 400

    db.session.delete(follow)
    db.session.commit()

    return {"message":f"Successfully deleted {follow}"}


# Follow a User
@follow_routes.route('/follow', methods=['POST'])
@login_required
def followUser():

    form = FollowForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_follow = Follow(
            current_user = form.data['current_user'],
            following_user = form.data['following_user']
        )

        db.session.add(new_follow)
        db.session.commit()
        return new_follow.to_dict()

    return {'errors': "Could not follow User"}, 500



# Get all Follows
@follow_routes.route('')
def getAllFollows():

    follows = Follow.query.all()
    return [follow.to_dict() for follow in follows]
