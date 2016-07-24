if (typeof jQuery === "undefined") {
  throw new Error("MySpy Core requires jQuery");
}

$.core = {}

$.core.request = function(method, params, callback) {
    params['v'] = '5.53';
    $.ajax({
        type: "POST",
        url: "https://api.vk.com/method/" + method,
        data: params,
        success: function(data) {
            if (!('error' in data))
                callback(data['response']);
            else if (data['error']['error_code'] == 5)
                location.reload();
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
        alert(params['offset']);
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