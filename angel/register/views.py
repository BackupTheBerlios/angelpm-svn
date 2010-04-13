from django.shortcuts import render_to_response

def index(request):
    """docstring for index"""
    return render_to_response("register/index.html")
