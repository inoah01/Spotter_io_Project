# Utils for authentication
import scrypt, jwt
from datetime import datetime, timedelta


# Hash password
def hash_password(password, salt):
    hashed_password = scrypt.hash(password, salt)
    return hashed_password

# Verify hashed passwords
def verify_password(entered_password, hashed_password, salt):
    hashed_attempt = scrypt.hash(entered_password, salt)
    # May be able to just return a boolean for simplicity 
    if hashed_attempt == hashed_password:
        return True
    else:
        return False
    
    
# Token generation
def generate_jwt(user_id, secret_key):
    # Creating a dictionary payload
    payload = {
        "sub": str(user_id),
        "exp": datetime.utcnow() + timedelta(days=1) # Set expiration for Token
    }
    # Encoding payload with secret key and then return JWT
    return jwt.encode(payload, secret_key, algorithm='HS256')

# Token verification
def verify_jwt(token, secret_key):
    try:
        # Decoding JWT and returning payload
        payload = jwt.decode(token, secret_key, algorithms=['HS256'])
        return payload['sub']
    except:
        # If JWT is expired raise error
        raise ValueError("Invalid or expired token")




# Tests for functions above
###############################################################
password = "PeePeePooPoo"
salt = "Iodine"
hashed_pass = hash_password(password, salt)
entered_password = password

print(verify_password(entered_password, hashed_pass, salt))