#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
#from faker import Faker

# Local imports
from app import app
from models import db, User

if __name__ == '__main__':
    #fake = Faker()
    with app.app_context():
        print("Starting seed...")
        User.query.delete()
        print("Creating users...")
        users = []
        usernames = []
        for i in range(10):
            username = f'name{i}'
            usernames.append(username)
            user = User(
                username = username,
            )
            user.password_hash = user.username + 'password'
            users.append(user)
        db.session.add_all(users)
        db.session.commit()
        print("Complete.")