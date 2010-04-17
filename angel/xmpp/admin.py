from django.contrib import admin
from collabnote.xmpp.models import *

class OfUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'name', 'email')

admin.site.register(OfUser, OfUserAdmin)
