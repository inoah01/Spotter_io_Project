# Script for establishing connection to MongoDB
from bson import encode, decode
from flask import Flask, Response, request, jsonify
import os, json
# Allows bsons with ObjectID to be parsed and converted to json
import bson.json_util as json_util
# Enables querying by ObjectID
from bson.objectid import ObjectId
from dotenv import load_dotenv
from pymongo import MongoClient

# Create Flask App instance
app = Flask(__name__)

# Load config from .env
# For PROD, load connection string from secure location, remembering to replace <password placeholder>
load_dotenv()
MONGODB_URI = os.environ["MONGODB_URI"]


# Create instance of MongoClient
# Application should use single MongoClient 4 all requests --> very resource intensive
try:
    client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS = 1000)
    client.server_info() # Triggering exception if unable to connect to db
    
    # Get reference to desired db
    db = client.spotter_io
except:
    print("ERROR - Could not connect to db")



# Get reference to spotter_io users collection
users_collection = db.users


########################################
# Successfully reading user document
@app.route("/", methods=["GET"])
def get_some_users():
    try:
        # find one user named (---) and return their document
        data = db.users.find_one({"favoriteColor":"blue"})
        return Response(
            response=json_util.dumps(data),
            # OK Success
            status=200,
            mimetype="application/json"
        )
    except Exception as ex:
        print(ex)
        return Response(
            response=json.dumps(
            {"message": "cannot read users",}),
            # Internal server error
            status=500,
            mimetype="application/json"
        )
#########################################
# Successfully creating new user document
@app.route("/", methods=["POST"])
def create_user():
    try:
        # User data from front-end will go here
        newUser = {"name":{"firstName": "Test", "lastName": "User"},
                   "email":"test.email2@example.com",
                   "phoneNum": "999-999-9999",
                   "favoriteColor": "red"}
        dbResponse = db.users.insert_one(newUser)
        print(dbResponse.inserted_id)
        return Response(
            response=json_util.dumps({"message": "Successfully added user!", "id":f"{dbResponse.inserted_id}"}),
            # OK Success
            status=200,
            mimetype="application/json"
        )
    except Exception as ex:
        print(ex)
        return Response(
            response=json.dumps(
            {"message": "Cannot add user :(",}),
            # Internal server error
            status=500,
            mimetype="application/json"
        )
#############################################
@app.route("/user/login", methods=['POST'])
def authenticate():
    try:
        data = request.get_json() # Accessing the data sent in the payload of the front-end axios request
        email = data["email"]
        firebase_token = data["firebase_token"]
        print(f'Firebase Token: {firebase_token}')
        print(f'Email: {email}')
        return Response(
            response=json_util.dumps({"message": "data successfully retrieved from front-end"}),
            status=200,
            mimetype="application/json"
        )
    except Exception as ex:
        print(ex)
        return Response(
            response=json.dumps({"message":"data pull from front-end unsuccessful"}),
            # Client Error Bad Request
            status=400,
            mimetype="application/json"
        )

##############################################
# Remember to enable dummy SSL for testing API
if __name__ == "__main__":
    app.run(port=80, debug=True, ssl_context="adhoc")

client.close()
