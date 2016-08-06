from requests import post
from json import loads
from random import choice
from server import app


class APIException(Exception):
    def __init__(self, code, message):
        super(message)
        self.code = code


class API:
    @staticmethod
    def request(method, params):
        params['v'] = 5.53
        data = loads(post(
            'https://api.vk.com/method/' + method,
            data=params
        ).text)
        if 'error' in data:
            raise APIException(data['error']['error_code'], data['error']['error_msg'])
        return data['response']

    @staticmethod
    def get_auth_url(state):
        return "https://oauth.vk.com/authorize?" \
               "client_id={0}&redirect_uri={1}&display={2}&scope={3}&response_type={4}&state={5}".format(
                    choice(app.config['CLIENT_ID']),
                    'https://oauth.vk.com/blank.html',
                    'mobile',
                    ','.join(app.config['CLIENT_SCOPE']),
                    'token',
                    state)
