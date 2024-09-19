# Generated by Django 4.2.15 on 2024-09-17 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookshelf', '0003_media_created_at_media_recommended_by_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='media',
            name='media_type',
            field=models.CharField(choices=[('book', 'Book'), ('show', 'TV Show'), ('film', 'Film'), ('app', 'App'), ('article', 'Article'), ('video', 'Video')], max_length=10),
        ),
    ]
