import React, { useState } from "react";
import axios from "axios";
import './AddLivre.css';

const AddLivre = () => {
  const [showForm, setShowForm] = useState(false); // mostrar/ocultar

  const [livre, setLivre] = useState({
    id: "",
    nameLivre: "",
    bio: "",
    auteur: "",
    picture: ""
  });

  const handleChange = (e) => {
    setLivre({ ...livre, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/livre", livre)
      .then(() => {
        alert("📚 Livre ajouté avec succès !");
        setLivre({
          id: "",
          nameLivre: "",
          bio: "",
          auteur: "",
          picture: ""
        });
        setShowForm(false); // ocultar el formulario después de añadir
      })
      .catch((error) => {
        alert("Erreur lors de l’ajout du livre");
        console.error(error);
      });
  };

  return (
    <div style={{ marginLeft: '40px', marginTop: '30px' }}>
      <button style={{ borderRadius: '8px', backgroundColor: '#4caf50', color: 'white', padding: '10px 18px', border: 'none', cursor: 'pointer', fontSize: '16px', marginBottom: '20px' }} onClick={() => setShowForm(!showForm)}>
        {showForm ? "✖️ Fermer" : "➕ Ajouter un Livre"}
      </button>

      {showForm && (
        <form className="form-livre" onSubmit={handleSubmit}>
          <h2>📘 Ajouter un Livre</h2>

          <label>ID :</label>
          <input type="number" name="id" value={livre.id} onChange={handleChange} required />

          <label>Titre :</label>
          <input type="text" name="nameLivre" value={livre.nameLivre} onChange={handleChange} required />

          <label>Auteur :</label>
          <input type="text" name="auteur" value={livre.auteur} onChange={handleChange} required />

          <label>Description :</label>
          <textarea name="bio" value={livre.bio} onChange={handleChange} required />

          <label>Image (URL) :</label>
          <input type="url" name="picture" value={livre.picture} onChange={handleChange} required />

          <button type="submit">📘 Ajouter</button>
        </form>
      )}
    </div>
  );
};

export default AddLivre;



