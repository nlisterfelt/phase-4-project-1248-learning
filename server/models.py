from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
from sqlalchemy.orm import validates

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-_password_hash', '-decks.cards', '-decks.reviews', '-cards.decks', '-cards.reviews', '-reviews')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)

    decks = db.relationship('Deck', backref='user')
    cards = db.relationship('Card', backref='user')
    reviews = db.relationship('Review', backref='user')

    @validates("username")
    def check_username(self, key, username):
        if(len(username)<3 or len(username)>30):
            raise ValueError("Username must be between 3 and 30 characters long.")
        return username

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}>'

class Deck(db.Model, SerializerMixin):
    __tablename__ = 'decks'
    serialize_rules=('-user', '-reviews', 'cards', '-cards.reviews', '-cards.decks')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    reviews = db.relationship('Review', back_populates = 'deck')
    cards = association_proxy('reviews', 'card')

    def __repr__(self):
        return f'<Deck {self.id}: {self.name}'

class Card(db.Model, SerializerMixin):
    __tablename__ = 'cards'
    serialize_rules = ('-user', '-reviews.user', '-reviews.card', '-reviews.deck', 'decks', '-decks.reviews', '-decks.cards')
    
    id = db.Column(db.Integer, primary_key=True)
    front_title = db.Column(db.String, nullable=False)
    front_description = db.Column(db.String)
    front_image = db.Column(db.String)
    back_title = db.Column(db.String)
    back_description = db.Column(db.String)
    back_image = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    reviews = db.relationship('Review', back_populates = 'card')
    decks = association_proxy('reviews', 'deck')

    def __repr__(self):
        return f'<Card {self.id}: {self.front_title}>'


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    serialize_rules = ('-user', '-card.reviews', '-deck.reviews')

    id = db.Column(db.Integer, primary_key=True)
    session = db.Column(db.Integer)
    level = db.Column(db.Integer)

    deck_id = db.Column(db.Integer, db.ForeignKey('decks.id'))
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    deck = db.relationship('Deck', back_populates='reviews')
    card = db.relationship('Card', back_populates='reviews')

    def __repr__(self):
        return f'<Review {self.id}>'

