from django.http import HttpResponse
import xmlrpclib

def shout(request):
    """docstring for shout"""
    message = request.POST["message"]
    proxy = xmlrpclib.ServerProxy("http://localhost:8045")
    proxy.transmit("/shouts", message)
    print message
    return HttpResponse("OK")
