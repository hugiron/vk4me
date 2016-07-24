from flask import render_template, session, request
from server import app


def index():
    if (not 'user_id' in session):
        return render_template('main/index.html')
    return render_template('panel/index.html', menu=app.config['MENU'], path=request.path)


def faq():
    if (not 'user_id' in session):
        return render_template('main/index.html')
    return render_template('panel/faq.html', menu=app.config['MENU'], path=request.path)


def support():
    if (not 'user_id' in session):
        return render_template('main/index.html')
    return render_template('panel/support.html', menu=app.config['MENU'], path=request.path)


def messages_all():
    if (not 'user_id' in session):
        return render_template('main/index.html')
    return render_template('panel/messages/all.html', menu=app.config['MENU'], path=request.path)


def messages_important():
    if (not 'user_id' in session):
        return render_template('main/index.html')
    return render_template('panel/messages/important.html', menu=app.config['MENU'], path=request.path)


def messages_cache():
    if (not 'user_id' in session):
        return render_template('main/index.html')
    return render_template('panel/messages/cache.html', menu=app.config['MENU'], path=request.path)


def groups_all():
    if (not 'user_id' in session):
        return render_template('main/index.html')
    script = "$.ui.getGroups(user);"
    return render_template('panel/list.html', menu=app.config['MENU'], path=request.path, script=script)


def groups_admin():
    if (not 'user_id' in session):
        return render_template('main/index.html')
    script = "$.ui.getAdmin(user);"
    return render_template('panel/list.html', menu=app.config['MENU'], path=request.path, script=script)


def friends_all():
    if (not 'user_id' in session):
        return render_template('main/index.html')
    script = "$.ui.getFriends(user);"
    return render_template('panel/list.html', menu=app.config['MENU'], path=request.path, script=script)


def friends_new():
    if (not 'user_id' in session):
        return render_template('main/index.html')
    return render_template('panel/friends/new.html', menu=app.config['MENU'], path=request.path)
