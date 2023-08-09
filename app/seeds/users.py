from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io',
        password='password',
        profile_img='https://media.self.com/photos/5f0885ffef7a10ffa6640daa/4:3/w_5240,h_3929,c_limit/travel_plane_corona.jpeg',
        first_name = 'Demo',
        last_name = 'User',
        birth_date = date(2000, 10, 6),
        country = 'USA',
        interests = 'travel, backpack, nooks and crevices'
    )
    natalia = User(
        email='natalia@aa.io',
        password='password',
        profile_img='https://media.self.com/photos/5f0885ffef7a10ffa6640daa/4:3/w_5240,h_3929,c_limit/travel_plane_corona.jpeg',
        first_name = 'Natalia',
        last_name = 'Ramirez',
        birth_date = date(1992, 1, 1),
        country = 'USA',
        interests = 'I love the ocean, anything island related. I am an island boy if you may ;)'
    )
    makayla = User(
        email='makayla@aa.io',
        password='password',
        profile_img='https://media.self.com/photos/5f0885ffef7a10ffa6640daa/4:3/w_5240,h_3929,c_limit/travel_plane_corona.jpeg',
        first_name = 'Makayla',
        last_name = 'Jameson',
        birth_date = date(1994, 8, 9),
        country = 'USA',
        interests = 'I love hiking and National Parks. Nature fan! Experience different cultures.'
    )

    db.session.add(demo)
    db.session.add(natalia)
    db.session.add(makayla)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
