from flask import Flask
from flask import *
from db import Database
from flask_cors import *
import enciphering
import deciphering

db = Database('contacts.db')
list = []
for row in db.fetch():
    list.append(row)

app = Flask(__name__)
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


@app.route('/contacts', methods=['GET', 'POST'])
def get_contacts():
    return jsonify(list)


app.run()
