from django.contrib import admin

from .models import Banner, Contact, Feedback, GitHubProfile, NewletterSubscribers

# Register the model individually.
admin.site.register(NewletterSubscribers)
admin.site.register(Contact)
admin.site.register(Feedback)
admin.site.register(Banner)
admin.site.register(GitHubProfile)
