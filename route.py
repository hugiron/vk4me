from server import app

from controller.view import *
from controller.login import *

app.add_url_rule('/', view_func=index, methods=['GET'], strict_slashes=False)
app.add_url_rule('/faq', view_func=faq, methods=['GET'], strict_slashes=False)
app.add_url_rule('/support', view_func=support, methods=['GET'], strict_slashes=False)

app.add_url_rule('/friends/all', view_func=friends_all, methods=['GET'], strict_slashes=False)
#app.add_url_rule('/friends/new', view_func=friends_new, methods=['GET'], strict_slashes=False)

app.add_url_rule('/messages/all', view_func=dialogs_all, methods=['GET'], strict_slashes=False)
app.add_url_rule('/messages/all/<string:id>', view_func=messages_all, methods=['GET'], strict_slashes=False)
app.add_url_rule('/messages/all/<string:id>/video', view_func=messages_all_video, methods=['GET'], strict_slashes=False)
app.add_url_rule('/messages/all/<string:id>/audio', view_func=messages_all_audio, methods=['GET'], strict_slashes=False)
app.add_url_rule('/messages/all/<string:id>/photo', view_func=messages_all_photo, methods=['GET'], strict_slashes=False)
app.add_url_rule('/messages/all/<string:id>/doc', view_func=messages_all_doc, methods=['GET'], strict_slashes=False)
#app.add_url_rule('/messages/important', view_func=messages_important, methods=['GET'], strict_slashes=False)
#app.add_url_rule('/messages/cache', view_func=dialogs_cache, methods=['GET'], strict_slashes=False)

app.add_url_rule('/groups/all', view_func=groups_all, methods=['GET'], strict_slashes=False)
app.add_url_rule('/groups/admin', view_func=groups_admin, methods=['GET'], strict_slashes=False)

app.add_url_rule('/login', view_func=login, methods=['GET', 'POST'], strict_slashes=False)
app.add_url_rule('/logout', view_func=logout, methods=['GET'], strict_slashes=False)
app.add_url_rule('/registry', view_func=registry, methods=['GET', 'POST'], strict_slashes=False)
app.add_url_rule('/recovery', view_func=recovery, methods=['GET', 'POST'], strict_slashes=False)