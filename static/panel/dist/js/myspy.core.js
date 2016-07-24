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
    params['order'] = 'hints';
    params['fields'] = 'photo_100,online';
    $.core.request(
        'friends.get',
        params,
        function(data) {
            callback(data['items']);
        }
    );
}