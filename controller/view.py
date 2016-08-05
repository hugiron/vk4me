from flask import render_template, session, request, redirect
from server import app
from controller.handler import get_account_list, send, get_unit_time
from json import dumps
from time import time


def get_data():
    users = get_account_list(session['user_id'])
    unit = get_unit_time(session['timestamp'] - time())
    return dict(
        menu=app.config['MENU'],
        path=request.path,
        users=dumps(users),
        size=len(users),
        rate=session['rate'],
        unit=unit['key'],
        time=int(unit['value']),
        name=app.config['TITLE']
    )


def index():
    if 'user_id' not in session:
        return redirect('/login')
    data = get_data()
    data['title'] = 'Главная'
    return render_template('panel/index.html', **data)


def access_denied():
    if 'rate' in session and not session['rate']:
        data = get_data()
        data['title'] = 'Доступ запрещен'
        return render_template('panel/access_denied.html', **data)
    return redirect('/')


def faq():
    if 'user_id' not in session:
        return redirect('/')
    data = get_data()
    data['title'] = 'FAQ'
    return render_template('panel/faq.html', **data)


def feedback():
    if request.method == 'GET':
        if 'user_id' not in session:
            return redirect('/')
        data = get_data()
        data['title'] = 'Обратная связь'
        return render_template('panel/support.html', **data)
    else:
        try:
            if not ('message' in request.form and 'contact' in request.form):
                raise Exception('Переданы неверные параметры')
            send(
                app.config['SMTP_LOGIN'],
                'Связь с разработчиками {0}'.format(app.config['TITLE']),
                str(render_template('mail/support.html',
                                    message=request.form['message'],
                                    contact=request.form['contact'],
                                    username=session['login'] if 'login' in session else None)
                )
            )
            return dumps(dict(code=200))
        except Exception as msg:
            return dumps(dict(
                code=400,
                message=str(msg)
            ))


def payment():
    if 'user_id' not in session:
        return redirect('/')
    data = get_data()
    data['title'] = 'Пополнение счета'
    return render_template('panel/payment.html', **data)


def dialogs_all():
    if 'user_id' not in session:
        return redirect('/')
    data = get_data()
    data['title'] = 'Диалоги'
    data['script'] = """
        $('#dialogs').html('');
        if ('last_id' in config)
            delete config['last_id'];
        config.last_top = 0;
        $.ui.getDialogs(config.user);
    """
    return render_template('panel/dialog.html', **data)


def messages_all(id):
    if 'user_id' not in session:
        return redirect('/')
    data = get_data()
    if not session['rate']:
        return redirect('/access_denied')
    data['title'] = 'Личные сообщения'
    data['script'] = """
        $('#messages').html('');
        if ('last_id' in config)
            delete config['last_id'];
        config.user_id = """ + str(id) + """;
        config.last_top = 0;
        $.ui.getMessages(config.user, config.user_id);
    """
    data['id'] = id
    return render_template('panel/message.html', **data)


def messages_all_video(id):
    if 'user_id' not in session:
        return redirect('/')
    data = get_data()
    if not session['rate']:
        return redirect('/access_denied')
    data['title'] = 'Вложения | Видеозаписи'
    data['script'] = """
        $('#list').html('');
        config.user_id = """ + str(id) + """;
        config.last_top = 0;
        $.ui.getAttachVideo(config.user, config.user_id);
    """
    data['id'] = id
    return render_template('panel/attachment.html', **data)


def messages_all_audio(id):
    if 'user_id' not in session:
        return redirect('/')
    data = get_data()
    if not session['rate']:
        return redirect('/access_denied')
    data['title'] = 'Вложения | Аудиозаписи'
    data['script'] = """
        $('#list').html('');
        config.user_id = """ + str(id) + """;
        config.last_top = 0;
        $.ui.getAttachAudio(config.user, config.user_id);
    """
    data['id'] = id
    return render_template('panel/attachment.html', **data)


def messages_all_photo(id):
    if 'user_id' not in session:
        return redirect('/')
    data = get_data()
    if not session['rate']:
        return redirect('/access_denied')
    data['title'] = 'Вложения | Фотографии'
    data['script'] = """
        $('#list').html('');
        config.user_id = """ + str(id) + """;
        config.last_top = 0;
        $.ui.getAttachPhoto(config.user, config.user_id);
    """
    data['id'] = id
    return render_template('panel/attachment.html', **data)


def messages_all_doc(id):
    if 'user_id' not in session:
        return redirect('/')
    data = get_data()
    if not session['rate']:
        return redirect('/access_denied')
    data['title'] = 'Вложения | Документы'
    data['script'] = """
        $('#list').html('');
        config.user_id = """ + str(id) + """;
        config.last_top = 0;
        $.ui.getAttachDoc(config.user, config.user_id);
    """
    data['id'] = id
    return render_template('panel/attachment.html', **data)


def messages_important():
    if 'user_id' not in session:
        return redirect('/')
    data = get_data()
    data['title'] = 'Важные сообщения'
    return render_template('panel/messages/important.html', **data)


def dialogs_cache():
    if 'user_id' not in session:
        return redirect('/')
    data = get_data()
    data['title'] = 'Кэш диалогов'
    return render_template('panel/messages/cache.html', **data)


def groups_all():
    if 'user_id' not in session:
        return redirect('/')
    data = get_data()
    data['title'] = 'Сообщества'
    data['script'] = """
        $('#list').html('');
        $.ui.getGroups(config.user);
    """
    return render_template('panel/list.html', **data)


def groups_admin():
    if 'user_id' not in session:
        return redirect('/')
    data = get_data()
    data['title'] = 'Администрирование'
    data['script'] = """
        $('#list').html('');
        $.ui.getAdmin(config.user);
    """
    return render_template('panel/list.html', **data)


def friends_all():
    if 'user_id' not in session:
        return redirect('/')
    data = get_data()
    data['title'] = 'Все друзья'
    data['script'] = """
        $('#list').html('');
        $.ui.getFriends(config.user);
    """
    return render_template('panel/list.html', **data)


def friends_new():
    if 'user_id' not in session:
        return redirect('/')
    data = get_data()
    data['title'] = 'Новые друзья'
    return render_template('panel/friends/new.html', **data)
