from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("livre/ajouter/", views.livre_create, name="livre_create"),
    path("livre/<int:id>/modifier/", views.livre_update, name="livre_update"),
    path("livre/<int:id>/supprimer/", views.livre_delete, name="livre_delete"),
    path("rechercher/", views.search_by_id, name="search_by_id"),
]
