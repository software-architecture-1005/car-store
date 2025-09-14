from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from .services import VehicleSearch
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
# Esto de abajo es para importar los datos serializados y mostrarlos en la vista
from .serializer import (
    MakeSerializer, CategorySerializer, VehicleSerializer, 
    UserSerializer, RoleSerializer, BuyerSerializer, 
    ExpertSerializer, ReviewSerializer, CartSerializer, CartItemSerializer
)
from .models import Make, Category, Vehicle, User, Role, Buyer, Expert, Review, Cart, CartItem

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

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    
    # Acción básica: filtrar por marca (sin servicio)
    @action(detail=False, methods=['get'])
    def by_make(self, request):
        make_id = request.query_params.get('make_id')
        if make_id:
            vehicles = Vehicle.objects.filter(make_id=make_id)
            serializer = self.get_serializer(vehicles, many=True)
            return Response(serializer.data)
        return Response([])
    
    # Acción básica: filtrar por categoría (sin servicio)
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        category_id = request.query_params.get('category_id')
        if category_id:
            vehicles = Vehicle.objects.filter(category_id=category_id)
            serializer = self.get_serializer(vehicles, many=True)
            return Response(serializer.data)
        return Response([])
    
    # Acción avanzada: búsqueda compleja (USANDO TU SERVICIO)
    @action(detail=False, methods=['get'])
    def search(self, request):
        # Aquí es donde usamos tu VehicleSearch service
        search_service = VehicleSearch(request.GET)
        vehicles = search_service.execute()
        
        serializer = self.get_serializer(vehicles, many=True)
        return Response(serializer.data)
    
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    
    # Acción básica: reseñas por vehículo
    @action(detail=False, methods=['get'])
    def by_vehicle(self, request):
        vehicle_id = request.query_params.get('vehicle_id')
        if vehicle_id:
            reviews = Review.objects.filter(vehicle_id=vehicle_id)
            serializer = self.get_serializer(reviews, many=True)
            return Response(serializer.data)
        return Response([])
    
    # Acción básica: reseñas por experto
    @action(detail=False, methods=['get'])
    def by_expert(self, request):
        expert_id = request.query_params.get('expert_id')
        if expert_id:
            reviews = Review.objects.filter(author_id=expert_id)
            serializer = self.get_serializer(reviews, many=True)
            return Response(serializer.data)
        return Response([])

    
class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Cada usuario solo puede ver su propio carrito
        user = self.request.user
        # Buscamos el perfil de comprador asociado a este usuario
        buyer = Buyer.objects.get(user=user)
        return Cart.objects.filter(buyer=buyer)

    @action(detail=True, methods=['post'])
    def add_item(self, request, pk=None):
        cart = self.get_object() # Obtiene el carrito del usuario
        vehicle_id = request.data.get('vehicle_id')

        if not vehicle_id:
            return Response({'error': 'Vehicle ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            vehicle = Vehicle.objects.get(id=vehicle_id)
        except Vehicle.DoesNotExist:
            return Response({'error': 'Vehicle not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Crea o encuentra el item. 'defaults' solo se usa si se crea uno nuevo.
        # Gracias a unique_together, esto no creará duplicados.
        cart_item, created = CartItem.objects.get_or_create(cart=cart, vehicle=vehicle)
        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def remove_item(self, request, pk=None):
        cart = self.get_object()
        item_id = request.data.get('item_id')

        if not item_id:
            return Response({'error': 'CartItem ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            item = CartItem.objects.get(id=item_id, cart=cart)
            item.delete()
        except CartItem.DoesNotExist:
            return Response({'error': 'Item not found in your cart.'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(status=status.HTTP_204_NO_CONTENT)