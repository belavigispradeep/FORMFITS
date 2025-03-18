from . import views
from django.urls import path
from django.contrib import admin
from django.conf import settings


urlpatterns = [

    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path("login/", views.user_login, name="login"),
    path("logout/", views.user_logout, name="logout"),
    path('image/', views.image, name='image'),
   
] 



