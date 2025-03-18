from django.urls import path
from .consumers import IoTConsumer
from django.urls import re_path
from .consumers import IoTConsumer as MQTTConsumer


websocket_urlpatterns = [
    path("ws/mqtt/", IoTConsumer.as_asgi()),
    # re_path(r'ws/mqtt/$', MQTTConsumer.as_asgi()),
]




