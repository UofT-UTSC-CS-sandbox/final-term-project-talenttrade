import csv
from django.core.management.base import BaseCommand
from worldcities.models import WorldCity

class Command(BaseCommand):
    help = 'Populate the world cities table from a CSV file'

    def handle(self, *args, **kwargs):
        if WorldCity.objects.exists():
            self.stdout.write(self.style.WARNING('The world cities table is already populated.'))
            return
        
        input_file = 'worldcities/worldcities_data.csv'  # Replace with your input CSV file name

        with open(input_file, mode='r', newline='', encoding='utf-8') as infile:
            reader = csv.DictReader(infile)
            
            cities = []
            for row in reader:
                name = row['name']
                lat = row['lat']
                lng = row['lng']
                cities.append(WorldCity(name=name, lat=lat, lng=lng))
            
            WorldCity.objects.bulk_create(cities)
            self.stdout.write(self.style.SUCCESS(f'Successfully populated the world cities table with {len(cities)} entries.'))
