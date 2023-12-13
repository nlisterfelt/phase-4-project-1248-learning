from flask import request, session, make_response
from flask_restful import Resource
from config import app, api, db
from models import *

@app.route('/signup', methods=['POST'])
def signup():
  if request.method == 'POST':
    new_user = User(
      username = request.get_json()['username']
    )
    user._password_hash = request.get_json()['password']
    try:
      db.session.add(user)
      db.session.commit()
      session['user_id']=user.id
      return user.to_dict(), 201
    except IntegrityError:
      return make_response({"error": "422 Unprocessable entity."}, 422)

@app.route('/check_session', methods=['GET'])
def check_session():
  if request.method == 'GET':
    user_id = session['user_id']
    if user_id:
      user = User.query.filter(User.id==user_id).first()
      return user.to_dict(), 200
    return {}, 401

@app.route('/users', methods=['GET'])
def users():
  if request.method == 'GET':
    return make_response([user.to_dict() for user in User.query.all()], 200)

@app.route('/decks', methods=['GET'])
def decks():
  if request.method == 'GET':
    return make_response([deck.to_dict() for deck in Deck.query.all()], 200)

@app.route('/cards', methods=['GET'])
def cards():
  if request.method == 'GET':
    return make_response([card.to_dict() for card in Card.query.all()], 200)

'''
def Signup(Resource):
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

api.add_resource(Signup, '/signup', endpoint='signup')
'''
if __name__ == "__main__":
  app.run(port=5555, debug=True)
