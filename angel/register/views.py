from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.template import RequestContext
from collabnote.register.models import UserInfo
from collabnote.xmpp.models import OfUser
from collabnote.register.forms import RegisterForm, LoginForm
import simplejson as json

def index(request):
    """docstring for index"""
    return render_to_response("register/index.html",
            RequestContext(request))

def check_username(request):
    """docstring for check_username"""
    username = request.POST['username']
    exist = UserInfo.objects.username_exist(username)
    if exist:
        return HttpResponse(json.dumps("Username %s already exists" % username),
                 mimetype="text/json");
    else:
        return HttpResponse(json.dumps(True), mimetype="text/json")

def check_userexist(request):
    """docstring for check_userexist"""
    username = request.POST['username']
    exist = UserInfo.objects.username_exist(username)
    if not exist:
        return HttpResponse(json.dumps("Username %s doesn't exists" % username),
                 mimetype="text/json");
    else:
        return HttpResponse(json.dumps(True), mimetype="text/json")

def check_password(request):
    """docstring for check_password"""
    username = request.POST['username']
    password = request.POST['password']
    auth = UserInfo.objects.check_user_pass(username, password)
    if auth:
        return HttpResponse(json.dumps(True), mimetype="text/json")
    else:
        return HttpResponse(json.dumps("Please provide the correct password"),
                mimetype="text/json")

def register(request):
    """docstring for register"""
    reg_form = RegisterForm(request.POST)
    if reg_form.is_valid():
        # Insert the values into the database
        reg_data = reg_form.cleaned_data
        response = {'status': 'OK', 'errors': {},
                'redirect': '/notebook/'}

        if UserInfo.objects.username_exist(reg_data['username']):
            response['status'] = 'Failed'
            response['errors']["username"] = \
                    "Username %s already exists" % reg_data['username']
            print json.dumps(response)
            return HttpResponse(json.dumps(response), mimetype="text/json")
        try:
            user = UserInfo.objects.create_user(reg_data['username'],
                reg_data['email'], reg_data['password'],
                reg_data['gender'], reg_data['dob'])
        except Exception, e:
            print e
    return HttpResponse(json.dumps(response), mimetype="text/json")

def login_user(request):
    """docstring for login"""
    if request.method == 'GET':
        next = "/"
        if request.GET.has_key("next"):
            next = request.GET['next']
        form = LoginForm()
        return render_to_response("register/login.html",
                {'form': form, 'next': next})

    elif request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            login_data = form.cleaned_data
            response = {'status': 'OK', 'errors': {}}
            user = authenticate(username=login_data['username'],
                    password=login_data['password'])
            if user is not None:
                if user.is_active:
                    login(request, user)
                    response['redirect'] = login_data['next']
                    return HttpResponse(json.dumps(response),
                            mimetype="text/json")
                else:
                    response['status'] = 'Failed'
                    response['errors']['username'] = "Your account is not activated"
                    return HttpResponse(json.dumps(response),
                            mimetype="text/json")
            else:
                response['status'] = "Failed"
                response['errors']['password'] = "Username and password doesn't match"
                return HttpResponse(json.dumps(response),
                        mimetype="text/json")

def logout_user(request):
    """docstring for logout_user"""
    logout(request)
    return HttpResponseRedirect("/")
