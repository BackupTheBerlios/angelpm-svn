from django.db import models
from django.contrib.auth.models import User

GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        )

class UserInfo(models.Model):
    user   = models.ForeignKey(User)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    dob    = models.DateField()
