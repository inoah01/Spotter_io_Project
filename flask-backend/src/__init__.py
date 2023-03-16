"""
Pulling in from v1 repo
"""
import sys
from flask import Flask
import os
from .test import test
from .users import users


def init_webhooks(base_url):
    """Update inbound traffic via APIs to use public-facing ngrok URL"""
    pass


def create_app(test_configuration=None):
    app = Flask(__name__,
                instance_relative_config=True,)

    if test_configuration is None:

        app.config.from_mapping(
            BASE_URL="http://localhost:5000/api/v1-0-3",
            USE_NGROK=os.environ.get("USE_NGROK", "False") == "True" and os.environ.get("WERKZEUG_RUN_MAIN") != "true",
            SECRET_KEY=os.environ["SECRET_KEY"],
            MONGODB_URI=os.environ["MONGODB_URI"]  # < - For MongoDB
        )
    else:
        app.config.from_mapping(test_configuration)

    if os.environ.get("FLASK_DEBUG") == "True" and os.environ["USE_NGROK"]:
        # install pyngrok and initialize (DEV PURPOSES ONLY)
        from pyngrok import ngrok

        # Get dev server port (default to 5000, but override upon spin up)
        port = sys.argv[sys.argv.index("--port") + 1] if "--port" in sys.argv else 5000

        # Open tunnel to connect to dev server
        public_url = ngrok.connect(port).public_url
        print(" * ngrok tunnel \"{}\" -> \"http://127.0.0.1:{}\"".format(public_url, port))

        app.config["BASE_URL"] = public_url
        init_webhooks(public_url)

    app.register_blueprint(test)
    app.register_blueprint(users)

    @app.route("/")
    def index():
        return {"message": "Hello, world!"}

    return app


