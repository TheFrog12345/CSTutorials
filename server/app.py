from flask import Flask
from flask import render_template

app = Flask(__name__)


@app.route('/')
def start():
    return "hello"


if __name__ == '__main__':
    app.run(port=5000, host="0.0.0.0")


