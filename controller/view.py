from flask import render_template, session

def index():
    if ('user_id' in session):
        return render_template('panel/index.html')
    return render_template('main/index.html')

def faq():
    return render_template('panel/faq.html')

def support():
    return render_template('panel/support.html')