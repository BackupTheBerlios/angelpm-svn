from django.conf.urls.defaults import *
from django.conf import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    (r'^$', 'collabnote.main.views.index'),

    (r'^notebook/$', 'collabnote.notebook.views.index'),
    (r'^notebook/dashboard/$', 'collabnote.notebook.views.dashboard'),
    (r'^notebook/documents/$', 'collabnote.notebook.views.documents'),
    (r'^notebook/account/$', 'collabnote.notebook.views.account'),

    (r'^register/$', 'collabnote.register.views.index'),
    (r'^register/register/$', 'collabnote.register.views.register'),
    (r'^register/login/$', 'collabnote.register.views.login_user'),
    (r'^register/logout/$', 'collabnote.register.views.logout_user'),
    (r'^register/check_username/$', 'collabnote.register.views.check_username'),
    (r'^register/check_userexist/$', 'collabnote.register.views.check_userexist'),
    (r'^register/check_password/$', 'collabnote.register.views.check_password'),

    # Uncomment the admin/doc line below and add 'django.contrib.admindocs' 
    # to INSTALLED_APPS to enable admin documentation:
    (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),
    (r'^site_media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
)
