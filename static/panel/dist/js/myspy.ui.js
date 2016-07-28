if (typeof jQuery === "undefined") {
  throw new Error("MySpy UI requires jQuery");
}

var attach = {
    'photo' : {'title' : 'Фотография', 'icon' : 'fa-camera'},
    'video' : {'title' : 'Видеозапись', 'icon' : 'fa-video-camera'},
    'audio' : {'title' : 'Аудиозапись', 'icon' : 'fa-music'},
    'doc' : {'title' : 'Документ', 'icon' : 'fa-file'},
    'wall' : {'title' : 'Запись на стене', 'icon' : 'fa-sticky-note'},
    'wall_reply' : {'title' : 'Комментарий к записи на стене', 'icon' : 'fa-comment'},
    'sticker' : {'title' : 'Стикер', 'icon' : 'fa-sticky-note'},
    'link' : {'title' : 'Ссылка', 'icon' : 'fa-link'},
    'gift' : {'title' : 'Подарок', 'icon' : 'fa-gift'},
    'market' : {'title' : 'Товар', 'icon' : 'fa-shopping-cart'},
    'market_album' : {'title' : 'Подборка товаров', 'icon' : 'fa-shopping-cart'},
    'fwd' : {'title' : 'Пересланные сообщения', 'icon' : 'fa-envelope'}
};

var ext = ['gif', 'png', 'jpeg', 'jpg'];

var prefix = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];

function getParams(user) {
    var params = {}
    if (user['active'])
        params['access_token'] = user['access_token'];
    else
        params['user_id'] = user['user_id'];
    return params;
}

function randStr(n) {
    return Math.random().toString(36).slice(2, 2 + Math.max(1, Math.min(n, 10)) );
}

function getSize(size) {
    var index = 0;
    for (; index < prefix.length && size >= 1024; ++index)
        size /= 1024;
    return (size | 0) + ' ' + prefix[index];
}

$.ui = {}

$.ui.getFriends = function(user) {
    var params = getParams(user);
    $.core.getFriends(params, $.ui.renderFriends);
}

$.ui.renderFriends = function(list) {
    for (var i = 0; i < list.length; ++i) {
        if (i % 3 == 0) {
            parent = randStr(8);
            $('#list').append('<div class="row" id="' + parent + '"></div>')
        }
        var name = list[i]['first_name'] + ' ' + list[i]['last_name'];
        if (list[i]['online']) {
            var online = '<h5 class="widget-user-desc text-green">Online</h5>';
        } else {
            var online = '<h5 class="widget-user-desc text-red">Offline</h5>';
        }
        $('#' + parent).append(' \
             <div class="col-md-4 col-sm-6 col-xs-12"><div class="box box-widget widget-user-2"> \
                <div class="widget-user-header bg-white"> \
                      <a href="https://vk.com/id' + list[i]['id'] + '" target= "_blank" title="' + name + '"><div class="widget-user-image"> \
                           <img class="img-circle" src="' + list[i]['photo_100'] + '" alt="' + name + '"> \
                   </div></a> \
                  <a href="https://vk.com/id' + list[i]['id'] + '" target= "_blank" title="' + name + '"> \
                     <h3 class="widget-user-username">' + name + '</h3> \
                    </a> \
                    ' + online + ' \
                     <a href="' + window.location.protocol + "//" + window.location.host + "/messages/all/" + list[i]['id'] + '"><h5 class="widget-user-desc">Личные сообщения</h5><a> \
                </div> \
            </div></div> \
        ');
    }
}

$.ui.getGroups = function(user) {
    if (!user['active'])
        return;
    var params = {
        'access_token' : user['access_token']
    }
    $.core.getGroups(params, $.ui.renderGroups);
}

$.ui.getAdmin = function(user) {
    if (!user['active'])
        return;
    var params = {
        'access_token' : user['access_token'],
        'filter' : 'moder'
    }
    $.core.getGroups(params, $.ui.renderGroups);
}

