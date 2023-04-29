# import sys
from flask import Flask
from .services.gcloud import access_secret_version
from .services import db
from flask_cors import CORS

# TODO: Install and reconfigure NGROK for flask app (.flaskenv)


def create_app():
    # Create Flask app instance
    app = Flask(__name__)

    # Get the Flask key and MongoDB URI from GC Secrets Manager
    app.config["SECRET_KEY"] = access_secret_version('my_secret', 'latest')
    # Enable cross-origin AJAX
    CORS(app, resources={r'/*': {'origins': '*'}})

    # Initialize database
    db.init_db(app)

    # Register blueprints
    from .views.test import test
    from .views.users import users
    app.register_blueprint(test)
    app.register_blueprint(users)

    return app

