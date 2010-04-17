from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from collabnote.xmpp.models import OfUser
import hashlib
import datetime

GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        )

class UserInfoManager(models.Manager):
    def create_user(self, username, email, password, gender, dob):
        today = datetime.date.today()
        crypt_sha = hashlib.sha1()
        crypt_sha.update(password)
        encrypted_pass = "sha$" + crypt_sha.hexdigest()

        user = User.objects.create_user(username, email, password)
        ofuser = OfUser(username=username,
                encrypted_pass=encrypted_pass,
                email=email,
                creation_date=today.strftime("%Y%m%d"),
                modfication_date="0")
        userinfo = UserInfo(user=user, ofuser=ofuser,
                gender=gender, dob=dob)
        user.save()
        ofuser.save()
        userinfo.save()
        return userinfo

    def username_exist(self, username):
        """docstring for check_username"""
        try:
            existing_user = OfUser.objects.get(username__exact=username)
            return True
        except ObjectDoesNotExist:
            try:
                existing_user = User.objects.get(username__exact=username)
                return True
            except ObjectDoesNotExist:
                return False

    def check_user_pass(self, username, password):
        try:
            user = User.objects.get(username__exact=username)
            return user.check_password(password)
        except ObjectDoesNotExist:
            return False

class UserInfo(models.Model):
    user   = models.ForeignKey(User)
    ofuser = models.ForeignKey(OfUser)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    dob    = models.DateField()
    objects = UserInfoManager()
