from flask import render_template, session, request, redirect
from server import app


def index():
    if (not 'user_id' in session):
        return redirect('/login')
    return render_template('panel/index.html', menu=app.config['MENU'], path=request.path)


def faq():
    if (not 'user_id' in session):
        return redirect('/')
    return render_template('panel/faq.html', menu=app.config['MENU'], path=request.path)


def support():
    if (not 'user_id' in session):
        return redirect('/')
    return render_template('panel/support.html', menu=app.config['MENU'], path=request.path)


def dialogs_all():
    if (not 'user_id' in session):
        return redirect('/')
    script = """
        $('#dialogs').html('');
        if ('last_id' in config)
            delete config['last_id'];
        config.last_top = 0;
        $.ui.getDialogs(config.user);
    """
    return render_template('panel/dialog.html', menu=app.config['MENU'], path=request.path, script=script)


def messages_all(id):
    if (not 'user_id' in session):
        return redirect('/')
    script = """
        $('#messages').html('');
        if ('last_id' in config)
            delete config['last_id'];
        config.user_id = """ + str(id) + """;
        config.last_top = 0;
        $.ui.getMessages(config.user, config.user_id);
    """
    return render_template('panel/message.html', menu=app.config['MENU'], path=request.path, script=script, id=id)


def messages_all_video(id):
    if (not 'user_id' in session):
        return redirect('/')
    script = """
        $('#list').html('');
        config.user_id = """ + str(id) + """;
        config.last_top = 0;
        $.ui.getAttachVideo(config.user, config.user_id);
    """
    return render_template('panel/attachment.html', menu=app.config['MENU'], path=request.path, script=script, id=id)


def messages_all_audio(id):
    if (not 'user_id' in session):
        return redirect('/')
    script = """
        $('#list').html('');
        config.user_id = """ + str(id) + """;
        config.last_top = 0;
        $.ui.getAttachAudio(config.user, config.user_id);
    """
    return render_template('panel/attachment.html', menu=app.config['MENU'], path=request.path, script=script, id=id)


def messages_all_photo(id):
    if (not 'user_id' in session):
        return redirect('/')
    script = """
        $('#list').html('');
        config.user_id = """ + str(id) + """;
        config.last_top = 0;
        $.ui.getAttachPhoto(config.user, config.user_id);
    """
    return render_template('panel/attachment.html', menu=app.config['MENU'], path=request.path, script=script, id=id)


def messages_all_doc(id):
    if (not 'user_id' in session):
        return redirect('/')
    script = """
        $('#list').html('');
        config.user_id = """ + str(id) + """;
        config.last_top = 0;
        $.ui.getAttachDoc(config.user, config.user_id);
    """
    return render_template('panel/attachment.html', menu=app.config['MENU'], path=request.path, script=script, id=id)


def messages_important():
    if (not 'user_id' in session):
        return render_template('main/index.html')
    return render_template('panel/messages/important.html', menu=app.config['MENU'], path=request.path)


def dialogs_cache():
    if (not 'user_id' in session):
        return render_template('main/index.html')
    return render_template('panel/messages/cache.html', menu=app.config['MENU'], path=request.path)


def groups_all():
    if (not 'user_id' in session):
        return render_template('main/index.html')
    script = """
        $('#list').html('');
        $.ui.getGroups(config.user);
    """
    return render_template('panel/list.html', menu=app.config['MENU'], path=request.path, script=script)


def groups_admin():
    if (not 'user_id' in session):
        return render_template('main/index.html')
    script = """
        $('#list').html('');
        $.ui.getAdmin(config.user);
    """
    return render_template('panel/list.html', menu=app.config['MENU'], path=request.path, script=script)


def friends_all():
    if (not 'user_id' in session):
        return render_template('main/index.html')
    script = """
        $('#list').html('');
        $.ui.getFriends(config.user);
    """
    return render_template('panel/list.html', menu=app.config['MENU'], path=request.path, script=script)


def friends_new():
    if (not 'user_id' in session):
        return render_template('main/index.html')
    return render_template('panel/friends/new.html', menu=app.config['MENU'], path=request.path)
