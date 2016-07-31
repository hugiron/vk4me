from hashlib import sha256
from server import database


class User(database.Document):
    login = database.StringField(max_length=32, required=True)
    password = database.StringField(max_length=64, required=True)
    email = database.StringField(max_length=64, required=False)
    rate = database.IntField(default=0)
    timestamp = database.IntField(default=2147483647)
    account = database.ListField(database.DictField(), default=[])
    meta = {
        'collection': 'users',
        'indexes': [
            {
                'fields': ['login'],
                'unique': True
            },
            'email',
            'timestamp'
        ]
    }

    @staticmethod
    def get_password(password):
        return sha256(password.encode()).hexdigest()