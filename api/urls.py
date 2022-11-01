from django.urls import path

from api.views import addToCart, createUser, deleteCart, getCart, getComments, getProducts,createComment, getUsers, updateCart
from .api import LoginAPI
urlpatterns = [
    path("addcomment/",createComment,name="create-comment"),
    path('getcomments/',getComments,name="get-comments"),
    path('getproducts/',getProducts,name="get-products"),
    path("register/",createUser,name="create-user"),
    path("allusers/",getUsers,name="get-users"),
    path("login/",LoginAPI.as_view()),
    path("addcart/",addToCart,name="add-to-cart"),
    path("getcart/",getCart,name="get-cart"),
    path("updatecart/<str:pk>",updateCart,name="update-cart"),
    path("deletecart/<str:pk>",deleteCart,name="delete-cart")
]
