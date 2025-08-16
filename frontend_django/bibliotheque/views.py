from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib import messages
import requests

from .forms import LivreCreateForm, LivreUpdateForm, IdForm

API_BASE = "http://127.0.0.1:8000"

def index(request):
    # Listado + total (server-side)
    try:
        r_list = requests.get(f"{API_BASE}/livres", timeout=5)
        r_list.raise_for_status()
        livres = r_list.json() if isinstance(r_list.json(), list) else []
    except Exception as e:
        messages.error(request, f"Erreur lors du chargement des livres: {e}")
        livres = []

    try:
        r_total = requests.get(f"{API_BASE}/total_livres", timeout=5)
        r_total.raise_for_status()
        total = r_total.json().get("total", 0)
    except Exception as e:
        messages.error(request, f"Erreur lors du chargement du total: {e}")
        total = 0

    return render(request, "bibliotheque/index.html", {
        "livres": livres,
        "total": total,
        "id_form": IdForm(),
    })

def livre_create(request):
    if request.method == "POST":
        form = LivreCreateForm(request.POST)
        if form.is_valid():
            try:
                payload = form.cleaned_data
                r = requests.post(f"{API_BASE}/livre", json=payload, timeout=5)
                if r.status_code >= 400:
                    messages.error(request, f"Erreur API: {r.text}")
                else:
                    messages.success(request, "Livre ajouté avec succès.")
                    return redirect(reverse("index"))
            except Exception as e:
                messages.error(request, f"Erreur lors de l'ajout: {e}")
    else:
        form = LivreCreateForm()
    return render(request, "bibliotheque/form_livre.html", {
        "title": "Ajouter un Livre",
        "form": form,
        "action": reverse("livre_create"),
        "method": "POST",
        "is_create": True,
    })

def livre_update(request, id: int):
    if request.method == "GET":
        try:
            r = requests.get(f"{API_BASE}/livre/{id}", timeout=5)
            if r.status_code == 404:
                messages.error(request, "Livre introuvable.")
                return redirect(reverse("index"))
            r.raise_for_status()
            data = r.json()
            form = LivreUpdateForm(initial={
                "nameLivre": data.get("nameLivre", ""),
                "bio": data.get("bio", ""),
                "auteur": data.get("auteur", ""),
                "picture": data.get("picture", ""),
            })
        except Exception as e:
            messages.error(request, f"Erreur: {e}")
            return redirect(reverse("index"))
        return render(request, "bibliotheque/form_livre.html", {
            "title": f"Modifier le Livre #{id}",
            "form": form,
            "action": reverse("livre_update", args=[id]),
            "method": "POST",
            "is_create": False,
            "id": id,
        })

    form = LivreUpdateForm(request.POST)
    if form.is_valid():
        try:
            payload = form.cleaned_data
            r = requests.put(f"{API_BASE}/livre/{id}", json=payload, timeout=5)
            if r.status_code >= 400:
                messages.error(request, f"Erreur API: {r.text}")
            else:
                messages.success(request, "Livre modifié avec succès.")
                return redirect(reverse("index"))
        except Exception as e:
            messages.error(request, f"Erreur lors de la modification: {e}")
    return render(request, "bibliotheque/form_livre.html", {
        "title": f"Modifier le Livre #{id}",
        "form": form,
        "action": reverse("livre_update", args=[id]),
        "method": "POST",
        "is_create": False,
        "id": id,
    })

def livre_delete(request, id: int):
    if request.method == "POST":
        try:
            r = requests.delete(f"{API_BASE}/livre/{id}", timeout=5)
            if r.status_code == 404:
                messages.error(request, "Livre introuvable.")
            elif r.status_code >= 400:
                messages.error(request, f"Erreur API: {r.text}")
            else:
                messages.success(request, "Livre supprimé.")
            return redirect(reverse("index"))
        except Exception as e:
            messages.error(request, f"Erreur lors de la suppression: {e}")
            return redirect(reverse("index"))

    # GET: mostrar confirmación con datos
    try:
        r = requests.get(f"{API_BASE}/livre/{id}", timeout=5)
        if r.status_code == 404:
            messages.error(request, "Livre introuvable.")
            return redirect(reverse("index"))
        r.raise_for_status()
        livre = r.json()
    except Exception as e:
        messages.error(request, f"Erreur: {e}")
        return redirect(reverse("index"))

    return render(request, "bibliotheque/confirm_delete.html", {
        "livre": livre,
        "id": id,
        "action": reverse("livre_delete", args=[id]),
    })

def search_by_id(request):
    if request.method == "POST":
        form = IdForm(request.POST)
        if form.is_valid():
            id = form.cleaned_data["id"]
            try:
                r = requests.get(f"{API_BASE}/livre/{id}", timeout=5)
                if r.status_code == 404:
                    messages.warning(request, "Livre non trouvé.")
                    return redirect(reverse("index"))
                r.raise_for_status()
                data = r.json()
                return render(request, "bibliotheque/search_result.html", {"livre": data})
            except Exception as e:
                messages.error(request, f"Erreur: {e}")
                return redirect(reverse("index"))
    return redirect(reverse("index"))
