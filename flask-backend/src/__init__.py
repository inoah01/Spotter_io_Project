"""
Pulling in from v1 repo
"""
# from backend_api.app import create_app
#
# flask_app = create_app()
#
# if __name__ == '__main__':
#     flask_app.run()
from flask import Flask
from pymongo import MongoClient
import os

from .users import users
from .test import test


def create_app(test_configuration=None):
    app = Flask(__name__,
                instance_relative_config=True)

    if test_configuration is None:

        app.config.from_mapping(
            SECRET_KEY=os.environ["SECRET_KEY"],
            MONGODB_URI=os.environ["MONGODB_URI"]  # < - For MongoDB
        )
    else:
        app.config.from_mapping(test_configuration)

    app.register_blueprint(test)
    app.register_blueprint(users)

    return app



