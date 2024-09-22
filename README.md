# Django-React-Gallery
A project that implements a full-stack Django-react application. The application aims to generate and manage images. Images are generated using 3rd party GenAI service.


# Configuration
## BE setup
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
