import paho.mqtt.client as mqtt
import ssl
import json
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

# AWS IoT Core Details
AWS_IOT_ENDPOINT = "asr01zjvy5las-ats.iot.eu-central-1.amazonaws.com"  # Change this
PORT = 8883
TOPIC = "exercise/data"

# Paths to certificates
CERTS_PATH = "mqtt_app/certs/"
CA_CERT = CERTS_PATH + "AmazonRootCA1.pem"
DEVICE_CERT = CERTS_PATH + "certificate.pem.crt"
PRIVATE_KEY = CERTS_PATH + "private.pem.key"

# Django Channels Layer
channel_layer = get_channel_layer()

def on_connect(client, userdata, flags, rc):
    print("Connected to AWS IoT Core with result code:", rc)
    client.subscribe(TOPIC)

def on_message(client, userdata, msg):
    try:
        data = json.loads(msg.payload.decode())
        item_data = {
            "s_no": data.get("s_no"),
            "exercise_name": data.get("exercise_name"),
            "angles_degrees": data.get("angles_degrees"),
            "body_part_tracked": data.get("body_part_tracked"),
            "ideal_right_angle": data.get("ideal_right_angle"),
            "correction_needed": data.get("correction_needed"),
            "reps_count": data.get("reps_count"),
            "posture_picture": data.get("posture_picture")
        }

        print(
            f"Received Data:\n"
            f"S.No: {data['s_no']}\n"
            f"Exercise: {data['exercise_name']}\n"
            f"Angle: {data['angles_degrees']}°\n"
            f"Body Part: {data['body_part_tracked']}\n"
            f"Ideal Right Angle: {data['ideal_right_angle']}°\n"
            f"Correction Needed: {data['correction_needed']}\n"
            f"Reps Count: {data['reps_count']}\n"
            f"Posture Picture: {data['posture_picture']}\n"
        )

        # Send MQTT data to WebSocket
        async_to_sync(channel_layer.group_send)(
            "mqtt_group",
            {
                "type": "send_mqtt_data",
                "data": item_data
            }
        )
    except Exception as e:
        print(f"Error processing message: {e}")

def mqtt_connect():
    client = mqtt.Client()
    client.tls_set(ca_certs=CA_CERT, certfile=DEVICE_CERT, keyfile=PRIVATE_KEY, tls_version=ssl.PROTOCOL_TLS)
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(AWS_IOT_ENDPOINT, PORT, keepalive=60)
    client.loop_start()  # Run in background

    return client

# Start MQTT Client
mqtt_client = mqtt_connect()
