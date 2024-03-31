from django.shortcuts import render
from rest_framework.decorators import api_view
from requests import get
from django.conf import settings
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .models import Date, Windows
from datetime import date as dt
from .serialisers import DateSerialiser
from json import loads
from django.http import JsonResponse

URL = settings.API_URL
HEADERS = settings.HEADERS


def save_to_db(data):
    dates = Date.objects.all()
    for date in data:
        date = date['message']
        time = dt.fromtimestamp(date['date']['data'])
        flats_count = date['flats_count']['data']
        windows = date['windows']['data']
        windows_for_flat = date['windows_for_flat']['data']
        try:
            dates.get(date=time)
        except Exception:
            d = Date(date=time, rooms_count=flats_count, windows_for_rooms=windows_for_flat)
            d.save()
            for k in windows.keys():
                Windows(date=d, floor_number=k, data=str(windows[k])).save()
    return Date.objects.all()

def get_list(string: str):
    return list(map(lambda x: True if x == 'True' else False, string.rstrip(']').lstrip('[').split(', ')))
    


def serialise_data(queryset):
    d = {}
    for date in queryset:
        windows = list(map(get_list, map(lambda x: x.data, date.wins.all())))
        ser = DateSerialiser(data={
            'rooms_count': date.rooms_count,
            'windows_for_room': loads(date.windows_for_rooms),
            'windows':windows
        })
        ser.is_valid()
        d[str(date.date)] = ser.data
    return d
        
    
@api_view()
def get_data(request):
    dates = get(URL + '/date', headers=HEADERS).json()
    dates = [list(map(int, _.split('-'))) for _ in dates['message']]
    raw_data_for_dates = [
        get(URL, params={
            'day': _[0],
            'month': _[1],
            'year': _[2]
        },
            headers=HEADERS).json() for _ in dates
    ]
    dates = save_to_db(raw_data_for_dates)
    res = serialise_data(dates)
    return JsonResponse(res)
    # return Response(JSONRenderer().render(res))