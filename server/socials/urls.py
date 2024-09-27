from django.urls import path
from .views import (
    GoogleLogin, GoogleConnect,
    FacebookLogin, FacebookConnect,
    TwitterV1Login, TwitterV1Connect,
    TwitterLogin, TwitterConnect,
    GitHubLogin, GithubConnect,
)

urlpatterns = [
    path('google/', GoogleLogin.as_view(), name='google_login'),
    path('google/connect/', GoogleConnect.as_view(), name='google_connect'),
    path('facebook/', FacebookLogin.as_view(), name='facebook_login'),
    path('facebook/connect/', FacebookConnect.as_view(), name='facebook_connect'),
    path('twitter/v1/', TwitterV1Login.as_view(), name='twitter_v1_login'),
    path('twitter/v1/connect/', TwitterV1Connect.as_view(), name='twitter_v1_connect'),
    path('twitter/', TwitterLogin.as_view(), name='twitter_login'),
    path('twitter/connect/', TwitterConnect.as_view(), name='twitter_connect'),
    path('github/', GitHubLogin.as_view(), name='github_login'),
    path('github/connect/', GithubConnect.as_view(), name='github_connect'),  
]
