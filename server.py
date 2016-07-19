from flask import Flask
from flask_mongoengine import MongoEngine
from flask_debugtoolbar import DebugToolbarExtension

# Flask init
app = Flask(__name__)
app.config.from_pyfile('./myspy.cfg')

# Connection to database init
database = MongoEngine(app)
toolbar = DebugToolbarExtension(app)

# Start server
from route import *
if __name__ == '__main__':
    app.run()
