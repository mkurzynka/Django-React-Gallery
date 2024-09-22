# Django-React-Gallery
A project that implements a full-stack Django-react application. The application aims to generate and manage images. Images are generated using 3rd party GenAI service.


# Configuration
## Docker compose
This project uses .env file to keep sensitive data. First, create .env file in the root of the project (Django-React-Gallery). The file should include the following parameters:

```
POSTGRES_USER=hello_django
POSTGRES_PASSWORD=hello_django
POSTGRES_DB=hello_django_dev

DEBUG=0
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
SQL_ENGINE=django.db.backends.postgresql

SECRET=my-secure-key

SQL_HOST=db
SQL_PORT=5432

DJANGO_CORS_WHITELIST=http://localhost:3000 http://localhost:8000
DJANGO_CSRF_WHITELIST=http://localhost:3000 http://localhost:8000

```

Some of these parameters are customizable (DB credentials, secret, etc). You can copy those params and paste them into the created .env file.

Ensure you have docker and docker-compose installed and available in your cmd. And run following command:
```
docker-compose build
```

and then

```
docker-compose up -d
```

The application should be served on localhost:3000.





## Without docker compose 
First, create a venv with Python 3.12 and activate it
```
cd backend
path_to_python -m venv venv
.\venv\Scripts\activate
```

Next, install dependecies and run migrations
```
pip install -r .\requirements.txt
py .\manage.py migrate
```

Now you can run BE server using
```
py .\manage.py runserver
```

### Tests
To run tests additional packages are required. You can install them using pip.
```
pip install pytest pytest-django pytest-mock
```

To run tests run following command
```
pytest
```