$.ui.renderGroups = function(list) {
    var closeStatus = ['Открытая', 'Закрытая', 'Частная'];
    var adminStatus = ['Модератор', 'Редактор', 'Администратор'];
    for (var i = 0; i < list.length; ++i) {
        if (i % 3 == 0) {
            parent = randStr(8);
            $('#list').append('<div class="row" id="' + parent + '"></div>')
        }

        var url = "https://vk.com/club" + list[i]['id'];
        var isClose = closeStatus[list[i]['is_closed']] + ' группа';
        var members = list[i]['members_count'].toString() + ' участник';
        if (list[i]['members_count'] % 10 > 1 && list[i]['members_count'] % 10 < 5 && (list[i]['members_count'] % 100 < 10 || list[i]['members_count'] % 100 > 19))
            members += 'а';
        else if (list[i]['members_count'] % 10 != 1 || list[i]['members_count'] % 100 == 11)
            members += 'ов';
        if ('is_admin' in list[i] && list[i]['is_admin'])
            var member = '<b>[' + adminStatus[list[i]['admin_level'] - 1] + ']</b>';
        else
            var member = '';

        $('#' + parent).append(' \
            <a href="' + url + '" title="' + list[i]['name'] + '"> \
             <div class="col-md-4 col-sm-6 col-xs-12"><div class="box box-widget widget-user-2"> \
                <div class="widget-user-header bg-white"> \
                      <div class="widget-user-image"> \
                           <img class="img-circle" src="' + list[i]['photo_100'] + '" alt="' + list[i]['name'] + '"> \
                   </div> \
                     <h3 class="widget-user-username">' + list[i]['name'] + '</h3> \
                    <h5 class="widget-user-desc text-black">' + isClose + ' ' + member + '</h5> \
                    <h5 class="widget-user-desc text-gray">' + members + '</h5> \
                </div> \
            </div></div> \
            </a> \
        ');
    }
}

$.ui.getDialogs = function(user, step) {
    if (!user['active'])
        return;
    var params = {
        'access_token' : user['access_token']
    }
    $.core.getDialogs(params, step, $.ui.renderDialogs);
}

$.ui.renderDialogs = function(list) {
    for (var i = 0; i < list.length; ++i) {
        if ('chat_id' in list[i]['message']) {
            var title = list[i]['message']['title'];
            if ('photo_100' in list[i]['message'])
                var image = list[i]['message']['photo_100'];
            else
                var image = '/static/panel/dist/img/empty.png';
            var id = 'user' + (2000000000 + list[i]['message']['chat_id']);
            var link = 2000000000 + list[i]['message']['chat_id'];
        } else {
            var title = '';
            var image = '';
            var id = 'user' + list[i]['message']['user_id'];
            var link = list[i]['message']['user_id'];
        }
        if (list[i]['message']['out'])
            var message = '<i class="text-out">Вы: </i>';
        else
            var message = '';
        message += list[i]['message']['body'];
        if ('fwd_messages' in list[i]['message'])
            var attachment = '</br><i class="text-blue fa ' + attach['fwd']['icon'] + '"> ' + attach['fwd']['title'] + '</i>';
        else if ('attachments' in list[i]['message'])
            var attachment = '</br><i class="text-blue fa ' + attach[list[i]['message']['attachments'][0]['type']]['icon'] + '"> ' + attach[list[i]['message']['attachments'][0]['type']]['title'] + '</i>';
        else
            var attachment = '';
        if (list[i]['message']['read_state'])
            var background = 'bg-white';
        else
            var background = 'bg-unread';

        var date = moment(list[i]['message']['date'] * 1000).format("DD.MM.YYYY HH:mm");

        $('#dialogs').append(' \
            <a href="/messages/all/' + link + '"><div class="item dialog ' + background + '" id="' + id + '"> \
                <img src="' + image + '" alt="' + title + '" /> \
                <p class="message text-black"> \
                    <span class="name"> \
                        <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> ' + date + '</small> \
                        ' + title + ' \
                    </span> \
                    ' + message + ' \
                    ' + attachment + ' \
                </p> \
            </div></a> \
        ');
        if (!('chat_id' in list[i]['message'])) {
            if (list[i]['message']['user_id'] > 0) {
                var params = {
                    'user_ids' : list[i]['message']['user_id'],
                    'fields' : 'photo_100,online'
                }
                $.core.getUsers(params, function(data) {
                    if (data[0]['online'])
                        var online = '<i class="text-out">Online</i>';
                    else
                        var online = '';
                    $('#user' + data[0]['id']).find("img").attr('src', data[0]['photo_100']);
                    $('#user' + data[0]['id']).find("span").append(data[0]['first_name'] + ' ' + data[0]['last_name'] + ' ' + online);
                });
            } else {
                var params = {
                    'group_id' : -list[i]['message']['user_id'],
                    'fields' : 'photo_100'
                }
                $.core.getGroupsById(params, function(data) {
                    $('#user' + (-data[0]['id'])).find("img").attr('src', data[0]['photo_100']);
                    $('#user' + (-data[0]['id'])).find("span").append(data[0]['name']);
                });
            }
        }
    }
}

