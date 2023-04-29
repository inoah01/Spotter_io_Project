"""These are for testing and education purposes only. Appropriate routes will need to be moved to separate .py
    files with blueprints made and registered."""

from flask import Blueprint

test = Blueprint("test", __name__, url_prefix="/api/v1-0-3/test")


@test.route('/hello/string')
def hello_world():  # put application's code here
    return 'Hello World!'


# Notice the difference in app route syntax
@test.get('/hello/json')
def say_hello():
    return {
        "message": "Hello world!"}
    # The use of jsonify to output JSON is not strictly necessary, python maps 2 dictionary

