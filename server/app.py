from flask import request, session, make_response
from flask_restful import Resource
from config import app, api, db
from models import *
from sqlalchemy.exc import IntegrityError


# @app.before_request
# def is_logged_in():
#   open_access=['login','check_session','signup']
#   if request.endpoint not in open_access and not session.get('user_id'):
#     return {'error': 'unauthorized'}, 401

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
      return {"error": "Already exists"}, 422
    except ValueError:
      return {"error": str(error)}

class CheckSession(Resource):
  def get(self):
    user_id = session.get('user_id')
    if user_id:
      user = User.query.filter(User.id==user_id).first()
      return user.to_dict(), 200
    return {}, 205

class Login(Resource):
  def post(self):
    username = request.get_json()['username']
    password = request.get_json()['password']
    
    user = User.query.filter(User.username == username).first()
    if user:
      if user.authenticate(password):
        session['user_id']=user.id
        return user.to_dict(), 201
    return {"error": "User not found"}, 401

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
    try:
      new_deck = Deck(name=name, user_id=session.get('user_id'))
      db.session.add(new_deck)
      db.session.commit()
      return new_deck.to_dict(), 201
    except IntegrityError:
      return {"error": "Deck already exists"}, 422
    except ValueError:
      return {"error": str(error)}

class DecksById(Resource):
  def delete(self, id):
    deck=Deck.query.filter(Deck.id==id).first()
    if deck:
      db.session.delete(deck)
      db.session.commit()
      return {}, 204
    return {"error": "deck not found"}, 404    

  def patch(self, id):
    deck=Deck.query.filter(Deck.id==id).first()
    if deck:
      setattr(deck, 'name', request.get_json()['name'])
      db.session.add(deck)
      db.session.commit()
      return make_response(deck.to_dict(), 202)
    return {"error": "deck not found"}, 404

class Cards(Resource):
  def get(self):
    return make_response([card.to_dict() for card in Card.query.all()], 200)

  def post(self):
    formData = request.get_json()
    user_id = session.get('user_id')
    try:
      new_card = Card(
        front_title=formData['front_title'],
        front_description=formData['front_description'],
        front_image=formData['front_image'],
        back_title=formData['back_title'],
        back_description=formData['back_description'],
        back_image=formData['back_image'],
        user_id=user_id
      )
      db.session.add(new_card)
      db.session.commit()
      return new_card.to_dict(), 201
    except:
      return {"error": "unprocessable entity"}, 422

class CardsById(Resource):
  def patch(self, id):
    card = Card.query.filter(Card.id==id).first()
    form_data = request.get_json()
    if card:
      for attr in form_data:
        setattr(card, attr, form_data.get(attr))
      db.session.add(card)
      db.session.commit()
      return make_response(card.to_dict(), 202)
    return {"error": "Card not found"}, 404

  def delete(self, id):
    card = Card.query.filter(Card.id==id).first()
    if card:
      db.session.delete(card)
      db.session.commit()
      return {}, 200
    return {"error": "Card not found"}, 404


class Reviews(Resource):
  def get(self):
    return make_response([review.to_dict() for review in Review.query.all()], 200)

  def post(self):
    formData = request.get_json()
    try:
      new_review = Review(
        session = 1,
        level = 1,
        deck_id = formData['deck_id'],
        card_id = formData['card_id'],
        user_id = session.get('user_id'),
      )
      db.session.add(new_review)
      db.session.commit()
      return new_review.to_dict(), 201
    except:
      return {"error": "unprocessable entity"}, 404

class ReviewsById(Resource):
  def patch(self, id):
    review = Review.query.filter(Review.id==id).first()
    if review:
      setattr(review, 'session', request.get_json()['session'])
      setattr(review, 'level', request.get_json()['level'])
      db.session.add(review)
      db.session.commit()
      return make_response(review.to_dict(), 202)
    return {"error": "review not found"}, 404

  def delete(self, id):
    review = Review.query.filter(Review.id==id).first()
    if review:
      db.session.delete(review)
      db.session.commit()
      return {}, 200
    return {"error": "review not found"}, 404

api.add_resource(Signup, '/api/signup', endpoint='signup')
api.add_resource(CheckSession, '/api/check_session', endpoint='check_session')
api.add_resource(Users, '/api/users', endpoint='users')
api.add_resource(Decks, '/api/decks', endpoint='decks')
api.add_resource(DecksById, '/api/decks/<int:id>', endpoint='decksById')
api.add_resource(Cards, '/api/cards', endpoint='cards')
api.add_resource(CardsById, '/api/cards/<int:id>', endpoint='cardsById')
api.add_resource(Logout, '/api/logout', endpoint='logout')
api.add_resource(Login, '/api/login', endpoint='login')
api.add_resource(Reviews, '/api/reviews', endpoint='reviews')
api.add_resource(ReviewsById, '/api/reviews/<int:id>', endpoint='reviewsById')
@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")
if __name__ == "__main__":
  app.run(port=5555, debug=True)
