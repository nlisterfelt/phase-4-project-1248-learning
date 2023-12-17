from flask import request, session, make_response
from flask_restful import Resource
from config import app, api, db
from models import *
'''
@app.before_request
def is_logged_in():
  open_access=['login','check_session','signup']
  if request.endpoint not in open_access and not session.get('user_id'):
    return {'error': 'unauthorized'}, 401
'''
class Signup(Resource):
  def post(self):
    user = User(
      username = request.get_json().get('username')
    )
    user.password_hash = request.get_json().get('password')
    try:
      db.session.add(user)
      db.session.commit()
      session['user_id']=user.id
      return user.to_dict(), 201
    except IntegrityError:
      return {"error": "422 Unprocessable entity."}, 422

class CheckSession(Resource):
  def get(self):
    user_id = session['user_id']
    if user_id:
      user = User.query.filter(User.id==user_id).first()
      return user.to_dict(), 200
    return {}, 401

class Login(Resource):
  def post(self):
    username = request.get_json()['username']
    password = request.get_json()['password']
    
    user = User.query.filter(User.username == username).first()
    if user:
      if user.authenticate(password):
        session['user_id']=user.id
        return user.to_dict(), 200
    return {"error": "unathorized"}, 401

class Logout(Resource):
  def delete(self):
    session['user_id']=None
    return {}, 204

class Users(Resource):
  def get(self):
    return make_response([user.to_dict() for user in User.query.all()], 200)

class Decks(Resource):
  def get(self):
    return make_response([deck.to_dict() for deck in Deck.query.all()], 200)

  def post(self):
    name = request.get_json()['name']
    user_id = request.get_json()['user_id']
    try:
      new_deck = Deck(name=name, user_id=user_id)
      db.session.add(new_deck)
      db.session.commit()
      return new_deck.to_dict(), 200
    except:
      return {"error": "unprocessable entity"}, 422

class Cards(Resource):
  def get(self):
    return make_response([card.to_dict() for card in Card.query.all()], 200)

api.add_resource(Signup, '/api/signup', endpoint='signup')
api.add_resource(CheckSession, '/api/check_session', endpoint='check_session')
api.add_resource(Users, '/api/users', endpoint='users')
api.add_resource(Decks, '/api/decks', endpoint='decks')
api.add_resource(Cards, '/api/cards', endpoint='cards')
api.add_resource(Logout, '/api/logout', endpoint='logout')
api.add_resource(Login, '/api/login', endpoint='login')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
