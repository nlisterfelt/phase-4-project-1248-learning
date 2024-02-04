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
    with app.app_context():
        print("Starting seed...")
        User.query.delete()
        Deck.query.delete()
        Card.query.delete()
        Review.query.delete()
        
        # Creating users
        print("Creating users...")
        user1 = User(
            username = 'username1',
        )
        password = 'abc'
        user1._password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        db.session.add(user1)

        # Creating decks
        print("Creating decks...")
        deck1 = Deck(
            name = 'deck1',
        )
        deck1.user_id = 1
        db.session.add(deck1)        
        
        deck2 = Deck(
            name = 'deck2',
        )
        deck2.user_id = 1
        db.session.add(deck2)

        # Creating cards
        print("Creating cards") 
        card1 = Card(
            front_title = 'front word 1',
            front_description = 'This is the front description.',
            front_image = 'https://mindyourdecisions.com/blog/wp-content/uploads/2022/11/right-triangle-angle-bisector-hypotenuse-problem.png',
            back_title = 'back word 1',
            back_description = "This is the back sentence",
            back_image = 'https://test-preparation.ca/wp-content/uploads/2019/02/Pythagorean5.jpg',
        )
        card1.user_id = 1
        db.session.add(card1)

        card2 = Card(
            front_title = 'front word 2',
            front_description = 'This is the front description.',
            front_image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Regular_tetrahedron_inscribed_in_a_sphere.svg/220px-Regular_tetrahedron_inscribed_in_a_sphere.svg.png',
            back_title = 'back word 2',
            back_description = "This is the back sentence",
            back_image = 'https://qph.cf2.quoracdn.net/main-qimg-7081845f872667c34b0542813fbf2ca1-lq',
        )
        card2.user_id = 1
        db.session.add(card2)

        card3 = Card(
            front_title = 'front word 3',
            front_description = 'This is the front description.',
            front_image = 'https://mindyourdecisions.com/blog/wp-content/uploads/2022/11/right-triangle-angle-bisector-hypotenuse-problem.png',
            back_title = 'back word 3',
            back_description = "This is the back sentence",
            back_image = 'https://test-preparation.ca/wp-content/uploads/2019/02/Pythagorean5.jpg',
        )
        card3.user_id = 1
        db.session.add(card3)

        # Creating reviews
        print("Creating review...")
        review1 = Review(
            session = 1,
            level = 3
        )
        review1.user_id=1
        review1.deck_id=1
        review1.card_id=1
        db.session.add(review1)

        review2 = Review(
            session = 1,
            level = 1
        )
        review2.user_id=1
        review2.deck_id=2
        review2.card_id=3
        db.session.add(review2)

        db.session.commit()
        print("Complete.")