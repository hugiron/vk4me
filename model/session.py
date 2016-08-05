from server import database


class Session(database.DynamicDocument):
    meta = {
        'collection': 'session',
        'indexes': [
            'data.login'
        ]
    }