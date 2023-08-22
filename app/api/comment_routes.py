from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from app.models import Comment, db
from app.forms import CommentForm


comment_routes = Blueprint('comments', __name__)


# Post a new Comment
@comment_routes.route('/<int:pinId>', methods=['POST'])
@login_required
def createComment(pinId):

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_comment = Comment(
            content = form.data['content'],
            pin_id = pinId,
            user_id = current_user.id
        )

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}
