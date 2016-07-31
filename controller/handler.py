from flask import session, redirect, render_template
from model.user import User
from model.recovery import Recovery
from server import app
from mongoengine import Q
from bson.objectid import ObjectId

import smtplib
from email.mime.text import MIMEText


def handler_login(form):
    if not ('login' in form and 'password' in form):
        raise Exception('Переданы неверные параметры')
    user = User.objects(Q(login=form['login']) & Q(password=User.get_password(form['password']))).first()
    if not user:
        raise Exception('Неверный логин или пароль')
    session['user_id'] = str(user.id)
    session['rate'] = user.rate
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
            raise Exception('Этот e-mail уже используется')


def handler_recovery(form):
    if not 'email' in form or not len(form['email']):
        raise Exception('Переданы неверные параметры')
    user = User.objects(email=form['email']).first()
    if not user:
        raise Exception('Пользователя с таким e-mail не существует')
    key = Recovery(key=Recovery.generate_key(), user_id=str(user.id))
    key.save()
    send(
        form['email'],
        'Восстановление пароля',
        str(render_template('mail/recovery.html', key=key.key))
    )
    return render_template('main/recovery.html', message='Ссылка для восстановления пароля была выслана на ваш e-mail')


def handler_recovery_confirm(key):
    recovery_key = Recovery.objects(Q(key=key)).first()
    if not recovery_key:
        session.clear()
        raise Exception('Неверный ключ восстановления')
    session['user'] = recovery_key.user_id
    session['key'] = recovery_key.key
    return render_template('main/change.html')


def handler_recovery_change(form):
    if not ('key' in session and 'user' in session and 'password' in form):
        raise Exception('Переданы неверные параметры')
    key = Recovery.objects(Q(key=session['key']) & Q(user_id=session['user'])).first()
    if not key:
        session.clear()
        raise Exception('Время действия ключа восстановления истекло')
    user = User.objects(id=ObjectId(session['user'])).first()
    if not user:
        raise Exception('Пользователя не существует')
    Recovery.objects(user_id=session['user']).delete()
    session.clear()
    session['user_id'] = str(user.id)
    session['rate'] = user.rate
    user.password = User.get_password(form['password'])
    user.save()
    return redirect('/')


def send(email, subject, body):
    message = MIMEText(body)
    message['Content-Type'] = 'text/html; charset="utf-8"'
    message['Subject'] = subject
    message['From'] = 'Administrator <' + app.config['SMTP_LOGIN'] + '>'
    message['To'] = email

    server = smtplib.SMTP(host=app.config['SMTP_HOST'], port=app.config['SMTP_PORT'])
    server.starttls()
    server.login(app.config['SMTP_LOGIN'], app.config['SMTP_PASSWORD'])
    server.sendmail(app.config['SMTP_LOGIN'], email, message.as_string())
    server.quit()


def get_account_list(id):
    return User.objects(id=ObjectId(id)).first().account


def remove_user(id):
    user = User.objects(Q(id=ObjectId(session['user_id']))).first()
    if not user:
        return
    for i in range(len(user.account)):
        if id == user.account[i]['user_id']:
            del user.account[i]
            user.save()
            break