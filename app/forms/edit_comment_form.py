from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired


class EditCommentForm(FlaskForm):
    content = TextAreaField('content', validators=[DataRequired()])
