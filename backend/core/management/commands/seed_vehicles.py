from django.core.management.base import BaseCommand
from django.db import transaction
from faker import Faker
import random

from core.models import Make, Category, Vehicle, User, Buyer


class Command(BaseCommand):
    help = "Seed database with fake vehicles for testing searches"

    def add_arguments(self, parser):
        parser.add_argument('--count', type=int, default=100, help='Number of vehicles to create')

    @transaction.atomic
    def handle(self, *args, **options):
        fake = Faker('es_CO')
        count = options['count']

        # Crear usuario por defecto para testing si no existe
        test_user, created = User.objects.get_or_create(
            username='testuser',
            defaults={
                'email': 'test@example.com',
                'is_active': True
            }
        )
        if created:
            test_user.set_password('testpass123')
            test_user.save()
            self.stdout.write(self.style.SUCCESS('Created test user: testuser/testpass123'))

        # Crear Buyer para el usuario de prueba
        buyer, created = Buyer.objects.get_or_create(
            user=test_user,
            defaults={'usageProfile': 'General', 'preferences': []}
        )
        if created:
            self.stdout.write(self.style.SUCCESS('Created test buyer'))

        makes = list(Make.objects.all())
        categories = list(Category.objects.all())

        if not makes or not categories:
            self.stderr.write(self.style.ERROR('Makes and Categories are required. Load fixtures first.'))
            return

        colors = ['Blanco', 'Negro', 'Gris', 'Rojo', 'Azul', 'Verde', 'Plateado']

        # Modelos específicos por marca para mayor realismo
        models_by_make = {
            'Toyota': ['Corolla', 'Camry', 'Prius', 'RAV4', 'Highlander'],
            'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit'],
            'Nissan': ['Sentra', 'Altima', 'Rogue', 'Pathfinder', 'Versa'],
            'Mazda': ['Mazda3', 'Mazda6', 'CX-5', 'CX-9', 'MX-5'],
            'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Accent'],
            'Kia': ['Forte', 'Optima', 'Sorento', 'Sportage', 'Rio'],
            'Chevrolet': ['Spark', 'Aveo', 'Cruze', 'Malibu', 'Equinox'],
            'Ford': ['Fiesta', 'Focus', 'Fusion', 'Escape', 'Explorer']
        }

        created = 0
        for _ in range(count):
            make = random.choice(makes)
            category = random.choice(categories)
            
            # Usar modelos específicos según la marca
            make_name = make.name
            if make_name in models_by_make:
                model = random.choice(models_by_make[make_name])
            else:
                model = fake.word().capitalize()
                
            year = random.randint(2008, 2025)
            price_usd = random.randint(10000, 70000)

            Vehicle.objects.create(
                model=model,
                year=year,
                color=random.choice(colors),
                price=price_usd,
                make=make,
                category=category,
            )
            created += 1

        self.stdout.write(self.style.SUCCESS(f'Created {created} vehicles'))


