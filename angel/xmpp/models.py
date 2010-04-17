from django.db import models

class OfUser(models.Model):
    """docstring for OfUser"""
    username = models.CharField(max_length=192, primary_key=True)
    plain_pass = models.CharField(max_length=96, db_column='plainPassword',
            blank=True)
    encrypted_pass = models.CharField(max_length=765,
            db_column='encryptedPassword',
            blank=True)
    name = models.CharField(max_length=300, blank=True)
    email = models.CharField(max_length=300, blank = True)
    creation_date = models.CharField(max_length=45, db_column='creationDate')
    modfication_date = models.CharField(max_length=45,
            db_column='modificationDate')

    class Meta:
        db_table = u'ofUser'
