from flask import request, session, make_response
from flask_restful import Resource
from config import app, api, db
from models import *

@app.before_request
def is_logged_in():
  open_access=['login','check_session','signup']
  if request.endpoint not in open_access and not session.get('user_id'):
    return {'error': 'unauthorized'}, 401

class Signup(Resource):
  def post(self):
    user = User(
      username = request.get_json().get('username')
    )
    user._password_hash = request.get_json().get('password')
    try:
      db.session.add(user)
      db.session.commit()
    except IntegrityError:
      return {"error": "422 Unprocessable entity."}, 422

class CheckSession(Resource):
  def get(self):
    user_id = session['user_id']
    if user_id:
      user = User.query.filter(User.id==user_id).first()
      return user.to_dict(), 200
    return {}, 401

class Users(Resource):
  def get(self):
    return make_response([user.to_dict() for user in User.query.all()], 200)

class Decks(Resource):
  def get(self):
    return make_response([deck.to_dict() for deck in Deck.query.all()], 200)

class Cards(Resource):
  def get(self):
    return make_response([card.to_dict() for card in Card.query.all()], 200)

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Users, '/users', endpoint='users')
api.add_resource(Decks, '/decks', endpoint='decks')
api.add_resource(Cards, '/cards', endpoint='cards')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
