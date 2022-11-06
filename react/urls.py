from django.urls import path,re_path
from .views import  index, categoryById, productById
from django.views.generic import TemplateView
urlpatterns = [
   
    path("",index),
   
    path("register/",index),
    path("login/",index),
    path("categories/",index),
    path("category/<str:cat>",categoryById),
     path("contact/",index),
    path("searchproduct/",index),
    path("product/<int:id>",productById),
    path("announcements",index),
    path("cart",index),
    path("paymentform",index),
     re_path('', TemplateView.as_view(template_name='index.html'))

   

     
]