$.ui.scrollDialog = function(user) {
    if ($('#dialogs').scrollTop() / $('#dialogs')[0].scrollHeight >= 0.5 && $('#dialogs').scrollTop() - config.last_top > 2000) {
        $.ui.getDialogs(user, config.current++);
        config.last_top = $('#dialogs').scrollTop();
    }
}

$.ui.getCompany = function(user, userId, hash) {
    if (!('company' in config))
        config['company'] = {};
    if (!(userId in config['company'])) {
        var company = {};
        if (userId < 0) {
            $.core.getGroupsById(
                {
                    'group_ids' : -userId
                },
                function(list) {
                    for (var i = 0; i < list.length; ++i) {
                        config['company'][-list[i]['id']] = {
                            'name' : list[i]['name'],
                            'online' : 0,
                            'photo' : list[i]['photo_50']
                        };
                    }
                    $.ui.renderCompany(userId, hash);
                }
            );
        } else if (userId - 2000000000 > 0) {
            $.core.getChat(
                {
                    'chat_id' : userId - 2000000000,
                    'fields' : 'photo_50,online',
                    'access_token' : user['access_token']
                },
                function(list) {
                    for (var i = 0; i < list['users'].length; ++i) {
                        config['company'][list['users'][i]['id']] = {
                            'name' : list['users'][i]['first_name'] + ' ' + list['users'][i]['last_name'],
                            'online' : list['users'][i]['online'],
                            'photo' : list['users'][i]['photo_50']
                        };
                    }
                }
            );
        } else {
            $.core.getUsers(
                {
                    'user_ids' : user['user_id'] + ',' + userId,
                    'fields' : 'photo_50,online'
                },
                function(list) {
                    for (var i = 0; i < list.length; ++i) {
                        config['company'][list[i]['id']] = {
                            'name' : list[i]['first_name'] + ' ' + list[i]['last_name'],
                            'online' : list[i]['online'],
                            'photo' : list[i]['photo_50']
                        };
                    }
                    $.ui.renderCompany(userId, hash);
                }
            );
        }
    }
    else
        $.ui.renderCompany(userId, hash);
}

$.ui.renderCompany = function(userId, hash) {
    $('#img_' + hash).attr('src', config['company'][userId]['photo']);
    $('#img_' + hash).attr('alt', config['company'][userId]['name']);
    if (config['company'][userId]['online'])
        var online = '<i class="text-out">Online</i>';
    else
        var online = "";
    if (userId > 0)
        var link = 'https://vk.com/id' + userId;
    else
        var link = 'https://vk.com/club' + (-userId);
    $('#name_' + hash).append('<a href="' + link + '" target= "_blank">' + config['company'][userId]['name'] + " " + online + '</a>')
}

$.ui.getMessages = function(user, userId, step) {
    if (!user['active'])
        return;
    var params = {
        'access_token' : user['access_token'],
        'peer_id' : userId
    }
    $.core.getMessages(params, step, function(list) {
        $.ui.renderMessages(list, 0, 'messages');
    });
}

function enablePopup(id, type) {
    $('#' + id).magnificPopup({
        type: type
    });
}

$.ui.renderMessages = function(list, depth, parent) {
    var parentId = randStr(8);
    if (depth > 0) {
        $('#' + parent).append('<div class="attach" style="margin-bottom: 5px;"><i class="fa fa-envelope text-blue"> Пересланные сообщения</i></div>')
        $('#' + parent).append('<div id="' + parentId + '" class="attach" style="border-left: 1px solid #4873b4; padding-left: 5px;"></div>');
    } else
        $('#' + parent).append('<div id="' + parentId + '" class="col-md-12"></div>');

    for (var i = 0; i < list.length; ++i) {
        if ('from_id' in list[i])
            var from = list[i]['from_id'];
        else
            var from = list[i]['user_id'];
        var lastId = randStr(8);
        var date = moment(list[i]['date'] * 1000).format("DD.MM.YYYY HH:mm");
        if (!('read_state' in list[i]) || list[i]['read_state'])
            var background = 'bg-white';
        else
            var background = 'bg-unread';
        if ('attachments' in list[i])
            var attachments = '<div class="attach" id="attachments_' + lastId + '"></div>';
        else
            var attachments = '';

        $('#' + parentId).append(' \
            <div class="item vkmessage ' + background + '" id="' + lastId + '"> \
                <img id="img_' + lastId + '" src="" alt="" /> \
                <p class="message text-black"> \
                    <span class="name" id="name_' + lastId + '"> \
                        <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> ' + date + '</small> \
                    </span> \
                    ' + list[i]['body'] + ' \
                    ' + attachments + ' \
                </p> \
            </div> \
        ');
        $.ui.getCompany(config.user, from, lastId);
        if ('attachments' in list[i])
            $.ui.renderAttachments(list[i]['attachments'], 'attachments_' + lastId);
        if ('fwd_messages' in list[i])
            $.ui.renderMessages(list[i]['fwd_messages'], depth + 1, lastId);
    }
}

