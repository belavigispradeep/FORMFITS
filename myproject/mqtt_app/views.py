from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout



def mqtt_render(request):  # Renamed from mqtt_dashboard to index
    return render(request, "mqtt.html")
