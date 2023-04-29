"""Establishing PyMongo, MongoDB client instance and creating global object from specified db and collection"""

from flask import g
from flask_pymongo import PyMongo
from .gcloud import access_secret_version

mongo = PyMongo()


def init_db(app):
    mongo_uri = access_secret_version('my_mongo', 'latest')
    app.config["MONGO_URI"] = mongo_uri
    mongo.init_app(app)


def get_db(database_name=None):
    if database_name is not None:
        g.db = mongo.db[database_name]
    return g.db


def get_collection(collection_name=None):
    if collection_name is not None:
        g.collection = g.db[collection_name]
    return g.collection
