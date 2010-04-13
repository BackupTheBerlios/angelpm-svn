from django.conf.urls.defaults import *
from django.conf import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    (r'^notebook/$', 'collabnote.notebook.views.index'),
    (r'^notebook/edit/$', 'collabnote.notebook.views.edit'),
    (r'^init_collab_window/$', 'collabnote.notebook.views.init_collab_window'),
    (r'^init_notebook_window/$', 'collabnote.notebook.views.init_notebook_window'),
    (r'^init_im_window/$', 'collabnote.notebook.views.init_im_window'),

    ('^shout/shout/$', 'collabnote.shout.views.shout'),

    (r'^register/$', 'collabnote.register.views.index'),

    # Uncomment the admin/doc line below and add 'django.contrib.admindocs' 
    # to INSTALLED_APPS to enable admin documentation:
    (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),
    (r'^site_media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
)
