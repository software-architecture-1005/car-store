from django.shortcuts import render
from rest_framework import viewsets
# Esto de abajo es para importar los datos serializados y mostrarlos en la vista
from .serializer import (
    MakeSerializer, CategorySerializer, VehicleSerializer, 
    UserSerializer, RoleSerializer, BuyerSerializer, 
    ExpertSerializer, ReviewSerializer
)
from .models import Make, Category, Vehicle, User, Role, Buyer, Expert, Review

# Create your views here.
#class CarView(viewsets.ModelViewSet):
#    serializer_class = CarSerializer
#    queryset = Car.objects.all()