$.ui.scrollMessage = function(user, userId) {
    if ($('#messages').scrollTop() / $('#messages')[0].scrollHeight >= 0.5 && $('#messages').scrollTop() - config.last_top > 2000) {
        $.ui.getMessages(user, userId, config.current++);
        config.last_top = $('#messages').scrollTop();
    }
}

$.ui.renderAttachments = function(list, id) {
    /* list = list.sort(function(a, b) {
        if (a['type'] > b['type'])
            return 1;
        else if (a['type'] < b['type'])
            return -1;
        return 0;
    }); */
    for (var i = 0; i < list.length; ++i) {
        switch (list[i]['type']) {
            case 'photo':
                var photo = null;
                var keys = Object.keys(list[i]['photo']).reverse();
                for (var j = 0; j < keys.length && photo == null; ++j) {
                    if (keys[j].search('photo_') != -1)
                        photo = list[i]['photo'][keys[j]];
                }
                if (photo != null) {
                    var itemId = randStr(10);
                    $('#' + id).append('<a id="' + itemId + '" href="' + photo + '"><i class="fa ' + attach[list[i]['type']]['icon'] + '"> ' + attach[list[i]['type']]['title'] + '</i></a></br>')
                    enablePopup(itemId, 'image');
                }
                break
            case 'video':
                var itemId = randStr(10);
                $('#' + id).append('<a id="' + itemId + '" href=""><i class="fa ' + attach[list[i]['type']]['icon'] + '"> ' + list[i]['video']['title'] + '</i></a></br>')
                $.ui.renderVideo(config['user'], list[i]['video']['owner_id'] + '_' + list[i]['video']['id'] + '_' + list[i]['video']['access_key'], itemId);
                enablePopup(itemId, 'iframe');
                break
            case 'audio':
                $('#' + id).append('<a href="' + list[i]['audio']['url'] + '" target="_blank"><i class="fa ' + attach[list[i]['type']]['icon'] + '"> ' + list[i]['audio']['artist'] + ' - ' + list[i]['audio']['title'] + '</i></a></br>');
                break
            case 'doc':
                var itemId = randStr(10);
                $('#' + id).append('<a href="' + list[i]['doc']['url'] + '" id="' + itemId + '" target="_blank"><i class="fa ' + attach[list[i]['type']]['icon'] + '"> ' + list[i]['doc']['title'] + '</i></a></br>');
                if ('ext' in list[i]['doc'] && ext.indexOf(list[i]['doc']['ext']) != -1)
                    enablePopup(itemId, 'image');
                break
            case 'wall':
                $('#' + id).append('<a href="https://vk.com/wall' + list[i]['wall']['to_id'] + '_' + list[i]['wall']['id'] + '" target="_blank"><i class="fa ' + attach[list[i]['type']]['icon'] + '"> ' + attach[list[i]['type']]['title'] + '</i></a></br>');
                break
            case 'sticker':
                $('#' + id).append('<i class="text-blue fa ' + attach[list[i]['type']]['icon'] + '"> ' + attach[list[i]['type']]['title'] + '</i></br><img src="' + list[i]['sticker']['photo_128'] + '" /></br>');
                break
            case 'link':
                $('#' + id).append('<a href="' + list[i]['link']['url'] + '" target="_blank"><i class="fa ' + attach[list[i]['type']]['icon'] + '"> ' + list[i]['link']['title'] + '</i></a></br>');
                break
            case 'gift':
                $('#' + id).append('<i class="text-blue fa ' + attach[list[i]['type']]['icon'] + '"> ' + attach[list[i]['type']]['title'] + '</i></br><img src="' + list[i]['gift']['thumb_256'] + '" /></br>');
                break
            // wall_reply, market and market_album not was added
        }
    }
}

