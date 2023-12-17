#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import User, Deck, Card
from config import bcrypt, db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        fake = Faker()
        print("Starting seed...")
        User.query.delete()
        Deck.query.delete()
        Card.query.delete()
        print("Creating users...")
        
        user1 = User(
            username = 'username1',
        )
        password = 'abc'
        user1._password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        db.session.add(user1)

        print("Creating decks...")
        deck = Deck(
            name = 'deck1',
        )
        deck.user_id = 1
        db.session.add(deck)
        print("Creating cards") 
        card = Card(
            front_title = 'front word',
            front_description = 'This is the front description.',
            front_image = 'https://mindyourdecisions.com/blog/wp-content/uploads/2022/11/right-triangle-angle-bisector-hypotenuse-problem.png',
            back_title = 'back word',
            back_description = "This is the back sentence",
            back_image = 'https://test-preparation.ca/wp-content/uploads/2019/02/Pythagorean5.jpg',
        )
        card.user_id = 1
        db.session.add(card)

        db.session.commit()
        print("Complete.")