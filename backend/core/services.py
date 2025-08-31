from django.db.models import Q
from .models import Vehicle

class VehicleSearch:
    def __init__(self, filters=None):
        # El constructor recibe un diccionario de filtros, como request.GET
        self.filters = filters if filters is not None else {}
        self.queryset = Vehicle.objects.select_related('category') # Base de la consulta

    def execute(self):
        self._filter_by_text()
        self._filter_by_category()
        self._filter_by_year()
        self._filter_by_price()
        
        return self.queryset

    def _filter_by_text(self):
        text = self.filters.get('text')
        if text:
            self.queryset = self.queryset.filter(
                Q(make__icontains=text) | Q(model__icontains=text)
            )

    def _filter_by_category(self):
        category_name = self.filters.get('category')
        if category_name:
            # __iexact para coincidencia exacta sin importar mayúsculas/minúsculas
            self.queryset = self.queryset.filter(category__name__iexact=category_name)

    def _filter_by_year(self):
        year_min = self.filters.get('year_min')
        year_max = self.filters.get('year_max')
        
        # __gte = greater than or equal to (mayor o igual que)
        if year_min:
            self.queryset = self.queryset.filter(year__gte=year_min)
        
        # __lte = less than or equal to (menor o igual que)
        if year_max:
            self.queryset = self.queryset.filter(year__lte=year_max)

    def _filter_by_price(self):
        price_min = self.filters.get('price_min')
        price_max = self.filters.get('price_max')
        
        if price_min:
            self.queryset = self.queryset.filter(price__gte=price_min)
            
        if price_max:
            self.queryset = self.queryset.filter(price__lte=price_max)