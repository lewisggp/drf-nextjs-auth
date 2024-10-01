"""
Django settings for api project.

Generated by 'django-admin startproject' using Django 5.1.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
import environ
import os

# Load environment variables
env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=[])


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # third party
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    
    # authentication
    'dj_rest_auth',
    'dj_rest_auth.registration',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.twitter',
    'allauth.socialaccount.providers.twitter_oauth2',
    'allauth.socialaccount.providers.github',

    #local
    'socials',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
]

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

ROOT_URLCONF = 'api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'api.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

# Parse database connection url strings
# like psql://user:pass@127.0.0.1:8458/db
DATABASES = {
    # read os.environ['DATABASE_URL'] and raises
    # ImproperlyConfigured exception if not found
    #
    # The db() method is an alias for db_url().
    'default': env.db(),

    # read os.environ['SQLITE_URL']
    'extra': env.db_url(
        'SQLITE_URL',
        default='sqlite:////tmp/tmp-sqlite.db'
    )
}

# Optional: Include extra SQLite database for development
if DEBUG:
    DATABASES['default'] = DATABASES['extra']


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Only for dev environment
if DEBUG:
    # https://pypi.org/project/django-cors-headers/
    CORS_ORIGIN_ALLOW_ALL = True 


# Set up the authentication classes
# https://www.django-rest-framework.org/api-guide/authentication

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
    ),
}


# Enable the standard registration process
# https://dj-rest-auth.readthedocs.io/en/latest/installation.html#registration-optional

SITE_ID = 1


# Enable JWT Authentication instead of Token/Session based
# https://dj-rest-auth.readthedocs.io/en/latest/configuration.html

REST_AUTH = {
    'SESSION_LOGIN': True,
    'USE_JWT': True,
    'JWT_AUTH_COOKIE': 'lms-auth-access-token',
    'JWT_AUTH_REFRESH_COOKIE': 'lms-auth-refresh-token',
    'JWT_AUTH_REFRESH_COOKIE_PATH': '/',
    'JWT_AUTH_SECURE': False,
    'JWT_AUTH_HTTPONLY': False,
}


# Setting JWT Authentication
# https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True, 
    'UPDATE_LAST_LOGIN': True,
    'SIGNING_KEY': env('JWT_SECRET_KEY')
}


# Provider specific settings
# https://docs.allauth.org/en/latest/socialaccount/provider_configuration.html

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [ 'profile', 'email' ],
        'AUTH_PARAMS': { 'access_type': 'online' },
        'VERIFIED_EMAIL': True,
    },
    'facebook': {
        'METHOD': 'oauth2',
        'SCOPE': [ 'email', 'public_profile' ],
        'AUTH_PARAMS': { 'auth_type': 'reauthenticate' },
        'VERIFIED_EMAIL': True,
    },
    'twitter': {
        'METHOD': 'oauth2',
        'SCOPE': [ 'tweet.read', 'users.read', 'offline.access' ],
        'AUTH_PARAMS': { 'force_login': 'true' },
        'VERIFIED_EMAIL': True,
    },
    'github': {
        'SCOPE': [ 'user', 'read:user', 'user:email' ],
        'AUTH_PARAMS': { 'access_type': 'online' },
        'VERIFIED_EMAIL': True,
    },
}


# Setting Unique Email per user

ACCOUNT_UNIQUE_EMAIL = True


# Email required for registration

ACCOUNT_EMAIL_REQUIRED = True 


# Enable login with username or email

ACCOUNT_AUTHENTICATION_METHOD = 'username_email'


# Request email address from 3rd party account provider

SOCIALACCOUNT_QUERY_EMAIL = True


# Enable automatic addition to the list of social accounts connected to the local account

SOCIALACCOUNT_EMAIL_AUTHENTICATION = True
SOCIALACCOUNT_EMAIL_AUTHENTICATION_AUTO_CONNECT = True


# Turn off email verification

ACCOUNT_EMAIL_VERIFICATION = 'none'
SOCIALACCOUNT_EMAIL_VERIFICATION = 'none'


# OAuth Configuration

GOOGLE_CALLBACK_URL = env('GOOGLE_CALLBACK_URL')
FACEBOOK_CALLBACK_URL = env('FACEBOOK_CALLBACK_URL')
TWITTER_CALLBACK_URL = env('TWITTER_CALLBACK_URL')
GITHUB_CALLBACK_URL = env('GITHUB_CALLBACK_URL')
