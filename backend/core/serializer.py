from rest_framework import serializers
from .models import Make, Category, Vehicle, User, Role, Buyer, Expert, Review
from django.contrib.auth import get_user_model

# Serializamos todos los datos para convertirlos en json para pasarlos por la Api
class MakeSerializer(serializers.ModelSerializer):
        class Meta:
                model = Make
                fields = '__all__'
                
class CategorySerializer(serializers.ModelSerializer):
        class Meta:
                model = Category
                fields = '__all__'
                
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


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'date_of_birth']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data.get('email'),
            date_of_birth=validated_data.get('date_of_birth')
        )
        user.set_password(validated_data['password'])
        user.save()

        # Asignar rol por defecto "Buyer"
        try:
            role = Role.objects.get(name="Buyer")
            user.roles.add(role)
        except Role.DoesNotExist:
            pass  # Si no existe el rol, no asigna nada
        
        return user

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
        class Meta:
                model = Review
                fields = ['id', 'vehicle', 'vehicle_name', 'author', 'author_name', 'author_specialty', 'title', 'content', 'rating', 'created_at']