from flask import render_template, session, request
import config


def index():
    if ('user_id' in session):
        return render_template('panel/index.html', menu=config.menu, path=request.path)
    return render_template('main/index.html')


def faq():
    return render_template('panel/faq.html', menu=config.menu, path=request.path)


def support():
    return render_template('panel/support.html', menu=config.menu, path=request.path)


def messages_all():
    return render_template('panel/messages/all.html', menu=config.menu, path=request.path)


def messages_important():
    return render_template('panel/messages/important.html', menu=config.menu, path=request.path)


def messages_cache():
    return render_template('panel/messages/cache.html', menu=config.menu, path=request.path)


def groups_all():
    return render_template('panel/groups/list.html', menu=config.menu, path=request.path)


def groups_admin():
    return render_template('panel/groups/list.html', menu=config.menu, path=request.path)


def friends_all():
    return render_template('panel/friends/all.html', menu=config.menu, path=request.path)


def friends_new():
    return render_template('panel/friends/new.html', menu=config.menu, path=request.path)
