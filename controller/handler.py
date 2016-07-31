from flask import session, redirect
from model.user import User
from mongoengine import Q


def handler_login(form):
    if not ('login' in form and 'password' in form):
        raise Exception('Переданы неверные параметры')
    user = User.objects(Q(login=form['login']) & Q(password=User.get_password(form['password']))).first()
    if not user:
        raise Exception('Неверный логин или пароль')
    session['user_id'] = user.id
    return redirect('/')


def handler_registry(form):
    if not ('login' in form and 'password' in form and 'email' in form):
        raise Exception('Переданы неверные параметры')
    if len(form['email']):
        find = User.objects(Q(login=form['login']) | Q(email=form['email'])).first()
    else:
        find = User.objects(Q(login=form['login'])).first()
    if not find:
        user = User(login=form['login'], password=User.get_password(form['password']))
        if len(form['email']):
            user.email = form['email']
        user.save()
        return handler_login(form)
    else:
        if find.login == form['login']:
            raise Exception('Этот логин уже используется')
        elif len(form['email']) and find.email == form['email']:
            raise Exception('Этот адрес электронной почты уже используется')


def handler_recovery(form):
    pass


def handler_recovery_confirm(key):
    pass