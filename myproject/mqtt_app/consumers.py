# import json
# import asyncio
# import paho.mqtt.client as mqtt
# from channels.generic.websocket import AsyncWebsocketConsumer

# AWS_IOT_ENDPOINT = "asr01zjvy5las-ats.iot.eu-central-1.amazonaws.com"
# AWS_IOT_TOPIC = "exercise/data"

# class IoTConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         await self.accept()
#         print("✅ WebSocket Connected")  # Debugging Log

#         self.loop = asyncio.get_running_loop()
#         self.client = mqtt.Client()
#         self.client.on_connect = self.on_connect
#         self.client.on_message = self.on_message

#         self.client.connect(AWS_IOT_ENDPOINT, 8883, 60)
#         self.client.loop_start()

#     def on_connect(self, client, userdata, flags, rc):
#         print("✅ Connected to AWS IoT Core")  # Debugging Log
#         client.subscribe(AWS_IOT_TOPIC)
#         print(f"✅ Subscribed to topic: {AWS_IOT_TOPIC}")

#     def on_message(self, client, userdata, msg):
#         try:
#             print(f"✅ Raw MQTT Message: {msg.payload}")  # Debugging Log
#             data = json.loads(msg.payload.decode())

#             formatted_data = {
#                 "s_no": data.get("s_no", "N/A"),
#                 "exercise_name": data.get("exercise_name", "N/A"),
#                 "angles_degrees": data.get("angles_degrees", "N/A"),
#                 "body_part_tracked": data.get("body_part_tracked", "N/A"),
#                 "ideal_right_angle": data.get("ideal_right_angle", "N/A"),
#                 "correction_needed": data.get("correction_needed", "N/A"),
#                 "reps_count": data.get("reps_count", "N/A"),
#                 "posture_picture": data.get("posture_picture", "N/A"),
#             }

#             print(f"✅ Sending WebSocket Data: {formatted_data}")

#             future = asyncio.run_coroutine_threadsafe(
#                 self.send(json.dumps(formatted_data)), self.loop
#             )
#             future.result()

#         except Exception as e:
#             print(f"❌ Error processing MQTT message: {e}")

#     async def disconnect(self, close_code):
#         print("❌ WebSocket Disconnected")
#         self.client.loop_stop()
#         self.client.disconnect()


import json
from channels.generic.websocket import AsyncWebsocketConsumer

class IoTConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("mqtt_group", self.channel_name)
        print("WebSocket Connected")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("mqtt_group", self.channel_name)
        print("WebSocket Disconnected")

    async def send_mqtt_data(self, event):
        data = event["data"]
        await self.send(text_data=json.dumps({"message": data}))