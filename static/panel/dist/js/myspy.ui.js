if (typeof jQuery === "undefined") {
  throw new Error("MySpy UI requires jQuery");
}

function getParams(user) {
    var params = {}
    if (user['active'])
        params['access_token'] = user['access_token'];
    else
        params['user_id'] = user['user_id'];
    return params;
}

$.ui = {}

$.ui.getFriends = function(user) {
    var params = getParams(user);
    $.core.getFriends(params, $.ui.renderFriends);
}

$.ui.renderFriends = function(list) {
    for (var i = 0; i < list.length; ++i) {
        var name = list[i]['first_name'] + ' ' + list[i]['last_name'];
        if (list[i]['online']) {
            var online = '<h5 class="widget-user-desc text-green">Online</h5>';
        } else {
            var online = '<h5 class="widget-user-desc text-red">Offline</h5>';
        }
        $('#list-' + (i % 3)).append(' \
             <div class="box box-widget widget-user-2"> \
                <div class="widget-user-header bg-white"> \
                      <a href="https://vk.com/id' + list[i]['id'] + '" title="' + name + '"><div class="widget-user-image"> \
                           <img class="img-circle" src="' + list[i]['photo_100'] + '" alt="' + name + '"> \
                   </div></a> \
                  <a href="https://vk.com/id' + list[i]['id'] + '" title="' + name + '"> \
                     <h3 class="widget-user-username">' + name + '</h3> \
                    </a> \
                    ' + online + ' \
                     <a href="' + window.location.protocol + "//" + window.location.host + "/messages/all/" + list[i]['id'] + '"><h5 class="widget-user-desc">Личные сообщения</h5><a> \
                </div> \
            </div> \
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
        var url = "/groups/" + list[i]['id'];
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

        $('#list-' + (i % 3)).append(' \
            <a href="' + url + '" title="' + list[i]['name'] + '"> \
             <div class="box box-widget widget-user-2"> \
                <div class="widget-user-header bg-white"> \
                      <div class="widget-user-image"> \
                           <img class="img-circle" src="' + list[i]['photo_100'] + '" alt="' + list[i]['name'] + '"> \
                   </div> \
                     <h3 class="widget-user-username">' + list[i]['name'] + '</h3> \
                    <h5 class="widget-user-desc text-black">' + isClose + ' ' + member + '</h5> \
                    <h5 class="widget-user-desc text-gray">' + members + '</h5> \
                </div> \
            </div> \
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
    var attach = {
        'photo' : 'Фотография',
        'video' : 'Видеозапись',
        'audio' : 'Аудиозапись',
        'doc' : 'Документ',
        'wall' : 'Запись на стене',
        'wall_reply' : 'Комментарий к записи на стене',
        'sticker' : 'Стикер',
        'link' : 'Ссылка',
        'gift' : 'Подарок',
        'market' : 'Товар',
        'market_album' : 'Подборка товаров'
    };
    for (var i = 0; i < list.length; ++i) {
        if ('chat_id' in list[i]['message']) {
            var title = list[i]['message']['title'];
            if ('photo_100' in list[i]['message'])
                var image = list[i]['message']['photo_100'];
            else
                var image = '/static/panel/dist/img/empty.png';
            var id = 'chat' + list[i]['message']['chat_id'];
            var link = 'chat/' + list[i]['message']['chat_id'];
        } else {
            var title = '';
            var image = '';
            var id = 'user' + list[i]['message']['user_id'];
            var link = 'user/' + list[i]['message']['user_id'];
        }
        if (list[i]['message']['out'])
            var message = '<i class="text-out">Вы: </i>';
        else
            var message = '';
        message += list[i]['message']['body'];
        if ('attachments' in list[i]['message'])
            var attachment = '</br><i class="text-blue">' + attach[list[i]['message']['attachments'][0]['type']] + '</i>';
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
        }
    }
}

$.ui.scrollDialog = function(user) {
    if ($('#dialogs').scrollTop() / $('#dialogs')[0].scrollHeight >= 0.5 && $('#dialogs').scrollTop() - lastTop > 2000) {
        $.ui.getDialogs(user, current++);
        lastTop = $('#dialogs').scrollTop();
    }
}