from rest_framework import serializers
from .models import Make, Category, Vehicle, User, Role, Buyer, Expert, Review


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
        class Meta:
                model = Review
                fields = ['id', 'vehicle', 'vehicle_name', 'author', 'author_name', 'author_specialty', 'title', 'content', 'rating', 'created_at']