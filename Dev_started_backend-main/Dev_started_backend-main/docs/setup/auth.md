
### Password Hasing


```
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
]

```
in settings.py is used to configure password hasing

<!-- TODO: add validation for free/temp emails  -->


## Roadmap

- Add email activation
- add Email cleaing for + , . case
- add account Locking
- add browser fingerprints
- Add Phone OTP support



# Sample curl to signup with password :


```sh

curl -X 'POST' \
  'http://127.0.0.1:8000/api/authentication/sign-up' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "first_name": "ANubhav",
  "last_name": "Gupta",
  "email": "anubhavgupta2261@gmail.com",
  "password": "9814430133@a"
}'

```
{
  "first_name": "ANubhav",
  "last_name": "Gupta",
  "email": "anubhavgupta2261@gmail.com",
  "password": "9814430133@a"
}

returns
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudWJoYXZndXB0YTIyNjFAZ21haWwuY29tIn0.C77A3_fnqORgrtW8beIbUjor-lQxIvTpj5lrqDKrF4Q"
}
