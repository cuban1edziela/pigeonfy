from flask import Flask
from flask import *
from flask_cors import *
import enciphering
import deciphering
from keys_generator import key_generator
from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users_contacts.db'
db = SQLAlchemy(app)
CORS(app)

@dataclass
class NewUser:
    name: str
    n: int
    e: int
    id: int

@dataclass
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.String(28), nullable=False)
    e = db.Column(db.Integer, nullable=False)
    n = db.Column(db.Integer, nullable=False)
    d = db.Column(db.Integer, nullable=False)
    contacts = db.relationship('Users_contact', backref='uid', lazy=True)

    def __repr__(self):
        return f"User('{self.uid}')"

@dataclass
class Users_contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    surname = db.Column(db.String(60), nullable=False)
    n = db.Column(db.Integer, nullable=False)
    e = db.Column(db.Integer, nullable=False)
    user_uid = db.Column(db.String(28), db.ForeignKey(
        'user.uid'), nullable=False)

    def __repr__(self):
        return f"('{self.id} {self.name}''{self.surname}''{self.n}''{self.e}')"


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
    user_uid = recieved_file['uid']
    user = User.query.filter_by(uid=user_uid).first()
    
    deciphered_message = deciphering.decipher(message, user.n, user.d)
    return jsonify(response=deciphered_message)


@app.route('/new-user', methods=['GET', 'POST'])
def create_new_user():
    recieved_file = request.json
    user_uid = recieved_file['uid']
    numbers = key_generator()
    new_e = numbers[0]
    new_n = numbers[1]
    new_d = numbers[2]

    new_user = User(uid=user_uid, e=new_e, n=new_n, d=new_d)
    db.session.add(new_user)
    db.session.commit()
    return jsonify('New user created successfully')


@app.route('/add-contact', methods=['GET', 'POST'])
def add_contact():
    recieved_file = request.json
    user_uid = recieved_file['uid']
    new_contact_name = recieved_file['name']
    new_contact_surname = recieved_file['surname']
    new_contact_n = recieved_file['n']
    new_contact_e = recieved_file['e']

    new_contact = Users_contact(
        name=new_contact_name,
        surname=new_contact_surname,
        n=new_contact_n,
        e=new_contact_e,
        user_uid=user_uid
    )

    db.session.add(new_contact)
    db.session.commit()

    return jsonify('Contact added successfully')


@app.route('/remove-contact', methods=['GET', 'POST'])
def remove_contact():
    recieved_file = request.json
    contact_id = recieved_file['id']
    
    db.session.delete(Users_contact.query.filter_by(id=contact_id).first())
    db.session.commit()

    return jsonify('Contact removed successfully')


@app.route('/get-contacts', methods=['GET', 'POST'])
def get_user_contacts():
    recieved_file = request.json
    uid = recieved_file['uid']
    contacts = []

    if Users_contact.query.filter_by(user_uid=uid).all() == []:
        return jsonify(data = [])

    for users in Users_contact.query.filter_by(user_uid=uid).all():

        user = NewUser(
            name=users.name + ' ' + users.surname,
            n = users.n,
            e = users.e,
            id = users.id
        )

        contacts.append(user)
        
    return jsonify(contacts)

@app.route('/get-keys', methods=['GET', 'POST'])
def get_user_keys():
    recieved_file = request.json
    user_uid = recieved_file['uid']
    user = User.query.filter_by(uid=user_uid).first()
    return jsonify(e=user.e, n=user.n, d=user.d)

app.run()

