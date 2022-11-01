from django.contrib import admin

from .models import *

# Register your models here.
admin.site.register(commentModel)
admin.site.register(productsModel)
admin.site.register(categoryModel)
admin.site.register(Account)
admin.site.register(Cart)