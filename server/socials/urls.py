from django.urls import path
from .views import (
    GoogleOAuth2LoginView,
    FacebookOAuth2LoginView,
    TwitterOAuth1LoginView,
    TwitterOAuth2LoginView,
    GitHubOAuth2LoginView
)

urlpatterns = [
    path('socials/oauth/v2/google/', GoogleOAuth2LoginView.as_view(), name='google_v2_login'),
    path('socials/oauth/v2/facebook/', FacebookOAuth2LoginView.as_view(), name='facebook_v2_login'),
    path('socials/oauth/v1/twitter/', TwitterOAuth1LoginView.as_view(), name='twitter_v1_login'),
    path('socials/oauth/v2/twitter/', TwitterOAuth2LoginView.as_view(), name='twitter_v2_login'),
    path('socials/oauth/v2/github/', GitHubOAuth2LoginView.as_view(), name='github_v2_login'),
]
