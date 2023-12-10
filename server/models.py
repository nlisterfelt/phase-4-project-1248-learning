from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-_password_hash', '-decks.user')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)

    decks = db.relationship('Deck', backref='user')
    cards = db.relationship('Card', backref='user')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}>'

class Deck(db.Model, SerializerMixin):
    __tablename__ = 'decks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def __repr__(self):
        return f'<Deck {id}: {name}'

class Card(db.Model, SerializerMixin):
    __tablename__ = 'cards'
    
    id = db.Column(db.Integer, primary_key=True)
    front_title = db.Column(db.String, nullable=False)
    front_description = db.Column(db.String)
    front_image = db.Column(db.String)
    back_title = db.Column(db.String)
    back_description = db.Column(db.String)
    back_image = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f'<Card {id}: {front_title}>'

