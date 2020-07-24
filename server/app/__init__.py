from flask import Flask
from flask_cors import CORS, cross_origin
from flask import jsonify
import db

app = Flask(__name__)
app.config.from_object(__name__)

CORS(app, resources={r"/*": {"origins": ["http://localhost:8080"]}})

app.config['SECRET_KEY'] = 'encrypt_website_for_security'


@app.route('/tutorials/<tutorial_name>', methods=['POST'])
def get_tutorial(tutorial_name):
    return jsonify(db.get_tutorial(tutorial_name))


@app.route('/getTutorials',methods=['POST'])
def get_all_tutorials():
    return jsonify(db.get_all_tutorials())


@app.route('/getFavorites', methods=['POST'])
def get_favorites():
    return jsonify(db.get_favorites())