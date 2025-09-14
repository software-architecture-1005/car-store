from rest_framework import serializers
from .models import Make, Category, Vehicle, User, Role, Buyer, Expert, Review, Cart, CartItem

# Serializamos todos los datos para convertirlos en json para pasarlos por la Api
class MakeSerializer(serializers.ModelSerializer):
        class Meta:
                model = Make
                fields = '__all__'
                
class CategorySerializer(serializers.ModelSerializer):
        class Meta:
                model = Category
                fields = '__all__'

class SimpleVehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['id', 'make', 'model', 'price']
                
class VehicleSerializer(serializers.ModelSerializer):
        make_name = serializers.CharField(source='make.name', read_only=True)
        category_name = serializers.CharField(source="category.name", read_only=True)
        class Meta:
                model = Vehicle
                fields = ['id', 'model', 'year', 'color', 'price', 'make', 'make_name', 'category', 'category_name']
                
class RoleSerializer(serializers.ModelSerializer):
        class Meta:
                model = Role
                fields = '__all__'
                
class UserSerializer(serializers.ModelSerializer):
        roles = RoleSerializer(many=True, read_only=True)
        class Meta:
                model = User
                fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_of_birth', 'roles']
                extra_kwargs = {'password': {'write_only': True}}

class BuyerSerializer(serializers.ModelSerializer):
        user = UserSerializer(read_only=True)
        class Meta:
                model = Buyer
                fields = ['user', 'usageProfile', 'preferences']

class ExpertSerializer(serializers.ModelSerializer):
        user = UserSerializer(read_only=True)
        class Meta:
                model = Expert
                fields = ['user', 'specialty']

class ReviewSerializer(serializers.ModelSerializer):
        vehicle_name = serializers.CharField(source='vehicle.__str__', read_only=True)
        author_name = serializers.CharField(source='author.user.username', read_only=True)
        author_specialty = serializers.CharField(source='author.specialty', read_only=True)
        def validate_rating(self, value):
            if value < 1 or value > 5:
                raise serializers.ValidationError("La calificación debe estar entre 1 y 5.")
            return value

        class Meta:
            model = Review
            fields = ['id', 'vehicle', 'vehicle_name', 'author', 'author_name', 'author_specialty', 'title', 'content', 'rating', 'created_at']

class CartItemSerializer(serializers.ModelSerializer):
    vehicle = SimpleVehicleSerializer(read_only=True)
    class Meta:
        model = CartItem
        fields = ['id', 'vehicle', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'buyer', 'created_at', 'items', 'total_price']

    def get_total_price(self, cart_obj):
        items_with_vehicles = cart_obj.items.select_related('vehicle')
        total = sum(item.vehicle.price * item.quantity for item in items_with_vehicles)
        return total