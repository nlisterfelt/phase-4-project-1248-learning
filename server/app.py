from flask import request, session
from flask_restful import Resource
from config import app
from models import *

def Signup(Resource):
  pass

def Login(Resource):
  pass

def Logout(Resource):
  pass

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
