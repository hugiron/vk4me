from flask import render_template, session, request
from server import app


def index():
    if ('user_id' in session):
        return render_template('panel/index.html', menu=app.config['MENU'], path=request.path)
    return render_template('main/index.html')


def faq():
    return render_template('panel/faq.html', menu=app.config['MENU'], path=request.path)


def support():
    return render_template('panel/support.html', menu=app.config['MENU'], path=request.path)


def messages_all():
    return render_template('panel/messages/all.html', menu=app.config['MENU'], path=request.path)


def messages_important():
    return render_template('panel/messages/important.html', menu=app.config['MENU'], path=request.path)


def messages_cache():
    return render_template('panel/messages/cache.html', menu=app.config['MENU'], path=request.path)


def groups_all():
    return render_template('panel/groups/list.html', menu=app.config['MENU'], path=request.path)


def groups_admin():
    return render_template('panel/groups/list.html', menu=app.config['MENU'], path=request.path)


def friends_all():
    return render_template('panel/friends/all.html', menu=app.config['MENU'], path=request.path)


def friends_new():
    return render_template('panel/friends/new.html', menu=app.config['MENU'], path=request.path)
