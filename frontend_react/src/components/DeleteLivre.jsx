import React, { useState } from "react";
import axios from "axios";
import './ModifierLivre';

const DeleteLivre = () => {
  const [showForm, setShowForm] = useState(false);
  const [id, setId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.delete(`http://127.0.0.1:8000/livre/${id}`)
      .then(() => {
        alert("📕 Livre supprimé avec succès !");
        setId('');
        setShowForm(false);
      })
      .catch((err) => {
        alert("Erreur lors de la suppression");
        console.error(err);
      });
  };

  return (
    <div style={{ marginLeft: '40px', marginTop: '30px' }}>
      <button style={{ borderRadius: '8px', backgroundColor: '#4caf50', color: 'white', padding: '10px 18px', border: 'none', cursor: 'pointer', fontSize: '16px', marginBottom: '20px' }} onClick={() => setShowForm(!showForm)}>
        {showForm ? "✖️ Fermer" : "🗑️ Supprimer un Livre"}
      </button>

      {showForm && (
        <form className="form-livre" onSubmit={handleSubmit}>
          <h2>🗑️ Supprimer un Livre</h2>

          <label>ID du Livre à supprimer :</label>
          <input type="number" value={id} onChange={(e) => setId(e.target.value)} required />

          <button type="submit" style={{ backgroundColor: "red" }}>❌ Supprimer</button>
        </form>
      )}
    </div>
  );
};

export default DeleteLivre;
