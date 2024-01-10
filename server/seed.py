#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import User, Deck, Card, Review
from config import bcrypt, db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        fake = Faker()
        print("Starting seed...")
        User.query.delete()
        Deck.query.delete()
        Card.query.delete()
        Review.query.delete()
        print("Creating users...")
        
        user1 = User(
            username = 'username1',
        )
        password = 'abc'
        user1._password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        db.session.add(user1)

        print("Creating decks...")
        deck1 = Deck(
            name = 'deck1',
        )
        deck1.user_id = 1
        deck2 = Deck(
            name = 'deck2',
        )
        deck2.user_id = 1
        db.session.add_all([deck1, deck2])
        print("Creating cards") 
        card1 = Card(
            front_title = 'front word',
            front_description = 'This is the front description.',
            front_image = 'https://mindyourdecisions.com/blog/wp-content/uploads/2022/11/right-triangle-angle-bisector-hypotenuse-problem.png',
            back_title = 'back word',
            back_description = "This is the back sentence",
            back_image = 'https://test-preparation.ca/wp-content/uploads/2019/02/Pythagorean5.jpg',
        )
        card1.user_id = 1
        db.session.add(card1)
        card2 = Card(
            front_title = 'front word',
            front_description = 'This is the front description.',
            front_image = 'https://mindyourdecisions.com/blog/wp-content/uploads/2022/11/right-triangle-angle-bisector-hypotenuse-problem.png',
            back_title = 'back word',
            back_description = "This is the back sentence",
            back_image = 'https://test-preparation.ca/wp-content/uploads/2019/02/Pythagorean5.jpg',
        )
        card2.user_id = 1
        db.session.add(card2)

        print("Creating review...")
        review1 = Review(
            session = 1,
            level = 3
        )
        review1.user_id=1
        review1.deck_id=1
        review1.card_id=1

        review2 = Review(
            session = 3,
            level = 2
        )
        review2.user_id=1
        review2.deck_id=2
        review2.card_id=1
        
        review3 = Review(
            session = 1,
            level = 1
        )
        review3.user_id=1
        review3.deck_id=1
        review3.card_id=2

        review4 = Review(
            session = 1,
            level = 1
        )
        review4.user_id=1
        review4.deck_id=2
        review4.card_id=2
        db.session.add_all([review1, review2, review3, review4])

        db.session.commit()
        print("Complete.")