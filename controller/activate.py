from flask import request, render_template
from controller.handler import activate_user
from model.admin import Admin
from model.user import User
from model.session import Session
from json import dumps
from mongoengine import Q
from time import time
from server import app


def enable():
    if request.method == 'GET':
        return render_template('admin/activate.html',
                               host=app.config['DOMAIN'])
    elif request.method == 'POST':
        try:
            admin = Admin.objects(Q(login=request.form['login']) & Q(password=Admin.get_password(request.form['password']))).first()
            if not admin:
                raise Exception('Неверный логин или пароль администратора')
            activate_user(admin.name, request.form['username'], int(request.form['time']))
            return dumps(dict(code=200))
        except Exception as msg:
            return dumps(dict(
                code=400,
                message=str(msg)
            ))


def disable():
    users = User.objects(Q(timestamp__lt=int(time())))
    for user in list(users):
        Session.objects(data__login=user.login).update(**dict(
            data__rate=0,
            data__timestamp=2147483647
        ))
    users.update(**dict(
        rate=0,
        timestamp=2147483647
    ))
    return dumps(dict(code=200))
