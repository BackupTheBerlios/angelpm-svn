from django import forms

GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        )

class RegisterForm(forms.Form):
    username = forms.CharField(max_length=192)
    email = forms.EmailField()
    password = forms.CharField(max_length=96)
    gender = forms.ChoiceField(choices=GENDER_CHOICES)
    dob = forms.DateField()

class LoginForm(forms.Form):
    username = forms.CharField(max_length=192)
    password = forms.CharField(max_length=96, widget=forms.PasswordInput)
    next     = forms.CharField(max_length=200)
    remember_me = forms.BooleanField()
