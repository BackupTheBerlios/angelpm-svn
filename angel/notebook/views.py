from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import render_to_response
from collabnote.register.models import UserInfo

@login_required
def index(request):
    """docstring for index"""
    return render_to_response("notebook/index.html",
            RequestContext(request))

@login_required
def dashboard(request):
    """docstring for dashboard"""
    return render_to_response("notebook/dashboard.html",
            RequestContext(request))

@login_required
def account(request):
    """docstring for account"""
    user = request.user
    try:
        userinfo = UserInfo.objects.get(user=user)
        return render_to_response("notebook/account.html",
                RequestContext(request, {'userinfo':userinfo}))
    except Exception, e:
        print e

@login_required
def documents(request):
    """docstring for documents"""
    return render_to_response("notebook/documents.html",
            RequestContext(request))
