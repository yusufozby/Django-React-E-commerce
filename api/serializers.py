
from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class commentSerilizer(serializers.ModelSerializer):
    class Meta:
        
         model = commentModel
         fields=['id','comment','sender','senderMail','date']
         depth=1
        
class productsSerializer(serializers.ModelSerializer):
    class Meta:
        model = productsModel
        fields = ['id','product','price','discount','latest','description','category','img']
        depth = 1 

class AccountSerializer(serializers.ModelSerializer):
    
    class Meta:
      
        model = Account
        fields = ['id', 'user','Address']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
        depth=1
        
class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
      
        model = User
        fields = ['id', 'username', 'password','email']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
        depth=1
    
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Incorrect Credentials")

class cartSerializer(serializers.ModelSerializer):
     class Meta:
         model = Cart
         fields = ['id','product','price','qty','account','img','discount','productId']
         depth=2
                      