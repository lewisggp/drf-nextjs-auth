from django.urls import path
from .views import (
    GoogleLogin,
    FacebookLogin,
    TwitterV1Login,
    TwitterLogin,
    GitHubLogin
)

urlpatterns = [
    path('google/', GoogleLogin.as_view(), name='google_login'),
    path('facebook/', FacebookLogin.as_view(), name='facebook_login'),
    path('twitter/v1/', TwitterV1Login.as_view(), name='twitter_v1_login'),
    path('twitter/', TwitterLogin.as_view(), name='twitter_login'),
    path('github/', GitHubLogin.as_view(), name='github_login'),
]
