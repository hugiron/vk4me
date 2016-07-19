from server import app

from controller.view import *
from controller.login import *

app.add_url_rule('/', view_func=index, methods=['GET'], strict_slashes=False)
app.add_url_rule('/faq', view_func=faq, methods=['GET'], strict_slashes=False)
app.add_url_rule('/support', view_func=support, methods=['GET'], strict_slashes=False)

app.add_url_rule('/friends/all', view_func=friends_all, methods=['GET'], strict_slashes=False)
app.add_url_rule('/friends/new', view_func=friends_new, methods=['GET'], strict_slashes=False)

app.add_url_rule('/messages/all', view_func=messages_all, methods=['GET'], strict_slashes=False)
app.add_url_rule('/messages/important', view_func=messages_important, methods=['GET'], strict_slashes=False)
app.add_url_rule('/messages/cache', view_func=messages_cache, methods=['GET'], strict_slashes=False)

app.add_url_rule('/groups/all', view_func=groups_all, methods=['GET'], strict_slashes=False)
app.add_url_rule('/groups/admin', view_func=groups_admin, methods=['GET'], strict_slashes=False)

app.add_url_rule('/api/login', view_func=login, methods=['POST'], strict_slashes=False)
app.add_url_rule('/api/logout', view_func=logout, methods=['GET'], strict_slashes=False)
app.add_url_rule('/api/registry', view_func=registry, methods=['GET', 'POST'], strict_slashes=False)
app.add_url_rule('/api/recovery', view_func=recovery, methods=['GET', 'POST'], strict_slashes=False)