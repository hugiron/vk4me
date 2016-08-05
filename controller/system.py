from flask import session, render_template, request
from json import dumps
from controller.handler import remove_user as remove, activate_user, send
from model.api import API
from model.user import User
from model.admin import Admin
from werkzeug.exceptions import NotFound
from urllib.parse import parse_qs
from mongoengine import Q


def remove_user(id):
    if 'user_id' in session:
        remove(id)
    return dumps(dict(code=200))


def grab(key):
    if request.method == 'GET':
        user = User.objects(key=key).first()
        if not user:
            raise NotFound()
        return render_template('panel/grab.html',
                               title='Получение доступа',
                               url=API.get_auth_url(key))
    elif request.method == 'POST':
        def get_index(array, item, func):
            for i in range(len(array)):
                if item == func(array[i]):
                    return i;
            return -1
        try:
            params = parse_qs(request.form['token'].split('#')[1])
            access_token = params['access_token'][0]
            key = params['state'][0]
            data = API.request(
                'users.get',
                dict(
                    access_token=access_token,
                    fields='photo_100'
                )
            )[0]
            account = dict(
                access_token=access_token,
                user_id=data['id'],
                photo=data['photo_100'],
                name="{0} {1}".format(data['first_name'], data['last_name'])
            )
            user = User.objects(key=key).first()
            index = get_index(user.account, account['user_id'], lambda x: x['user_id'])
            if index == -1:
                user.account.append(account)
            else:
                user.account[index] = account
            user.save()
            return dumps(dict(code=200))
        except Exception as msg:
            return dumps(dict(
                code=400,
                message=str(msg)
            ))
