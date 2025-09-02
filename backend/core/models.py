from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Make(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

class Vehicle(models.Model):
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    color = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    make = models.ForeignKey(Make, on_delete=models.PROTECT, related_name='vehicles')
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='vehicles')

    def __str__(self):
        return f"{self.make} {self.model} ({self.year})"

    class Meta:
        # Opcional: define un orden por defecto para los vehículos
        ordering = ['-year', 'make']


class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class User(AbstractUser):
    # Ya no usamos un CharField. Ahora un usuario puede tener MUCHOS roles.
    roles = models.ManyToManyField(Role, related_name="users")
    date_of_birth = models.DateField(null=True, blank=True)

class Buyer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    usageProfile = models.CharField(max_length=255)
    preferences = models.JSONField(default=list)

    def __str__(self):
        return self.user.username

class Expert(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    specialty = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username
    
class Review(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='reviews')
    
    # La clave está aquí: ForeignKey a Expert, no a User.
    author = models.ForeignKey(Expert, on_delete=models.CASCADE, related_name='reviews')
    
    title = models.CharField(max_length=200)
    content = models.TextField()
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Review for {self.vehicle} by {self.author}'