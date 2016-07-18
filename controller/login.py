from flask import session, redirect

def login():
    return redirect('/')

def logout():
    session.pop('user_id', None)
    return redirect('/')

def registry():
    pass

def recovery():
    pass