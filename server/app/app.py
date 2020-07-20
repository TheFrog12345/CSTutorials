from flask import Flask
from flask_cors import CORS, cross_origin
from flask import jsonify
from server import db

app = Flask(__name__)
app.config.from_object(__name__)

CORS(app, resources={r"/*": {"origins": ["http://localhost:8080"]}})

app.config['SECRET_KEY'] = 'encrypt_website_for_security'


@app.route('/info/<tutorial_name>', methods=['POST'])
def get_tutorial(tutorial_name):
    return jsonify(db.get_tutorial(tutorial_name))


if __name__ == '__main__':
    app.run(port=5000)