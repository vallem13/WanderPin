from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# DELETE user by ID
# @user_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_user(id):

#     if id > 5: # Protection for seeds
#         user = User.query.get(id)

#         if user.id:
#             db.session.delete(user)
#             db.session.commit()
#             logout_user()
#             return {'message': 'User deleted successfully'}, 200
#     return {'error': 'Unauthorized'}, 403


# # Edit a User
# @user_routes.route('/update/<int:id>', methods=['PUT'])
# @login_required
# def edit_user(id):

#     form = EditUserForm()

#     form['csrf_token'].data = request.cookies['csrf_token']

#     if id > 5 and form.validate_on_submit():

#         user = User.query.get(id)

#         if user.id:
#             user.email = form.data['email']
#             user.phone_number = form.data['phone_number']
#             user.first_name = form.data['first_name']
#             user.username = form.data['username']
#             user.last_name = form.data['last_name']
#             user.address = form.data['address']
#             user.city = form.data['city']
#             user.state = form.data['state']
#             user.zipcode = form.data['zipcode']

#             db.session.commit()
#             return user.to_dict()

#     print(form.errors)
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401
