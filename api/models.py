
from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class commentModel(models.Model):
    comment = models.TextField(max_length=250,null=True)
    sender = models.CharField(max_length=100,null=True)
    senderMail = models.CharField(max_length=100,null=True)
    date = models.CharField(max_length=50,null=True)
    def __str__(self):
        return self.comment


class categoryModel(models.Model):
    name=models.CharField(max_length=100)
    def __str__(self):
        return self.name


class productsModel(models.Model):
    product = models.CharField(max_length=100)
    price = models.FloatField()
    category = models.ForeignKey(categoryModel,on_delete=models.CASCADE,null=True)
    discount = models.BooleanField()
    latest = models.BooleanField()
    description = models.TextField()
    img = models.FileField(upload_to="images/",null=True) 
    def __str__(self):
        return self.product
class Account(models.Model):
    Address = models.CharField(max_length=100)
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    def __str__(self):
        return self.Address
class Cart(models.Model):
    product = models.CharField(max_length=100)
    price = models.FloatField()
    qty=models.IntegerField()
    discount=models.BooleanField(null=True)
    account = models.ForeignKey(Account,on_delete=models.CASCADE,null=True)
    img = models.CharField(max_length=450,null=True)
    productId = models.IntegerField(null=True)
    def __str__(self) -> str:
        return self.product