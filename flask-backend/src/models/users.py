# TODO: Transfer (and generalize as necessary) DB ops from views/users.py

def check_user_exists(db_collection, email, uid):
    """takes in a db collection, email, and uid, and checks if user exists. Returns False unless the user exists."""
    user = db_collection.find_one({"email": email, "firebase_uid": uid})
    return user is not None


def create_user(db_collection, new_user_object):
    user = db_collection.insert_one(new_user_object)
    return user is not None
