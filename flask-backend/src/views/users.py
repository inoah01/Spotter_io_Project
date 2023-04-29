"""Replace with appropriate routes for users"""

from flask import Blueprint, Response, request, json, jsonify
from bson import json_util
from .. services.db import get_db, get_collection

# Create Blueprint
users = Blueprint("users", __name__, url_prefix="/api/v1-0-3/users")


@users.before_request
def set_db_and_collection():
    get_db('spotter_io')
    get_collection('users')


@users.get("/get/some")
def get_some_users():
    """Get a document from the users collection that matches the specified filter."""
    try:
        collection = get_collection()
        cursor = collection.find_one({"email": "sachi.email@example.com"})

        if not cursor:
            raise ValueError("No matching user found")

        result = Response(
            response=json_util.dumps(cursor),
            status=200,
            mimetype="application/json"
        )
        result_json = Response.get_json(result)

        key_filter = ["_id", "name"]
        subset = {key: result_json[key] for key in key_filter}

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
        collection = get_collection()
        new_user = {"name": {"firstName": "John", "lastName": "Doe"},
                    "email": "john.email@example.com",
                    "phoneNum": "999-999-9999",
                    "favoriteColor": "orange"}

        result = collection.insert_one(new_user)
        inserted_id = str(result.inserted_id)

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


@users.post("/login")
def authenticate():
    """Takes in Email and Firebase Token from front-end login and checks it against users records in MongoDB
        (Further implementation needed:
            - Calling in other routes for the check and creation?
            - Creating post routes from within this route?)"""
    try:
        data = request.get_json()
        # email = data["email"]
        # firebase_token = data["firebase_token"]

        # return Response(
        #     response=json.dumps({"message": "Data successfully retrieved from front-end", "email": email,
        #                          "firebase token": firebase_token}),
        #     status=200,
        #     mimetype="application/json"
        # )
        return jsonify(data)

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
