from django.shortcuts import render
from rest_framework import viewsets
# Esto de abajo es para importar los datos serializados y mostrarlos en la vista
from .serializer import (
    MakeSerializer, CategorySerializer, VehicleSerializer, 
    UserSerializer, RoleSerializer, BuyerSerializer, 
    ExpertSerializer, ReviewSerializer
)
from .models import Make, Category, Vehicle, User, Role, Buyer, Expert, Review

class MakeViewSet(viewsets.ModelViewSet):
    queryset = Make.objects.all()
    serializer_class = MakeSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class BuyerViewSet(viewsets.ModelViewSet):
    queryset = Buyer.objects.all()
    serializer_class = BuyerSerializer

class ExpertViewSet(viewsets.ModelViewSet):
    queryset = Expert.objects.all()
    serializer_class = ExpertSerializer