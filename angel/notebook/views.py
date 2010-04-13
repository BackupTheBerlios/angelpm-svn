from django.shortcuts import render_to_response

def index(request):
    """docstring for index"""
    return render_to_response("notebook/index.html")

def init_collab_window(request):
    """docstring for init_collab_window"""
    return render_to_response("notebook/collaborators.html")

def init_notebook_window(request):
    return render_to_response("notebook/notebook.html")

def init_im_window(request):
    """docstring for init_im_window"""
    return render_to_response("notebook/im.html")

def edit(request):
    """docstring for edit"""
    return render_to_response("notebook/editor.html")
