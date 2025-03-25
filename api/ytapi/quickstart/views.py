from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets

from tutorial.quickstart.serializers import GroupSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
import urllib.parse
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from django.http import JsonResponse, FileResponse
import yt_dlp
import os

MP3_FILE_PATH = './audio/audio.mp3' 

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


@api_view(["GET"])
def hello_world(request):
    return Response({"msg": "Hello world!"})


@api_view(["GET"])
def audio(request):

    url = request.GET.get('url',None)

    decoded = urllib.parse.unquote(url)
    audio_url = request.build_absolute_uri('/api/audio/stream')
    ydl_opts = {
        'format': 'bestaudio/best',  # Get the best audio format
        'extractaudio': True,  # Extract audio only
        'outtmpl': './audio/audio.%(ext)s',  # Output file naming
        'postprocessors': [{  # Post-process to convert to MP3
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',  # Convert to mp3
            'preferredquality': '0',  # '0' means best quality, auto-determined by source
        }],
    }

    # Download video and convert it to MP3
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        # Get the video info and download
        info = ydl.extract_info(decoded, download=True)
        
        # Extract the title from the video info

        title = info.get('title', 'Unknown Title')
        thumbnail = info.get('thumbnail', 'No Thumbnail Available')
        author = info.get('uploader', 'Unknown Author')

        # Print the download status
        print(f"Downloaded and converted '{title}' to MP3.")


    # Create a yt-dlp object
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        # Extract video information
        ydl.download([url])
        info = ydl.extract_info(decoded)

        # Get video title, thumbnail, and author
        title = info.get('title', 'Unknown Title')
        thumbnail = info.get('thumbnail', 'No Thumbnail Available')
        author = info.get('uploader', 'Unknown Author')


    if url:
        return Response({"title": title, "thumbnail": thumbnail, "channel_name": author, "audio_url": audio_url})
    return Response({"error":"URL Bad"})

@api_view(["GET"])
def stream_audio(request):
    # Send the file using Django's FileResponse function (streams the file)
    if os.path.exists(MP3_FILE_PATH):
        return FileResponse(open(MP3_FILE_PATH, 'rb'), content_type='audio/mp3')
    else:
        return JsonResponse({'error': 'File not found'}, status=404)