from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from allauth.socialaccount.providers.twitter_oauth2.views import TwitterOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialConnectView, SocialLoginView
from dj_rest_auth.social_serializers import TwitterConnectSerializer, TwitterLoginSerializer

class BaseSocial:
    def email_exists(self, email):
        return get_user_model().objects.filter(email=email).exists()
    
    def social_account_exists(self, uid, provider):
        return SocialAccount.objects.filter(uid=uid, provider__icontains=provider).exists()

class SocialSignIn(BaseSocial):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        uid = request.data.get('uid')
        provider = request.data.get('provider')
        
        # Adjust to your needs depending on whether you have the 
        # SOCIALACCOUNT_EMAIL_AUTHENTICATION and SOCIALACCOUNT_EMAIL_AUTHENTICATION_AUTO_CONNECT 
        # settings active or not.
        
        # Sign in directly if uid-provider already exists (case: email null, example: twitter_oauth2)
        if self.social_account_exists(uid, provider):
            return super().post(request, *args, **kwargs)
        
        # Reject sign-in if is new account
        if email and not self.email_exists(email):
            return Response({"detail": "No user with this email exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Email belongs to another local account (here SOCIALACCOUNT_EMAIL_AUTHENTICATION_AUTO_CONNECT must be false)
        if email and self.email_exists(email) and settings.SOCIALACCOUNT_EMAIL_AUTHENTICATION_AUTO_CONNECT == False:
            return Response({"detail": "User email already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        return super().post(request, *args, **kwargs)

class SocialSignUp(BaseSocial):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        uid = request.data.get('uid')
        provider = request.data.get('provider')
        
        # Sign-in directly if user already sign-up with provider
        if self.social_account_exists(uid, provider):
            return super().post(request, *args, **kwargs)
        
        # Reject sign-up if email already exists in some account
        if self.email_exists(email):
            return Response({"detail": "A user with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        return super().post(request, *args, **kwargs)

# Google V1 Views

class Google:
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.GOOGLE_CALLBACK_URL
    client_class = OAuth2Client

class GoogleLogin(Google, SocialLoginView):
    pass

class GoogleConnect(Google, SocialConnectView):
    pass

class GoogleSignUp(SocialSignUp, GoogleLogin):
    pass

class GoogleSignIn(SocialSignIn, GoogleLogin):
    pass

# Facebook V1 Views

class Facebook:
    adapter_class = FacebookOAuth2Adapter
    callback_url = settings.FACEBOOK_CALLBACK_URL

class FacebookLogin(Facebook, SocialLoginView):
    pass

class FacebookConnect(Facebook, SocialConnectView):
    pass

class FacebookSignUp(SocialSignUp, FacebookLogin):
    pass

class FacebookSignIn(SocialSignIn, FacebookLogin):
    pass

# Twitter V1 Views

class TwitterV1:
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter
    callback_url = settings.TWITTER_CALLBACK_URL

class TwitterV1Login(TwitterV1, SocialLoginView):
    pass

class TwitterV1Connect(TwitterV1, SocialConnectView):
    serializer_class = TwitterConnectSerializer

class TwitterV1SignUp(SocialSignUp, TwitterV1Login):
    pass

class TwitterV1SignIn(SocialSignIn, TwitterV1Login):
    pass

# Twitter Views

class Twitter:
    adapter_class = TwitterOAuth2Adapter
    callback_url = settings.TWITTER_CALLBACK_URL

class TwitterLogin(Twitter, SocialLoginView):
    pass

class TwitterConnect(Twitter, SocialConnectView):
    pass

class TwitterSignUp(SocialSignUp, TwitterLogin):
    pass

class TwitterSignIn(SocialSignIn, TwitterLogin):
    pass
    
# GitHub Views

class GitHub:
    adapter_class = GitHubOAuth2Adapter
    callback_url = settings.GITHUB_CALLBACK_URL
    client_class = OAuth2Client

class GitHubLogin(GitHub, SocialLoginView):
    pass

class GithubConnect(GitHub, SocialConnectView):
    pass

class GitHubSignUp(SocialSignUp, GitHubLogin):
    pass

class GitHubSignIn(SocialSignIn, GitHubLogin):
    pass
