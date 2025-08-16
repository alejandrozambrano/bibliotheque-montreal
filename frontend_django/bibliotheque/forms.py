from django import forms

class LivreCreateForm(forms.Form):
    id = forms.IntegerField(min_value=1, label="ID")
    nameLivre = forms.CharField(max_length=200, label="Titre")
    bio = forms.CharField(widget=forms.Textarea, required=False, label="Description")
    auteur = forms.CharField(max_length=200, label="Auteur")
    picture = forms.URLField(required=False, label="Image (URL)")

class LivreUpdateForm(forms.Form):
    nameLivre = forms.CharField(max_length=200, label="Titre")
    bio = forms.CharField(widget=forms.Textarea, required=False, label="Description")
    auteur = forms.CharField(max_length=200, label="Auteur")
    picture = forms.URLField(required=False, label="Image (URL)")

class IdForm(forms.Form):
    id = forms.IntegerField(min_value=1, label="ID")
