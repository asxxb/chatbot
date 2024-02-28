from django.urls import path
from .views import index, get_chat_messages

urlpatterns = [
    path('', index, name='index'),
    path('get_chat_messages/', get_chat_messages, name='get_chat_messages'),
]
