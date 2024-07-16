from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from .models import StoreSuggestedPost, Post

@shared_task
def send_weekly_suggested_posts():
    # Fetch all the StoreSuggestedPost entries
    suggested_posts_entries = StoreSuggestedPost.objects.all()

    for entry in suggested_posts_entries:
        user = entry.user
        email = entry.email
        suggested_posts = entry.suggested_posts.all()

        # Prepare the email content
        subject = 'Weekly Suggested Posts'
        html_message = render_to_string('weekly_suggested_posts.html', {'suggested_posts': suggested_posts})
        plain_message = strip_tags(html_message)

        try:
            send_mail(
                subject,
                plain_message,
                settings.EMAIL_HOST_USER,
                [email],
                html_message=html_message
            )
            print(f'Email sent to {email}')
        except Exception as e:
            print(f'Failed to send email to {email}: {e}')
