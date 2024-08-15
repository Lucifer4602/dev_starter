## Setting up payments

1. add the stripe keys to the .env

```.env

STRIPE_WEBHOOK_SECRET_LIVE=STRIPE_WEBHOOK_SECRET_LIVE
STRIPE_SECRET_KEY=STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=STRIPE_PUBLISHABLE_KEY

```
<!-- TODO: add a script to seed the plans in db  -->

2. Open a webhook at port:8000 and set it in stripe

3. Create Products in stripe -> Webhook would sync the products with the DB


**To manually sync prices with django run this/add to Docker template**

```
python manage.py init_plans

```
