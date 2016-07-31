from server import database
from random import choice
import string


class Recovery(database.Document):
    key = database.StringField(max_length=32, required=True)
    user_id = database.StringField(required=True)
    meta = {
        'collection': 'recovery',
        'indexes': [
            {
                'fields': ['key'],
                'unique': True
            }
        ]
    }

    @staticmethod
    def generate_key():
        return ''.join(choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for x in range(32))