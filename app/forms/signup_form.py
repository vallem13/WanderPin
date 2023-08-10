from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, DateField, SelectField, TextAreaField, FileField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, ValidationError, EqualTo, Length
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def is_valid_email(form, field):
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    email = field.data
    if not re.match(email_pattern, email):
        raise ValidationError('Invalid email address.')


class SignUpForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), user_exists, is_valid_email])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6)])
    # confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    profile_img = FileField('Profile Image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    birth_date = DateField('Birth Date', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    interests = TextAreaField('Interests', validators=[Length(max=1000)])
