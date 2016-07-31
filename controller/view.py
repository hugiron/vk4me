from flask import render_template, session, request, redirect
from server import app
from controller.handler import get_account_list
from json import dumps


def index():
    if 'user_id' not in session:
        return redirect('/login')
    return render_template('panel/index.html',
                           menu=app.config['MENU'],
                           path=request.path,
                           users=dumps(get_account_list(session['user_id']))
                           )


def faq():
    if 'user_id' not in session:
        return redirect('/')
    return render_template('panel/faq.html',
                           menu=app.config['MENU'],
                           path=request.path,
                           users=dumps(get_account_list(session['user_id']))
                           )


def support():
    if 'user_id' not in session:
        return redirect('/')
    return render_template('panel/support.html',
                           menu=app.config['MENU'],
                           path=request.path,
                           users=dumps(get_account_list(session['user_id']))
                           )


def dialogs_all():
    if 'user_id' not in session:
        return redirect('/')
    script = """
        $('#dialogs').html('');
        if ('last_id' in config)
            delete config['last_id'];
        config.last_top = 0;
        $.ui.getDialogs(config.user);
    """
    return render_template('panel/dialog.html',
                           menu=app.config['MENU'],
                           path=request.path,
                           script=script,
                           users=dumps(get_account_list(session['user_id']))
                           )


def messages_all(id):
    if 'user_id' not in session:
        return redirect('/')
    if not session['rate']:
        return render_template('panel/access_denied.html',
                               menu=app.config['MENU'],
                               path=request.path,
                               users=dumps(get_account_list(session['user_id']))
                               )
    script = """
        $('#messages').html('');
        if ('last_id' in config)
            delete config['last_id'];
        config.user_id = """ + str(id) + """;
        config.last_top = 0;
        $.ui.getMessages(config.user, config.user_id);
    """
    return render_template('panel/message.html',
                           menu=app.config['MENU'],
                           path=request.path,
                           script=script,
                           id=id,
                           users=dumps(get_account_list(session['user_id']))
                           )


def messages_all_video(id):
    if 'user_id' not in session:
        return redirect('/')
    if not session['rate']:
        return render_template('panel/access_denied.html',
                               menu=app.config['MENU'],
                               path=request.path,
                               users=dumps(get_account_list(session['user_id']))
                               )
    script = """
        $('#list').html('');
        config.user_id = """ + str(id) + """;
        config.last_top = 0;
        $.ui.getAttachVideo(config.user, config.user_id);
    """
    return render_template('panel/attachment.html',
                           menu=app.config['MENU'],
                           path=request.path,
                           script=script,
                           id=id,
                           users=dumps(get_account_list(session['user_id']))
                           )


def messages_all_audio(id):
    if 'user_id' not in session:
        return redirect('/')
    if not session['rate']:
        return render_template('panel/access_denied.html',
                               menu=app.config['MENU'],
                               path=request.path,
                               users=dumps(get_account_list(session['user_id']))
                               )
    script = """
        $('#list').html('');
        config.user_id = """ + str(id) + """;
        config.last_top = 0;
        $.ui.getAttachAudio(config.user, config.user_id);
    """
    return render_template('panel/attachment.html',
                           menu=app.config['MENU'],
                           path=request.path,
                           script=script,
                           id=id,
                           users=dumps(get_account_list(session['user_id']))
                           )


def messages_all_photo(id):
    if 'user_id' not in session:
        return redirect('/')
    if not session['rate']:
        return render_template('panel/access_denied.html',
                               menu=app.config['MENU'],
                               path=request.path,
                               users=dumps(get_account_list(session['user_id']))
                               )
    script = """
        $('#list').html('');
        config.user_id = """ + str(id) + """;
        config.last_top = 0;
        $.ui.getAttachPhoto(config.user, config.user_id);
    """
    return render_template('panel/attachment.html',
                           menu=app.config['MENU'],
                           path=request.path,
                           script=script,
                           id=id,
                           users=dumps(get_account_list(session['user_id']))
                           )


def messages_all_doc(id):
    if 'user_id' not in session:
        return redirect('/')
    if not session['rate']:
        return render_template('panel/access_denied.html',
                               menu=app.config['MENU'],
                               path=request.path,
                               users=dumps(get_account_list(session['user_id']))
                               )
    script = """
        $('#list').html('');
        config.user_id = """ + str(id) + """;
        config.last_top = 0;
        $.ui.getAttachDoc(config.user, config.user_id);
    """
    return render_template('panel/attachment.html',
                           menu=app.config['MENU'],
                           path=request.path,
                           script=script,
                           id=id,
                           users=dumps(get_account_list(session['user_id']))
                           )


def messages_important():
    if 'user_id' not in session:
        return render_template('main/index.html')
    return render_template('panel/messages/important.html',
                           menu=app.config['MENU'],
                           path=request.path,
                           users=dumps(get_account_list(session['user_id']))
                           )


def dialogs_cache():
    if 'user_id' not in session:
        return render_template('main/index.html')
    return render_template('panel/messages/cache.html',
                           menu=app.config['MENU'],
                           path=request.path,
                           users=dumps(get_account_list(session['user_id']))
                           )


def groups_all():
    if 'user_id' not in session:
        return render_template('main/index.html')
    script = """
        $('#list').html('');
        $.ui.getGroups(config.user);
    """
    return render_template('panel/list.html',
                           menu=app.config['MENU'],
                           path=request.path,
                           script=script,
                           users=dumps(get_account_list(session['user_id']))
                           )


def groups_admin():
    if 'user_id' not in session:
        return render_template('main/index.html')
    script = """
        $('#list').html('');
        $.ui.getAdmin(config.user);
    """
    return render_template('panel/list.html',
                           menu=app.config['MENU'],
                           path=request.path,
                           script=script,
                           users=dumps(get_account_list(session['user_id']))
                           )


def friends_all():
    if 'user_id' not in session:
        return render_template('main/index.html')
    script = """
        $('#list').html('');
        $.ui.getFriends(config.user);
    """
    return render_template('panel/list.html',
                           menu=app.config['MENU'],
                           path=request.path,
                           script=script,
                           users=dumps(get_account_list(session['user_id']))
                           )


def friends_new():
    if 'user_id' not in session:
        return render_template('main/index.html')
    return render_template('panel/friends/new.html',
                           menu=app.config['MENU'],
                           path=request.path,
                           users=dumps(get_account_list(session['user_id']))
                           )
