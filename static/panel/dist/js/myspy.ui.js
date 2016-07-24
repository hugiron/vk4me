if (typeof jQuery === "undefined") {
  throw new Error("MySpy UI requires jQuery");
}

$.ui = {}

$.ui.getFriends = function(user) {
    var params = {}
    if (user['active'])
        params['access_token'] = user['access_token'];
    else
        params['user_id'] = user['user_id'];
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