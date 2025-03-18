from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.contrib import messages
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse


# Create your views here.
# Login view
def user_login(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        
        if user:
            login(request, user)
            return redirect("index")  # Redirect to inventory page
        else:
            messages.error(request, "Invalid username or password")
    
    return render(request, "login.html")

# Logout view
def user_logout(request):
    logout(request)
    return redirect("login")  

@login_required(login_url="login")
def index(request):
    return render(request,'index.html')

def image(request):
    return render(request,'image.html')
