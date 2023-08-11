from flask.cli import AppGroup
from .users import seed_users, undo_users
from .pins import seed_pins, undo_pins
from .boards import seed_boards, undo_boards
from .pins_boards import seed_pins_boards, undo_pins_boards

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_pins_boards()
        undo_boards()
        undo_pins()
        undo_users()

    seed_users()
    seed_pins()
    seed_boards()
    seed_pins_boards()

    print('------> db seeded')


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_pins_boards()
    undo_boards()
    undo_pins()
    undo_users()

    print('------> db unseeded')
