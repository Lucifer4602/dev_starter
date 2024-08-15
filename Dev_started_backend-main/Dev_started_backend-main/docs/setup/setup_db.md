


create a postgreql db

```
psql -d postgres

```

entering the PSQL shell run:

```psql

create database <project_name> ;

crate user <user_name> with password '<password>';

grant all on database <project_name> to <user_name>;
```


To connect to the DB seed the ENV variables in .env

```.env


POSTGRESS_DB_NAME=<project_name>
POSTGRESS_USER=<user_name>
POSTGRESS_PASSWORD=<password>
POSTGRESS_HOST="localhost"

```


now run the migrations and apply them to the database

```

python manage.py makemigrations

python manage.py migrate

```


create a superUser to access via Admin

```
python manage.py createsuperuser
```

run the server finally:

```
python manage.py runserver

```
