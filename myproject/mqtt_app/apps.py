from django.apps import AppConfig


class MqttAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'mqtt_app'

    def ready(self):
        from mqtt_app.mqtt_client import mqtt_client  # Ensure MQTT client starts on Django startup
