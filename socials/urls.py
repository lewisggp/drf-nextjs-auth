from django.urls import path
from .views import GoogleLoginView, FacebookLoginView, TwitterLoginView, GitHubLoginView

urlpatterns = [
    path('socials/auth/google/', GoogleLoginView.as_view(), name='google_login'),
    path('socials/auth/facebook/', FacebookLoginView.as_view(), name='facebook_login'),
    path('socials/auth/twitter/', TwitterLoginView.as_view(), name='twitter_login'),
    path('socials/auth/github/', GitHubLoginView.as_view(), name='github_login'),
]
