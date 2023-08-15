from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class PinBoardForm(FlaskForm):
    pin_id = IntegerField('pin_id', validators=[DataRequired()])
    board_id = IntegerField('board_id', validators=[DataRequired()])
