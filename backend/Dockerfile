# Backend: Django + Python
FROM python:3.12-slim

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends     build-essential     curl     && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Python deps first (for better caching)
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# App code
COPY . /app

# Expose for Django runserver / Gunicorn
EXPOSE 8000

# Default command is overridden by docker-compose to run migrations + runserver
