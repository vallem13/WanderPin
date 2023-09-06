from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class FollowForm(FlaskForm):
    current_user = IntegerField('current_user', validators=[DataRequired()])
    following_user = IntegerField('following_user', validators=[DataRequired()])
