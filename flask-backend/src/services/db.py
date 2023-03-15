"""Establishing MongoClient and DB instance for use across the application using singleton design pattern:

    - _establish_mongo() creates the instances and returns a tuple to be accessed and declared as needed by blueprints
    - module level variable is established with _client_instance, default is None
    - get_mongo() checks the status of _client_instance (whether the tuple as been assigned)
      and calls _establish_mongo() if not """


from pymongo import MongoClient
import os


def _establish_mongo():
    """Returns a tuple with the MongoClient instance and the database instance"""
    try:
        # Establish connection to MongoDB spotter-io db
        client = MongoClient(os.environ['MONGODB_URI'], serverSelectionTimeoutMS=1000)
        client.server_info()  # Triggering exception if unable to connect to db
        print(client)  # Print client info as test to confirm client established
        db = client.spotter_io
        print(db.name)  # Print db name to verify db selection
        return client, db
    except Exception as e:
        print(e)
        raise e


# Module level variable
_client_instance = None


def get_mongo():
    """Returns the existing client instance or creates it if one does not already exist."""
    global _client_instance
    if not _client_instance:
        # Assigns client, db tuple
        _client_instance = _establish_mongo()
    return _client_instance
