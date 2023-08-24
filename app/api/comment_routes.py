from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from app.models import Comment, db
from app.forms import EditCommentForm


comment_routes = Blueprint('comments', __name__)


# Edit  Comment
@comment_routes.route('/edit/<int:commentId>', methods=['PUT'])
@login_required
def editComment(commentId):

    form = EditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        comment = Comment.query.get(commentId)
        comment.content=form.data['content']

        db.session.commit()
        return comment.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}


# Delete a Comment
@comment_routes.route('/<int:commentId>', methods=['DELETE'])
@login_required
def deleteComment(commentId):

    current_user_id = current_user.to_dict()['id']
    comment = Comment.query.get(commentId)

    if not comment:
        return {'errors': "Comment not found"}, 400
    if (current_user_id != comment.user_id):
        return {'errors': "can only delete your own review"}, 401

    db.session.delete(comment)
    db.session.commit()

    return {"message":f"Successfully deleted comment {commentId}"}
