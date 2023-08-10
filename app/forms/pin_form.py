from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField, TextAreaField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired


class PinForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    alt_text = StringField('alt_text')
    website = StringField('website')
    images = FileField('Profile Image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    user_id = IntegerField('user_id', validators=[DataRequired()])
