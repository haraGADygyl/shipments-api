# Shipments Rest API

## Requirements

- #### Server: Python 3.10, Django 4.x, PostgreSQL 14.x
- #### Client: Node.js 18.x, React 18.x

## Run Locally

Clone the project

```bash
  git clone https://github.com/haraGADygyl/python-django-rest-shipments.git
```

Create and activate a new virtual environment

```bash
  cd python-django-rest-shipments
  python -m venv venv
  venv\Scripts\activate
```

Install all dependencies

```bash
  cd shipments_rest_api
  pip install -r requirements.txt
```

Go to shipments_rest_api/shipments/settings.py and change the PostgreSQL settings

```
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.postgresql',
          'NAME': 'shipments',
          'USER': 'postgres',
          'PASSWORD': 'ENTER_YOUR_POSTGRESQL_PASSWORD_HERE',
          'HOST': '127.0.0.1',
          'PORT': '5432',
      }
  }
```

Make and run all migrations

```bash
  python manage.py makemigrations
  python manage.py migrate
```

Start the backend server

```bash
  python manage.py runserver
```

Go to the frontend directory and start the frontend server

```bash
  cd..
  cd shipments_FE
```

```bash
  npm install
  npm start
```

# API Reference

### GET all shipments

```
  GET /api/shipments/
```

### GET a shipment by ID

```
  GET /api/shipments/{id}/
```

### POST

```
  POST /api/shipments/
```

The "order_date" field is set automatically with the current date and is read only.

The request expects body in json format, example:

```
{
    "product_sku": "SKU-101",
    "customer_name": "John",
    "delivery_address": "1st Ave",
    "courier": "Speedy",
    "status": "Delivered"
}
```

### PUT

```
  PUT /api/shipments/{id}/
```

The "order_date" field is set automatically with the current date and is read only.

The request expects body in json format, example:

```
{
    "product_sku": "SKU-1919-OSO1",
    "customer_name": "John Smith",
    "delivery_address": "2nd Ave",
    "courier": "DHL",
    "status": "Awaiting Shipment"
}
```

### PATCH

```
  PATCH /api/shipments/{id}/
```

The "order_date" field is set automatically with the current date and is read only.

The request expects body in json format, example:

```
{
    "customer_name": "Jane Doe"
}
```

### DELETE

```
  DELETE /api/shipments/{id}/
```
