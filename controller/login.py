from flask import session, redirect

def login():
    session['user_id'] = 1
    return redirect('/')

def logout():
    session.pop('user_id', None)
    return redirect('/')

def registry():
    pass

def recovery():
    pass