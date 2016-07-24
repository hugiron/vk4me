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
    var params = getParams(user);
    $.core.getGroups(params, $.ui.renderGroups);
}

$.ui.getAdmin = function(user) {
    var params = getParams(user);
    params['filter'] = 'moder';
    $.core.getGroups(params, $.ui.renderGroups);
}

$.ui.renderGroups = function(list) {
    var closeStatus = ['Открытая', 'Закрытая', 'Частная'];
    var adminStatus = ['Модератор', 'Редактор', 'Администратор'];
    for (var i = 0; i < list.length; ++i) {
        var url = window.location.protocol + "//" + window.location.host + "/groups/" + list[i]['id'];
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