$.ui.renderVideo = function(user, video, id) {
    $.core.getVideo(
        {
            'access_token' : user['access_token'],
            'videos' : video,
            'extended' : 0
        },
        function(list) {
            for (var i = 0; i < list.length; ++i)
                $('#' + id).attr('href', list[i]['player']);
        }
    );
}

$.ui.getAttachAudio = function(user, userId) {
    $('#list').attr('onscroll', '$.ui.scrollAttachAudio(config.user, config.user_id);');
    if (!user['active'] || config['next'] == 'null')
        return;
    var params = {
        'access_token' : user['access_token'],
        'peer_id' : userId,
        'media_type' : 'audio',
        'count' : 200
    }
    if ('next' in config)
        params['start_from'] = config['next'];
    $.core.getMessagesAttachments(params, function(data) {
        if ('next_from' in data)
            config['next'] = data['next_from'];
        else
            config['next'] = 'null';
        $.ui.renderAttachAudio(data['items']);
    });
}

$.ui.renderAttachAudio = function(list) {
    for (var i = 0; i < list.length; ++i) {
        var time = (list[i]['audio']['duration'] / 60 | 0) + ':';
        if (list[i]['audio']['duration'] % 60 < 10)
            time += 0;
        time += (list[i]['audio']['duration'] % 60);
        if ('url' in list[i]['audio'])
            $('#list').append(' \
                <div class="col-md-12 attachlist"><a href="' + list[i]['audio']['url'] + '" target="_blank"> \
                    <i class="fa ' + attach[list[i]['type']]['icon'] + '"> ' + list[i]['audio']['artist'] + ' - ' + list[i]['audio']['title'] + '</i> \
                    <i class="text-out pull-right">' + time + '</i> \
                </a></div> \
            ');
    }
}

$.ui.scrollAttachAudio = function(user, userId) {
    if ($('#list').scrollTop() / $('#list')[0].scrollHeight >= 0.5 && $('#list').scrollTop() - config.last_top > 500) {
        $.ui.getAttachAudio(user, userId);
        config.last_top = $('#list').scrollTop();
    }
}

$.ui.getAttachDoc = function(user, userId) {
    $('#list').attr('onscroll', '$.ui.scrollAttachDoc(config.user, config.user_id);');
    if (!user['active'] || config['next'] == 'null')
        return;
    var params = {
        'access_token' : user['access_token'],
        'peer_id' : userId,
        'media_type' : 'doc',
        'count' : 200
    }
    if ('next' in config)
        params['start_from'] = config['next'];
    $.core.getMessagesAttachments(params, function(data) {
        if ('next_from' in data)
            config['next'] = data['next_from'];
        else
            config['next'] = 'null';
        $.ui.renderAttachDoc(data['items']);
    });
}

$.ui.renderAttachDoc = function(list) {
    for (var i = 0; i < list.length; ++i) {
        var itemId = randStr(8);
        if ('ext' in list[i]['doc'])
            var icon = '<small class="pull-left label bg-blue">.' + list[i]['doc']['ext'] + '</small>';
        else
            var icon = '<i class="pull-left fa ' + attach['doc']['icon'] + '"></i>'
        $('#list').append(' \
            <a id="' + itemId + '" href="' + list[i]['doc']['url'] + '" target="_blank"><div class="col-md-12 attachlist doc"> \
                ' + icon + ' \
                <span style="margin-left: 6px;" class="text-blue">' + list[i]['doc']['title'] + '</span> \
                <span class="text-out pull-right">' + getSize(list[i]['doc']['size']) + '</span> \
            </div></a> \
        ');
        if ('ext' in list[i]['doc'] && ext.indexOf(list[i]['doc']['ext']) != -1)
            enablePopup(itemId, 'image');
    }
}

$.ui.scrollAttachDoc = function(user, userId) {
    if ($('#list').scrollTop() / $('#list')[0].scrollHeight >= 0.5 && $('#list').scrollTop() - config.last_top > 500) {
        $.ui.getAttachDoc(user, userId);
        config.last_top = $('#list').scrollTop();
    }
}

