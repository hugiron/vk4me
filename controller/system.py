from flask import session
from json import dumps
from controller.handler import remove_user as remove

def remove_user(id):
    if 'user_id' in session:
        remove(id)
    return dumps(dict(code=200))