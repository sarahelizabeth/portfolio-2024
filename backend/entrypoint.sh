#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

if [ -n "$CUSTOMERS_HOST" ]; then
  /usr/src/backend/wait-for-it.sh "$CUSTOMERS_HOST:${CUSTOMERS_PORT:-6000}"
fi

# Run migrations
echo "Running migrations..."
python manage.py migrate --noinput

# Collect static files (optional, but recommended for production)
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Execute the command passed as arguments to the script
exec "$@"