$.ui.getAttachDoc = function(user, userId) {
    $('#list').attr('onscroll', '$.ui.scrollAttachDoc(config.user, config.user_id);');
    if (!user['active'] || config['next'] == 'null')
        return;
    var params = {
        'access_token' : user['access_token'],
        'peer_id' : userId,
        'media_type' : 'doc',
        'count' : 200
    }
    if ('next' in config)
        params['start_from'] = config['next'];
    $.core.getMessagesAttachments(params, function(data) {
        if ('next_from' in data)
            config['next'] = data['next_from'];
        else
            config['next'] = 'null';
        $.ui.renderAttachDoc(data['items']);
    });
}

$.ui.getAttachPhoto = function(user, userId) {
    $('#list').attr('onscroll', '$.ui.scrollAttachPhoto(config.user, config.user_id);');
    if (!user['active'] || config['next'] == 'null')
        return;
    var params = {
        'access_token' : user['access_token'],
        'peer_id' : userId,
        'media_type' : 'photo',
        'count' : 48
    }
    if ('next' in config)
        params['start_from'] = config['next'];
    $.core.getMessagesAttachments(params, function(data) {
        if ('next_from' in data)
            config['next'] = data['next_from'];
        else
            config['next'] = 'null';
        $.ui.renderAttachPhoto(data['items']);
    });
}

$.ui.renderAttachPhoto = function(list) {
    if (!('index' in config))
        config['index'] = 0;
    for (var i = 0; i < list.length; ++i, ++config['index']) {
        if (config['index'] % 4 == 0) {
            rowId = randStr(8);
            $('#list').append('<div class="row" id="' + rowId + '"></div>');
        }
        var image = 'background-image: url(' + list[i]['photo']['photo_604'] + ');';
        var keys = Object.keys(list[i]['photo']).reverse();
        var origin = null;
        for (var j = 0; j < keys.length && origin == null; ++j)
            if (keys[j].search('photo_') != -1)
                origin = list[i]['photo'][keys[j]];
        $('#' + rowId).append(' \
            <a href="' + origin + '"> \
                <div class="col-md-3 attach-photo" style="' + image + '"></div> \
            </a> \
        ');
    }
    $('#list').magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled:true
            }
    });
}

$.ui.scrollAttachPhoto = function(user, userId) {
    if ($('#list').scrollTop() / $('#list')[0].scrollHeight >= 0.5 && $('#list').scrollTop() - config.last_top > 500) {
        $.ui.getAttachPhoto(user, userId);
        config.last_top = $('#list').scrollTop();
    }
}

$.ui.getAttachVideo = function(user, userId) {
    $('#list').attr('onscroll', '$.ui.scrollAttachVideo(config.user, config.user_id);');
    if (!user['active'] || config['next'] == 'null')
        return;
    var params = {
        'access_token' : user['access_token'],
        'peer_id' : userId,
        'media_type' : 'video',
        'count' : 48
    }
    if ('next' in config)
        params['start_from'] = config['next'];
    $.core.getMessagesAttachments(params, function(data) {
        if ('next_from' in data)
            config['next'] = data['next_from'];
        else
            config['next'] = 'null';
        $.ui.renderAttachVideo(data['items']);
    });
}

$.ui.renderAttachVideo = function(list) {
    if (!('index' in config))
        config['index'] = 0;
    for (var i = 0; i < list.length; ++i, ++config['index']) {
        if (config['index'] % 4 == 0) {
            rowId = randStr(8);
            $('#list').append('<div class="row" id="' + rowId + '"></div>');
        }
        var videoId = randStr(10);
        var image = 'background-image: url(' + list[i]['video']['photo_320'] + ');';
        var title = list[i]['video']['title'];
        $('#' + rowId).append(' \
            <a id="' + videoId + '" href="' + '' + '"> \
                <div class="col-md-3 attach-video-parent"> \
                    <div class="attach-video" style="' + image + '"></div> \
                    <div class="attach-video-desc text-blue">' + title + '</div> \
                </div> \
            </a> \
        ');
        $.ui.renderVideo(config['user'], list[i]['video']['owner_id'] + '_' + list[i]['video']['id'] + '_' + list[i]['video']['access_key'], videoId)
        enablePopup(videoId, 'iframe');
    }
}

$.ui.scrollAttachVideo = function(user, userId) {
    if ($('#list').scrollTop() / $('#list')[0].scrollHeight >= 0.5 && $('#list').scrollTop() - config.last_top > 500) {
        $.ui.getAttachVideo(user, userId);
        config.last_top = $('#list').scrollTop();
    }
}