from django.urls import path
from .views import (
    GoogleLogin, GoogleConnect, GoogleSignIn, GoogleSignUp,
    FacebookLogin, FacebookConnect, FacebookSignIn, FacebookSignUp,
    TwitterV1Login, TwitterV1Connect, TwitterV1SignIn, TwitterV1SignUp,
    TwitterLogin, TwitterConnect, TwitterSignIn, TwitterSignUp,
    GitHubLogin, GithubConnect, GitHubSignIn, GitHubSignUp
)

urlpatterns = [
    path('google/', GoogleLogin.as_view(), name='google_login'),
    path('google/connect/', GoogleConnect.as_view(), name='google_connect'),
    path('google/signin/', GoogleSignIn.as_view(), name='google_signin'),
    path('google/signup/', GoogleSignUp.as_view(), name='google_signup'),
    
    path('facebook/', FacebookLogin.as_view(), name='facebook_login'),
    path('facebook/connect/', FacebookConnect.as_view(), name='facebook_connect'),
    path('facebook/signin/', FacebookSignIn.as_view(), name='facebook_signin'),
    path('facebook/signup/', FacebookSignUp.as_view(), name='facebook_signup'),
    
    path('twitter/v1/', TwitterV1Login.as_view(), name='twitter_v1_login'),
    path('twitter/v1/connect/', TwitterV1Connect.as_view(), name='twitter_v1_connect'),
    path('twitter/v1/signin/', TwitterV1SignIn.as_view(), name='twitter_v1_signin'),
    path('twitter/v1/signup/', TwitterV1SignUp.as_view(), name='twitter_v1_signup'),
    
    path('twitter/', TwitterLogin.as_view(), name='twitter_login'),
    path('twitter/connect/', TwitterConnect.as_view(), name='twitter_connect'),
    path('twitter/signin/', TwitterSignIn.as_view(), name='twitter_signin'),
    path('twitter/signup/', TwitterSignUp.as_view(), name='twitter_signup'),
    
    path('github/', GitHubLogin.as_view(), name='github_login'),
    path('github/connect/', GithubConnect.as_view(), name='github_connect'),
    path('github/signin/', GitHubSignIn.as_view(), name='github_signin'),
    path('github/signup/', GitHubSignUp.as_view(), name='github_signup'),
]
