from rest_framework import serializers

class DateSerialiser(serializers.Serializer):
    # date = serializers.DateField()
    rooms_count = serializers.IntegerField()
    windows_for_room = serializers.ListField()
    windows = serializers.ListField()