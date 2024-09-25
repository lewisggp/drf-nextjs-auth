from django.conf import settings
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.twitter_oauth2.views import TwitterOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

class GoogleLoginView(SocialLoginView):
    authentication_classes = []  # disable authentication, make sure to override `allowed origins` in settings.py in production!
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.GOOGLE_CALLBACK_URL  # frontend application url
    client_class = OAuth2Client
    
class FacebookLoginView(SocialLoginView):
    authentication_classes = []  # disable authentication, make sure to override `allowed origins` in settings.py in production!
    adapter_class = FacebookOAuth2Adapter
    callback_url = settings.FACEBOOK_CALLBACK_URL  # frontend application url

class TwitterLoginView(SocialLoginView):
    authentication_classes = []  # disable authentication, make sure to override `allowed origins` in settings.py in production!
    adapter_class = TwitterOAuth2Adapter
    callback_url = settings.TWITTER_CALLBACK_URL  # frontend application url

class GitHubLoginView(SocialLoginView):
    authentication_classes = []  # disable authentication, make sure to override `allowed origins` in settings.py in production!
    adapter_class = GitHubOAuth2Adapter
    callback_url = settings.GITHUB_CALLBACK_URL  # frontend application url
