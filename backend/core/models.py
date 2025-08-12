from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

class Vehicle(models.Model):
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    color = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='vehicles')
    
    def __str__(self):
        return f"{self.make} {self.model} ({self.year})"

    class Meta:
        # Opcional: define un orden por defecto para los vehículos
        ordering = ['-year', 'make']