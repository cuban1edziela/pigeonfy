from flask import Flask
from flask import *
import sqlalchemy
from db import Database
from flask_cors import *
import enciphering
import deciphering
# from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
# db = SQLAlchemy(app)
CORS(app)


@app.route('/')
def home_page():
    return "PIGEONFY API: /message/encipher ; /message/decipher ; /contacts"


@app.route('/message/encipher', methods=['POST'])
def encipher_user_message():
    recieved_file = request.json
    message = recieved_file['message']
    n = recieved_file['n']
    e = recieved_file['e']
    enciphered_message = enciphering.encipher(message, int(n), int(e))
    return jsonify(response=enciphered_message)


@app.route('/message/decipher', methods=['POST'])
def decipher_user_message():
    recieved_file = request.json
    message = recieved_file['message']

    deciphered_message = deciphering.decipher(message)
    return jsonify(response=deciphered_message)

@app.route('/user-table', methods=['GET', 'POST'])
def create_user_table():
    recieved_file = request.json
    user_uid = recieved_file['uid']



app.run()
