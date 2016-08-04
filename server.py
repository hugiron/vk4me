from flask import Flask
from flask_mongoengine import MongoEngine, MongoEngineSessionInterface
from flask_debugtoolbar import DebugToolbarExtension

# Flask init
app = Flask(__name__)
app.config.from_pyfile('./config.cfg')

# Connection to database init
database = MongoEngine(app)
toolbar = DebugToolbarExtension(app)
app.session_interface = MongoEngineSessionInterface(database)

# Start server
from route import *
if __name__ == '__main__':
    app.run(host=app.config['HOST'], port=app.config['PORT'])
