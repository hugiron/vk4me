from model.menu import Menu

menu = [
    Menu('Друзья', '/friends', 'fa fa-user', [
        Menu('Все', '/friends/all', 'fa fa-list'),
        Menu('Новые', '/friends/new', 'fa fa-clock-o')
    ]),
    Menu('Сообщения', '/messages', 'fa fa-envelope', [
        Menu('Актуальные', '/messages/all', 'fa fa-comments'),
        Menu('Важные', '/messages/important', 'fa fa-star'),
        Menu('Кэш', '/messages/cache', 'fa fa-database')
    ]),
    Menu('Группы', '/groups', 'fa fa-users', [
        Menu('Все', '/groups/all', 'fa fa-list'),
        Menu('Администрирование', '/groups/admin', 'fa fa-briefcase')
    ])
]
