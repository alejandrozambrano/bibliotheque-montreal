import React, { useState } from "react";
import axios from "axios";
import './ModifierLivre.css';

const ModifierLivre = () => {
  const [showForm, setShowForm] = useState(false);

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
    axios.put(`http://127.0.0.1:8000/livre/${livre.id}`, {
      nameLivre: livre.nameLivre,
      bio: livre.bio,
      auteur: livre.auteur,
      picture: livre.picture
    })
      .then(() => {
        alert("📘 Livre modifié avec succès !");
        setLivre({ id: "", nameLivre: "", bio: "", auteur: "", picture: "" });
        setShowForm(false);
      })
      .catch((error) => {
        alert("Erreur lors de la modification");
        console.error(error);
      });
  };

  return (
    <div style={{ marginLeft: '40px', marginTop: '30px' }}>
      <button style={{ borderRadius: '8px', backgroundColor: '#4caf50', color: 'white', padding: '10px 18px', border: 'none', cursor: 'pointer', fontSize: '16px', marginBottom: '20px' }} className="btn-modifier" onClick={() => setShowForm(!showForm)}>
        {showForm ? "✖️ Fermer" : "✏️ Modifier un Livre"}
      </button>

      {showForm && (
        <form className="form-modifier" onSubmit={handleSubmit}>
          <h2>✏️ Modifier un Livre</h2>

          <label>ID du Livre à modifier :</label>
          <input type="number" name="id" value={livre.id} onChange={handleChange} required />

          <label>Nouveau Titre :</label>
          <input type="text" name="nameLivre" value={livre.nameLivre} onChange={handleChange} required />

          <label>Nouveau Auteur :</label>
          <input type="text" name="auteur" value={livre.auteur} onChange={handleChange} required />

          <label>Nouvelle Description :</label>
          <textarea name="bio" value={livre.bio} onChange={handleChange} required />

          <label>Nouvelle Image (URL) :</label>
          <input type="url" name="picture" value={livre.picture} onChange={handleChange} required />

          <button type="submit">✅ Modifier</button>
        </form>
      )}
    </div>
  );
};

export default ModifierLivre;
