from requests import post
from json import loads


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