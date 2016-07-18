from server import app

from controller.view import index, faq, support
from controller.login import login, logout, registry, recovery

app.add_url_rule('/', view_func=index, methods=['GET'])
app.add_url_rule('/faq', view_func=faq, methods=['GET'])
app.add_url_rule('/support', view_func=support, methods=['GET'])

app.add_url_rule('/api/login', view_func=login, methods=['POST'])
app.add_url_rule('/api/logout', view_func=logout, methods=['GET'])
app.add_url_rule('/api/registry', view_func=registry, methods=['GET', 'POST'])
app.add_url_rule('/api/recovery', view_func=recovery, methods=['GET', 'POST'])