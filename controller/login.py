from flask import session, redirect, request, render_template
from controller.handler import handler_login, handler_registry, handler_recovery, handler_recovery_confirm, \
    handler_recovery_change


def login():
    if 'user_id' in session:
        return redirect('/')
    if request.method == 'GET':
        return render_template('main/login.html', form={})
    elif request.method == 'POST':
        try:
            return handler_login(request.form)
        except Exception as msg:
            return render_template('main/login.html', error=str(msg), form=request.form)


def logout():
    session.clear()
    return redirect('/')


def registry():
    if 'user_id' in session:
        return redirect('/')
    if request.method == 'GET':
        return render_template('main/registry.html', form={})
    elif request.method == 'POST':
        try:
            return handler_registry(request.form)
        except Exception as msg:
            return render_template('main/registry.html', error=str(msg), form=request.form)


def recovery():
    if 'user_id' in session:
        return redirect('/')
    try:
        if request.method == 'GET':
            if 'key' in request.args:
                return handler_recovery_confirm(request.args.get('key'))
            else:
                return render_template('main/recovery.html')
        elif request.method == 'POST':
            if 'user' in session:
                return handler_recovery_change(request.form)
            else:
                return handler_recovery(request.form)
    except Exception as msg:
        return render_template('main/recovery.html', error=str(msg))