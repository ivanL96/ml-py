from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.urls import reverse
from django.shortcuts import render
from django.utils import timezone
from django.contrib import messages
from django.contrib.auth.models import User
from django.template.loader import get_template
import base64

def main_view(request):
    template = 'base.html'
    if request.method == 'POST':
        canvas = request.POST.get('canvas')
        base64canvas = canvas.encode()
        print(type(base64canvas))
        with open("imageToSave.jpg", "wb") as fh:
            fh.write(base64.decodebytes(base64canvas))

    return render(request, template)
