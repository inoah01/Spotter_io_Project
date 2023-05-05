# TODO:
#   - Protect routes with @require_auth custom wrap from middlewares.py (add in before function call)
#   - Move DB CRUD to respective file in models directory then import them in

"""Replace with appropriate routes for users"""
from werkzeug.exceptions import BadRequest
from flask import Blueprint, Response, request, json, jsonify
from bson import json_util
from ..services.db import get_db, get_collection
from ..authentication.auth import verify_token
from ..models import users as models
# for protecting routes (see top of file)
# from .. authentication.middlewares import require_auth

# Create Blueprint
users = Blueprint("users", __name__, url_prefix="/api/v1-0-3/users")


# Wrapper to initialize PyMongo client as well as specified DB and collection
@users.before_request
def set_db_and_collection():
    get_db("spotter_io")
    print(get_db("spotter_io"))
    get_collection("users")


@users.get("/get/some")
def get_some_users():
    """Get a document from the users collection that matches the specified filter."""
    try:
        # TODO: Move CRUD ops to models/users.py
        collection = get_collection()
        cursor = collection.find_one({"email": "sachi.email@example.com"})

        if not cursor:
            raise ValueError("No matching user found")

        result = Response(
            response=json_util.dumps(cursor), status=200, mimetype="application/json"
        )
        result_json = Response.get_json(result)

        key_filter = ["_id", "name"]
        subset = {key: result_json[key] for key in key_filter}

        return Response(
            response=json.dumps(subset), status=200, mimetype="application/json"
        )

    except ValueError as ve:
        return Response(
            response=json.dumps({"message": str(ve)}),
            status=404,
            mimetype="application/json",
        )

    except Exception as ex:
        print(ex)
        return Response(
            response=json.dumps({"message": "Internal server error"}),
            status=500,
            mimetype="application/json",
        )


@users.get("/create")
def create_user():
    """Will eventually need to change to taking in request.json and a POST request but:
    Takes in a JSON with specified fields and creates a document in users collection."""

    try:
        # TODO: Move CRUD ops to models/users.py
        #   - Check client-side fields
        collection = get_collection()
        new_user = {
            "name": {"firstName": "John", "lastName": "Doe"},
            "email": "john.email@example.com",
            "phoneNum": "999-999-9999",
            "favoriteColor": "orange",
        }

        result = collection.insert_one(new_user)
        inserted_id = str(result.inserted_id)

        return Response(
            response=json.dumps(
                {"message": "Successfully added user!", "id": inserted_id}
            ),
            status=200,
            mimetype="application/json",
        )

    except Exception as ex:
        print(ex)
        return Response(
            response=json.dumps({"message": "Cannot add user :("}),
            status=500,
            mimetype="application/json",
        )


@users.post("/login")
def authenticate():
    """Takes in returned firebase token, authenticates it, and checks for email/uid match in DB"""

    try:
        collection = get_collection()
        # Retrieve Firebase token from frontend
        token = request.get_json()

        # Verify + decode token, pull out email uid
        email, firebase_id = verify_token(token)

        # # Pull out email and firebase id (matching w/ frontend keys)
        # user_data = data.get("user")
        # email = user_data.get("email")
        # firebase_token = user_data.get("uid")

        # TEST OUTPUT to confirm reception of data
        if token:
            print("Received data: ", token)
            print("Extracted email: ", email, "\nExtracted uid: ", firebase_id)
        else:
            print("Token not received")

        # Find user with matching email and firebase UID:
        user = models.check_user_exists(collection, email, firebase_id)

        # Conditional block to validate user:
        if user:
            return Response(
                response=json.dumps({"message": "user found and authenticated"}),
                status=200,
                mimetype="application/json",
            )
        else:
            # If user is not found, return a message indicating the need to sign up
            return Response(
                response=json.dumps({"message": "User not found. Please sign up."}),
                status=404,
                mimetype="application/json",
            )

        # DELETE: Old return statement from testing frontend 2 backend connection
        # return Response(
        #     response=json.dumps({"message": "Data successfully retrieved from front-end", "email": email,
        #                          "firebase token": firebase_token}),
        #     status=200,
        #     mimetype="application/json"
        # )
    except BadRequest as br:
        return Response(
            response=json.dumps({"message": str(br)}),
            status=400,
            mimetype="application/json",
        )
    except KeyError as ke:
        return Response(
            response=json.dumps({"message": f"Missing key: {str(ke)}"}),
            status=400,
            mimetype="application/json",
        )

    except Exception as ex:
        print(ex)
        return Response(
            response=json.dumps({"message": "Internal server error"}),
            status=500,
            mimetype="application/json",
        )
