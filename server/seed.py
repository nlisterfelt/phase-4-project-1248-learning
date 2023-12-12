#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Deck, Card

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        fake = Faker()
        print("Starting seed...")
        User.query.delete()
        Deck.query.delete()
        Card.query.delete()
        print("Creating users...")
        users = []
        for i in range(5):
            username = f'name{i}'
            user = User(
                username = username,
            )
            user._password_hash = user.username + 'password'
            users.append(user)
            print("Creating decks...")
            deck = Deck(
                name = f'deck_name{i}',
            )
            deck.user_id = i
            db.session.add(deck)
            print("Creating cards")
            for j in range(10): 
                card = Card(
                    front_title = fake.word(),
                    front_description = fake.sentence(),
                    front_image = 'https://mindyourdecisions.com/blog/wp-content/uploads/2022/11/right-triangle-angle-bisector-hypotenuse-problem.png',
                    back_title = fake.word(),
                    back_description = fake.sentence(),
                    back_image = 'https://test-preparation.ca/wp-content/uploads/2019/02/Pythagorean5.jpg',
                )
                card.user_id = i
                db.session.add(card)

        db.session.add_all(users)

        db.session.commit()
        print("Complete.")