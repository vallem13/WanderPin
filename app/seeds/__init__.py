from flask.cli import AppGroup
from .users import seed_users, undo_users
from .pins import seed_pins, undo_pins

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_pins()
        undo_users()

    seed_users()
    seed_pins()

    print('------> db seeded')


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_pins()
    undo_users()

    print('------> db unseeded')
