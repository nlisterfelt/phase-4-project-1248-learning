from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-_password_hash',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hasses may not be viewed.')

    @password_hash.setter
    def password_hash(self):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def __repr__(self):
        return f'<User {self.username}>'
