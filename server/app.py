from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import db


app = Flask(__name__)
app.config.from_object(__name__)

CORS(app, resources={r"/*": {"origins": ["*"]}})

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


@app.route('/getRecents', methods=['POST'])
def get_recents():
    return jsonify(db.get_recent_posts())