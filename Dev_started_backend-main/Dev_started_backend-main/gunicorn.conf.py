import multiprocessing

# Gunicorn configuration file for Django application

# The address on which the Django application will be accessible
bind = "0.0.0.0:8000"

# Number of worker processes for handling requests
workers = multiprocessing.cpu_count() * 2 + 1

# Worker class for handling requests
worker_class = "uvicorn.workers.UvicornWorker"

# Number of threads per worker
threads = multiprocessing.cpu_count() * 2

# Maximum number of requests a worker will process before restarting
max_requests = 1000

# Timeout for handling requests (in seconds)
timeout = 300

graceful_timeout = 600

# Keep alive
keepalive = 2


# Logging configuration
accesslog = "-"  # Log to stdout
errorlog = "-"  # Log to stdout
loglevel = "info"
