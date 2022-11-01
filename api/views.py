from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import commentSerilizer, productsSerializer,AccountSerializer,cartSerializer
from django.contrib.auth.models import User
from .models import Account, commentModel, productsModel,Cart

# Create your views here.
e=[]

@api_view(['POST'])
def createComment(request):
    data=request.data
    newComment = commentModel.objects.create(
        comment=data["comment"],
        sender=data["sender"],
        senderMail=data["senderMail"],
        date=data["date"]
    )
    serializer = commentSerilizer(newComment)
    return Response(serializer.data)

@api_view(['GET'])
def getComments(request):
    allComments = commentModel.objects.all()
    serializer = commentSerilizer(allComments,many=True)
    return Response(serializer.data)   
@api_view(['GET'])
def getProducts(request):
    allproducts = productsModel.objects.all()
    serializer = productsSerializer(allproducts,many=True)
   
    return Response(serializer.data)  

@api_view(['POST'])
def createUser(request):
    data = request.data
  

    Address = data["Address"]
  
    new_user = User.objects.create_user(username=data["user"]["username"],password=data["user"]["password"],email=data["user"]["email"])
    new_Account =   Account.objects.create(
        user = new_user,
        Address = Address,
    )
    new_user.save()
    serializer = AccountSerializer(new_Account)
    return Response({"user":serializer.data})
@api_view(['GET'])
def getUsers(request):
    allusers = Account.objects.all()
    serializer = AccountSerializer(allusers,many=True)
   
    return Response(serializer.data)
@api_view(['POST'])
def addToCart(request):
    data = request.data
    account = Account.objects.get(id=data["account"]["id"])
    addedProduct = Cart.objects.create(
        product = data["product"],
        price = data["price"],
        qty = data["qty"],
        img = data["img"],
        discount=data["discount"],
        account = account,
        productId = data["id"]
     )   
    serializer = cartSerializer(addedProduct)
    return Response(serializer.data)
@api_view(['GET'])
def getCart(request):
    cart = Cart.objects.all()
    serializer = cartSerializer(cart,many=True)
    return Response(serializer.data)   
@api_view(['PUT'])
def updateCart(request,pk):
    cart_object = Cart.objects.get(id=pk)
    data = request.data
    cart_object.qty = data["qty"]
    cart_object.product=data["product"]
    cart_object.price=data["price"]

    cart_object.discount=data["discount"]
    cart_object.img=data["img"]
    cart_object.productId=data["productId"]
    cart_object.account = Account.objects.get(id=data["account"]["id"])
    cart_object.save()
    serializer = cartSerializer(cart_object)
    return Response(serializer.data)  
@api_view(['DELETE'])
def deleteCart(request,pk):
    deletedCart = Cart.objects.get(id=pk)
    deletedCart.delete()
    return Response({"message":"deleted Successfully !!"})

