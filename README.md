# orbis-be

Users passwords are: 1234567890

For .env file you will need: 

SERVER_HOSTNAME = localhost
SERVER_PORT = 7878

DB_HOST = localhost
DB_USER = db user
DB_PASSWORD = db password
DB_PORT = 3306

SALT = 10
ACCESS_TOKEN_SECRET = secret
REFRESH_TOKEN_SECRET = secret


# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="mysql://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/db?connection_limit=5&socket_timeout=3"