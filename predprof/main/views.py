from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings

PATH = '/'.join(str(settings.BASE_DIR).split('/')[:-1]) + '/frontend'


def main(request):
    print(PATH)
    return render(request, 'one_day.html', {})