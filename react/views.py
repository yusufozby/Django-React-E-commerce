from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.


def index(request):
    return render(request,"index.html")
def categoryById(request,cat):
    return render(request,"index.html",{"cat":cat})
def productById(request,id):
    return render(request,"index.html",{"id":id})        
    