from flask import session, redirect, request


def prelogin():
    try:
        login = request.form['login']
        password = request.form['password']
        email = request.form['email']
        pass
    except:
        pass


def login():
    session['user_id'] = 1
    return redirect('/')


def logout():
    session.clear()
    return redirect('/')


def registry():
    pass


def recovery():
    pass