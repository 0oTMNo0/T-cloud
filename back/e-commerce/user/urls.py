from django.urls import path, re_path
# from .views import UserAPI

# from django.contrib.auth import views as auth_views
from user.views import UserAPI

urlpatterns = [
    path('register/', UserAPI.as_view({"post": "register"})),
    path('login/', UserAPI.as_view({"post": "login"}), name='login'),
    path('change_password/', UserAPI.as_view({"put": "change_password"}), name='change_password'),

]
