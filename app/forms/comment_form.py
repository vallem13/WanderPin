from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    content = TextAreaField('content', validators=[DataRequired()])
    pin_id = IntegerField('pin_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
