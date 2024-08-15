# Setting Up Newsletter with Beehive

## Introduction

This guide outlines the steps to set up a newsletter feature in your SaaS application using Beehive. Beehive is a powerful platform that enables seamless newsletter management.

## Steps

Follow these steps to integrate Beehive with your SaaS application:

1. **Get Beehive API Key and Publication ID:**
    - Log in to your Beehive account.Access to Beehive (Sign up at [Beehive](https://www.beehiiv.com/))
    - Navigate to your account settings and open integrations tab.
    - Generate an API key and note down your Publication ID.

2. **Configure Environment Variables:**
    - Open your SaaS application's environment configuration file (usually named `.env`).
    - Add the following lines:
        ```env
        BEEHIV_API_KEY=your_beehive_api_key
        BEEHIV_PUBLICATION_ID=your_beehive_publication_id
        ```
        Replace `your_beehive_api_key` and `your_beehive_publication_id` with the API key and Publication ID obtained in step 1.

That's it! You have successfully set up a newsletter feature in your SaaS application using Beehive and now you can manage your newsletter subscriptions using Beehive Dashboard.

# Setting Up Newsletter with Beehive

## Introduction

This guide outlines the steps to set up a captcha verification feature in your SaaS application using google captcha.

## Steps

Follow these steps to integrate ReCaptcha with your SaaS application:

1. **Get Recaptcha Secret Key and Site Key from google captcha and keep version v2 invisible**
2. **Configure Environment Variables:**
    - Open your SaaS application's environment configuration file (usually named `.env`).
    - Add the following lines:
        ```env
        RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key (add in backend)
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key  (add in frontend)
        ```
        Replace `your_recaptcha_secret_key` and `your_recaptcha_site_key` with the Secret Key and Site key obtained in step 1.

That's it! You have successfully set up a captcha verification feature in your SaaS application.


# Setting Up Brevo

## Introduction

This guide outlines the steps to set up a brevo integration in your SaaS application.

## Steps

Follow these steps to integrate Brevo with your SaaS application:
1. **Configure Environment Variables:**
    - Log in to your Brevo account.Access to Brevo (Sign up at [Brevo](https://www.brevo.com/))
    - Navigate to your account settings and open SMTP & API Key.
    - Generate an API key.
    - After that got to contacts section in brevo and use column named USER_TYPE of text field.

That's it! You have successfully set up a brevo feature in your SaaS application.

2. **Configure Environment Variables:**

    - Open your SaaS application's environment configuration file (usually named `.env`).
    - Add the following lines:
        ```env
        BREVO_API_KEY=your_brevo_api_key (add in backend)
        ```
        Replace `your_brevo_api_key` with the API Key obtained in step 1.

That's it! You have successfully set up a brevo integration in your SaaS application.
