"""Replace with appropriate routes for users"""
from bson import json_util
from flask import Blueprint, Response, request, json
# import jsonb
# import bson.json_util as json_util
from .services.db import get_mongo

# Create Blueprint
users = Blueprint("users", __name__, url_prefix="/api/v1-0-3/users")


# Establish this mongo instance (import client, import db, and set collection)
client, db = get_mongo()
this_db = client.spotter_io
users_collection = this_db.users


@users.get("/get/some")
def get_some_users():
    """Get a document from the users collection that matches the specified filter."""
    try:

        db_data = users_collection.find_one({"email": "sachi.email@example.com"})

        if not db_data:
            raise ValueError("No matching user found")

        db_response = Response(
            response=json_util.dumps(db_data),
            status=200,
            mimetype="application/json"
        )
        db_response_json = Response.get_json(db_response)

        key_filter = ["_id", "name"]
        subset = {key: db_response_json[key] for key in key_filter}

        return Response(
            response=json.dumps(subset),
            status=200,
            mimetype="application/json"
        )

    except ValueError as ve:
        return Response(
            response=json.dumps({"message": str(ve)}),
            status=404,
            mimetype="application/json"
        )

    except Exception as ex:
        print(ex)
        return Response(
            response=json.dumps({"message": "Internal server error"}),
            status=500,
            mimetype="application/json"
        )


@users.get("/create")
def create_user():
    """Will eventually need to change to taking in request.json and a POST request but:
        Takes in a JSON with specified fields and creates a document in users collection."""
    try:
        new_user = {"name": {"firstName": "Sachi", "lastName": "Korrapati"},
                    "email": "sachi.email@example.com",
                    "phoneNum": "999-999-9999",
                    "favoriteColor": "orange"}

        db_response = users_collection.insert_one(new_user)
        inserted_id = str(db_response.inserted_id)

        return Response(
            response=json.dumps({"message": "Successfully added user!", "id": inserted_id}),
            status=200,
            mimetype="application/json"
        )

    except Exception as ex:
        print(ex)
        return Response(
            response=json.dumps({"message": "Cannot add user :("}),
            status=500,
            mimetype="application/json"
        )


@users.get("/login")
def authenticate():
    """Takes in Email and Firebase Token from front-end login and checks it against users records in MongoDB
        (Further implementation needed:
            - Calling in other routes for the check and creation?
            - Creating post routes from within this route?)"""
    try:
        data = request.get_json()
        email = data["email"]
        firebase_token = data["firebase_token"]

        return Response(
            response=json.dumps({"message": "Data successfully retrieved from front-end", "email": email,
                                 "firebase token": firebase_token}),
            status=200,
            mimetype="application/json"
        )

    except KeyError as ke:
        return Response(
            response=json.dumps({"message": f"Missing key: {str(ke)}"}),
            status=400,
            mimetype="application/json"
        )

    except Exception as ex:
        print(ex)
        return Response(
            response=json.dumps({"message": "Internal server error"}),
            status=500,
            mimetype="application/json"
        )

