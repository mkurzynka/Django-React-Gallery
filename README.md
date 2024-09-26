# Django-React-Gallery

A full-stack Django-React application for generating and managing images using a 3rd party GenAI service.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Documentation](#api-documentation)



## Features
- Image generation using https://thispersondoesnotexist.com/
- The application displays images in the form of a gallery
- Gallery comes with infinite pagination
- Whenever the backend is asked for a picture with an index that does not exist yet it downloads a new image from the  https://thispersondoesnotexist.com/
- Existing images can be switched, to do that user has to click on the image or drag and drop the image in the JPG file format.
- Frontend comes with 'Tour' (Begin tour button) that explains UI and its features

## Prerequisites
- Docker and Docker Compose
- Node.js and npm (for local frontend development)
- Python 3.12 (for local backend development)

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/Django-React-Gallery.git
   cd Django-React-Gallery
   ```

2. Create a `.env` file in the root directory with the following content:
   ```
   DEBUG=0
   POSTGRES_USER=hello_django
   POSTGRES_PASSWORD=hello_django
   POSTGRES_DB=hello_django_dev
   SQL_PORT=5432
   SQL_HOST=db
   SQL_ENGINE=django.db.backends.postgresql
   SECRET_KEY=my-secure-key
   ```
   Note: Customize these values as needed, especially the `SECRET_KEY`.

## Configuration
The project uses Docker Compose for easy setup and deployment. Make sure you have Docker and Docker Compose installed on your system.

## Running the Application
1. Build the Docker images:
   ```
   docker-compose build
   ```

2. Start the containers:
   ```
   docker-compose up -d
   ```

3. Access the application at `http://localhost:3000`

## Testing

### Backend Tests
1. Install the required packages:
   ```
   pip install pytest pytest-django pytest-mock
   ```

2. Run the tests:
   ```
   pytest
   ```

### Frontend Tests
The frontend uses Vitest for testing.

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the tests:
   ```
   npm run test
   ```

## API Documentation
- /gallery/preview/{index} - Returns a preview (200x200) image for a given index.

- /gallery/{index} - Allows the user to set the image displayed at a given index in the gallery using PUT method.

