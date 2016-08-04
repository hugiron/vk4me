from hashlib import sha256
from server import database


class Admin(database.Document):
    login = database.StringField(max_length=32, required=True)
    password = database.StringField(max_length=64, required=True)
    name = database.StringField(max_length=64, required=True)
    meta = {
        'collection': 'admin',
        'indexes': [
            {
                'fields': ['login'],
                'unique': True
            }
        ]
    }

    @staticmethod
    def get_password(password):
        return sha256(password.encode()).hexdigest()