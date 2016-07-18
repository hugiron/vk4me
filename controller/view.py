from flask import render_template, session

def index():
    #if ('user_id' in session):
    return render_template('panel/index.html')
    #return render_template('main/index.html')