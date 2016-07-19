class Menu:
    def __init__(self, title, link, icon, tabs=list()):
        self.title = title
        self.link = link
        self.icon = icon
        self.tabs = tabs

    @staticmethod
    def get():
        return [
            Menu('Друзья', '#', 'fa fa-user', [
                Menu('Все', '/friends/all', 'fa fa-list'),
                Menu('Новые', '/friends/new', 'fa fa-clock-o')
            ]),
            Menu('Сообщения', '#', 'fa fa-envelope', [
                Menu('Актуальные', '/messages/all', 'fa fa-comments'),
                Menu('Важные', '/messages/important', 'fa fa-star'),
                Menu('Кэш', '/messages/cache', 'fa fa-database')
            ]),
            Menu('Группы', '#', 'fa fa-users', [
                Menu('Все', '/groups/all', 'fa fa-list'),
                Menu('Администрирование', '/groups/admin', 'fa fa-briefcase')
            ])
        ]