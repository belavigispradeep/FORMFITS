from . import views
from django.urls import path
from django.contrib import admin
from django.conf import settings
from . import views


urlpatterns = [

    path('admin/', admin.site.urls),
    path('dashboard/', views.mqtt_render, name='index'),

] 




