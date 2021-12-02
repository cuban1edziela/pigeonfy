from flask import Flask
from flask import *
from flask_cors import *
import enciphering
import deciphering
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users_contacts.db'
db = SQLAlchemy(app)
CORS(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.String(28), nullable=False)
    contacts = db.relationship('Users_contact', backref='uid', lazy=True)

    def __repr__(self):
        return f"User('{self.uid}')"


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

    deciphered_message = deciphering.decipher(message)
    return jsonify(response=deciphered_message)


@app.route('/new-user', methods=['GET', 'POST'])
def create_new_user():
    recieved_file = request.json
    user_uid = recieved_file['uid']
    new_user = User(uid=user_uid)
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


@app.route('/get-contacts', methods=['GET', 'POST'])
def get_user_contacts():
    recieved_file = request.json
    uid = recieved_file['uid']

    if Users_contact.query.filter_by(user_uid=uid).all() == []:
        return 'No contacts'
    
    for user in Users_contact.query.filter_by(user_uid=uid).all():
       contact = jsonify(
            name=user.name,
            surname=user.surname,
            n=user.n,
            e=user.e,
            id=user.id
        )
        
    return contact


app.run()
