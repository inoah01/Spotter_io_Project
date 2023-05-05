from functools import wraps
from flask import request, jsonify
from auth import verify_token


def require_auth(f):
    @wraps
    def decorated_function(*args, **kwargs):
        # Extracting Firebase token from request headers
        auth_header = request.headers.get('Authorization', '').split()
        if len(auth_header) != 2 or auth_header[0].lower() != 'bearer':
            return jsonify({'message': 'Invalid authorization header'}), 401

        token = auth_header[1]

        try:
            # Verify and Firebase token to get user data
            email, uid = verify_token(token)

            # Storing email and uid in request object for usage if needed
            request.email = email
            request.uid = uid

        except Exception as e:
            # If token is not valid, returning error message and appropriate HTTP status code
            return jsonify({'message': 'Unauthorized access'}), 401

        # If Firebase token is valid, proceed with handling the request
        return f(*args, **kwargs)

    return decorated_function()
