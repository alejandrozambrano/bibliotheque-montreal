# 📚 Bibliothèque de Montréal

Un projet académique qui démontre mes compétences en **développement fullstack** avec Python, FastAPI et plusieurs frameworks frontend.  
L’application est un **système de gestion de livres (CRUD)** avec une base de données en **JSON**, connecté à trois interfaces différentes.

---

## 🌍 Languages
- 🇫🇷 Français
- 🇬🇧 English
- 🇪🇸 Español

---

## 🇫🇷 Description (Français)
Application de gestion de livres développée dans le cadre de mes études à **Institut Teccart (Montréal)**.  
Le backend est construit avec **FastAPI (Python)** et communique avec une base de données **JSON**.  

Trois interfaces permettent d’interagir avec l’API :
- **Frontend HTML/CSS/JS** (formulaires simples)
- **Frontend React.js** (interface dynamique)
- **Frontend Django** (interface Python côté serveur)

Toutes les opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sont **synchronisées en temps réel** entre les interfaces.

---

## 🇬🇧 Description (English)
Library management application developed as part of my studies at **Institut Teccart (Montreal)**.  
The backend is powered by **FastAPI (Python)** with a **JSON database**.  

Three different interfaces consume the same API:
- **HTML/CSS/JS frontend**
- **React.js frontend**
- **Django frontend**

Every CRUD operation (Create, Read, Update, Delete) is **reflected across all interfaces simultaneously**.

---

## 🇪🇸 Descripción (Español)
Aplicación de gestión de libros desarrollada como parte de mis estudios en **Institut Teccart (Montreal)**.  
El backend está construido con **FastAPI (Python)** y utiliza una base de datos en **JSON**.  

El sistema cuenta con tres interfaces conectadas a la misma API:
- **Frontend en HTML/CSS/JS**
- **Frontend en React.js**
- **Frontend en Django**

Cada operación CRUD (Crear, Leer, Actualizar, Eliminar) se refleja en **todas las interfaces al mismo tiempo**.

---

## ⚙️ Stack technologique / Tech Stack
- **Backend**: Python, FastAPI, JSON
- **Frontend**: HTML/CSS/JS, React.js, Django
- **Tools**: GitHub, Postman, VS Code

---

## 🚀 Installation
```bash
# Clone the repository
git clone https://github.com/alejandrozambrano/bibliotheque-montreal.git

# Enter backend
cd backend_fastapi
pip install -r requirements.txt
uvicorn main:app --reload

# Access API docs
http://127.0.0.1:8000/docs
