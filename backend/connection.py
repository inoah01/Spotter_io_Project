# Script for establishing connection to MongoDB
import os 

from dotenv import load_dotenv
from pymongo import MongoClient

# Load config from .env
# For PROD, load connection string from secure location, remembering to replace <password placeholder>
load_dotenv()
MONGODB_URI = os.environ["MONGODB_URI"]


# Create instance of MongoClient
# Application should use single MongoClient 4 all requests --> very resource intensive
client = MongoClient(MONGODB_URI)

for db_name in client.list_database_names():
    print(db_name)


client.close()
