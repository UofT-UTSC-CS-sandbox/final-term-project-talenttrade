# Generated by Django 5.0.6 on 2024-06-06 20:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('authour_id', models.IntegerField(default=0)),
                ('authour_name', models.CharField(default='DEFAULT NAME', max_length=30)),
                ('need', models.CharField(max_length=30)),
                ('offer', models.CharField(max_length=30)),
                ('description', models.TextField()),
                ('location', models.CharField(max_length=30)),
                ('published', models.DateTimeField(auto_now_add=True)),
                ('applicants', models.PositiveIntegerField()),
                ('active', models.BooleanField(default=True)),
            ],
        ),
    ]
