from django.conf import settings
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from allauth.socialaccount.providers.twitter_oauth2.views import TwitterOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from dj_rest_auth.social_serializers import TwitterLoginSerializer

class GoogleLogin(SocialLoginView):
    authentication_classes = []
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.GOOGLE_CALLBACK_URL
    client_class = OAuth2Client

class FacebookLogin(SocialLoginView):
    authentication_classes = []
    adapter_class = FacebookOAuth2Adapter
    callback_url = settings.FACEBOOK_CALLBACK_URL

class TwitterV1Login(SocialLoginView):
    authentication_classes = []  # Disable authentication
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter
    callback_url = settings.TWITTER_CALLBACK_URL  # Add this in your settings

class TwitterLogin(SocialLoginView):
    authentication_classes = []
    adapter_class = TwitterOAuth2Adapter
    callback_url = settings.TWITTER_CALLBACK_URL

class GitHubLogin(SocialLoginView):
    authentication_classes = []
    adapter_class = GitHubOAuth2Adapter
    callback_url = settings.GITHUB_CALLBACK_URL
