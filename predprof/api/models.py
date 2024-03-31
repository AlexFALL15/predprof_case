from django.db import models


class Date(models.Model):
    date = models.DateField()
    rooms_count = models.IntegerField()
    windows_for_rooms = models.TextField()
    # windows

class Windows(models.Model):
    floor_number = models.TextField()
    data = models.TextField()
    date = models.ForeignKey(
        Date,
        on_delete=models.CASCADE,
        related_name='wins'
    )
    