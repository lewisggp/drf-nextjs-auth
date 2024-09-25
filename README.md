# Authentication Project with Next.js and Django Rest Framework

This repository contains a complete OAuth authentication integration using Google, Facebook, Twitter and GitHub. The frontend is developed in **Next.js** and the backend in **Django Rest Framework**.

## Table of Contents

1. [Description](#description)
2. [Technologies](#technologies)
3. [Requirements](#requirements)
4. [Installation](#installation)
5. [Hosts File Configuration](#hosts-file-configuration)
6. [Running the Project](#running-the-project)
7. [Main Commands](#main-commands)
8. [Contribution](#contribution)
9. [License](#license)

## Description

This project aims to enable authentication to a system using multiple social networks using OAuth. Google, Facebook, Twitter (OAuth 1.0a and 2.0) and GitHub have been implemented.

The authentication system is based on NextAuth, which manages the connection to providers using Client IDs and Client Secrets. When a user attempts to log in, Next.js takes care of redirecting the authentication data to the backend, where Django handles creating the user and the necessary models in the database.

-   **Next.js**: Uses NextAuth providers to handle authentication. Upon receiving the `access_token` and user information from the provider, Next.js makes a call to the Django API to register and finish the user authentication. This is done through callbacks that allow refreshing access tokens.
-   **Django Rest Framework**: Handles social authentication requests and creates users in the database as needed. It uses specific adapters for each authentication provider, which simplifies integration. Once finished, it returns `access_token` and `refresh_token` from `djangorestframework-simplejwt`.

## Technologies

-   **Frontend**: Next.js
-   **Backend**: Django Rest Framework
-   **Authentication**: OAuth (Google, Facebook, Twitter, GitHub)
-   **JWT**: Token to handle authentication on the backend

## Requirements

1. **Node.js**: >= 22.2
    - react: ^18
    - react-dom: ^18
    - next: 14.2.13
    - next-auth: ^4.24.8
    - axios: ^1.7.7
    - jsonwebtoken: ^9.0.2
2. **Python**: >= 3.10
    - Django
    - django-environ
    - django-cors-headers
    - djangorestframework
    - dj-rest-auth
    - django-allauth
    - djangorestframework-simplejwt

## Installation

### Clone the repository

```bash
git clone https://github.com/lewisggp/drf-nextjs-auth.git
cd drf-nextjs-auth
```

### Backend (Django)

1. Go to the server folder:
    ```bash
    cd server
    ```
2. Create a virtual environment:
    ```bash
    python -m venv env
    source env/bin/activate # On Windows use: env\Scripts\activate
    ```
3. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4. Set the environment variables in `.env` inside the `server` folder. You can use the `.env.dist` file as a reference, since it contains all the necessary variables.
5. Perform migrations:
    ```bash
    python manage.py migrate
    ```
6. Start the development server:
    ```bash
    python manage.py runserver
    ```

### Frontend (Next.js)

1. Go to the client folder:
    ```bash
    cd ../client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set the environment variables in `.env.local` inside the `client` folder. You can use the `.env.dist`` file as a reference, as it contains all the necessary variables.

## Hosts file settings

Some social networks do not allow the use of domains like `localhost` or `127.0.0.1` during development. To fix this, you must modify the `hosts` file of your operating system.

On **Windows**, follow these steps:

1. Open the file at this location: `C:\Windows\System32\drivers\etc\hosts`.
2. Add the following line to the end of the file:
    ```bash
    127.0.0.1 example.com
    ```
3. Save the file.

This will redirect all requests to `example.com` to your local environment at `127.0.0.1`, allowing social networks to accept the domain for OAuth redirects.

## Running the project

### Backend

Run the Django server:

```bash
cd server
python manage.py runserver
```

### Frontend

To run Next.js with HTTPS support (required for certain social networks):

```bash
cd client
npx next dev --experimental-https
```

This is necessary because some OAuth authentication platforms require requests to be made from a domain with SSL.

## Main commands

### Backend (Django)

-   `python manage.py runserver`: Starts the development server.
-   `python manage.py migrate`: Applies migrations to the database.
-   `python manage.py createsuperuser`: Creates an administrator user.

### Frontend (Next.js)

-   `npm run dev`: Runs the development environment.
-   `npx next dev --experimental-https`: Runs the development environment with HTTPS support.
-   `npm run build`: Builds the application for production.
-   `npm start`: Starts the application in production mode.

## Contribution

If you wish to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Commit your changes.
4. Make a commit (`git commit -am 'add new feature'`).
5. Push to the branch (`git push origin feature/new-feature`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
