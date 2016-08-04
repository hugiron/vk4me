from flask import session, redirect, request, render_template
from controller.handler import handler_login, handler_registry, handler_recovery, handler_recovery_confirm, \
    handler_recovery_change
from model.error import InternalServerError
from server import app


def login():
    if 'user_id' in session:
        return redirect('/')
    if request.method == 'GET':
        return render_template('main/login.html',
                               form={},
                               name=app.config['TITLE'])
    elif request.method == 'POST':
        try:
            return handler_login(request.form)
        except Exception as msg:
            return render_template('main/login.html',
                                   error=str(msg),
                                   form=request.form,
                                   name=app.config['TITLE'])


def logout():
    session.clear()
    return redirect('/')


def registry():
    if 'user_id' in session:
        return redirect('/')
    if request.method == 'GET':
        return render_template('main/registry.html',
                               form={},
                               name=app.config['TITLE'])
    elif request.method == 'POST':
        try:
            return handler_registry(request.form)
        except InternalServerError as msg:
            return render_template('main/registry.html',
                                   error=str(msg),
                                   form=request.form,
                                   name=app.config['TITLE'])
        except:
            return render_template('main/registry.html',
                                   error='Внутренняя ошибка сервера. Попробуйте еще раз.',
                                   form=request.form,
                                   name=app.config['TITLE'])


def recovery():
    if 'user_id' in session:
        return redirect('/')
    try:
        if request.method == 'GET':
            if 'key' in request.args:
                return handler_recovery_confirm(request.args.get('key'))
            else:
                return render_template('main/recovery.html',
                                       name=app.config['TITLE'])
        elif request.method == 'POST':
            if 'user' in session:
                return handler_recovery_change(request.form)
            else:
                return handler_recovery(request.form)
    except Exception as msg:
        return render_template('main/recovery.html',
                               error=str(msg),
                               name=app.config['TITLE'])