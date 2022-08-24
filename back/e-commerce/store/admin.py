from django.contrib import admin
from store.models import Category, Order, ProductOrder, Coupon, Product, Address

# Register your models here.
admin.site.register(Category)
admin.site.register(Order)
admin.site.register(ProductOrder)
admin.site.register(Coupon)
admin.site.register(Product)
admin.site.register(Address)
