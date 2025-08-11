# Recuerda reemplazar los campos cuando Caliche termine los modelos
from rest_framework import serializers
# from .models import (Cars Y Otras cositas)

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        # model = Car
        # fields = (Ejmplo: 'id', 'title', 'description', 'done')
        fields = '__all__'

