from flask import request, session
from flask_restful import Resource
from config import app
from models import *

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

def Login(Resource):
  pass

def Logout(Resource):
  pass

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
