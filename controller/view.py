from flask import render_template, session
from model.menu import Menu

def index():
    if ('user_id' in session):
        return render_template('panel/index.html', menu=Menu.get())
    return render_template('main/index.html')

def faq():
    return render_template('panel/faq.html', menu=Menu.get())

def support():
    return render_template('panel/support.html', menu=Menu.get())