# pull official base image
FROM python:3.12-slim-bullseye

# set work directory
WORKDIR /usr/src/backend

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y \
  gcc \
  netcat \
  libpq-dev \
  postgresql-client \
  && apt-get clean

# copy project
COPY . .

# install dependencies
RUN pip install --upgrade pip

RUN pip install -r requirements.txt
