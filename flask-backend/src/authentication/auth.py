import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth
import os
from dotenv import load_dotenv

# Loading in Firebase Admin SDK path from environment variables
load_dotenv()
FIREBASE_ADMIN_SDK_PATH = os.getenv("FIREBASE_ADMIN_SDK_PATH")

cred = credentials.Certificate(FIREBASE_ADMIN_SDK_PATH)
firebase_admin.initialize_app(cred)


def verify_token(token):
    """Takes in the firebase user token then:
        - Verifies and decodes it
        - returns tuple of email and uid"""

    # Extract the token
    # user_token = token.get("user")
    id_token = token.get("stsTokenManager", {}).get("accessToken")

    # Verify and decode the token
    decoded_token = auth.verify_id_token(id_token)

    # Extract email and uid from decoded token
    email = decoded_token.get("email")
    uid = decoded_token.get("uid")

    return email, uid
