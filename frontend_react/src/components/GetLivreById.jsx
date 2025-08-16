import React, { useState } from "react";
import axios from "axios";
import './DeleteLivre.css'; // reutilization
import './LivreList.css' // reutilization


const GetLivreById = () => {
  const [showForm, setShowForm] = useState(false);
  const [id, setId] = useState('');
  const [livre, setLivre] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://127.0.0.1:8000/livre/${id}`)
      .then((res) => {
        setLivre(res.data);
        setError(null);
      })
      .catch((err) => {
        setLivre(null);
        setError("Aucun livre trouvé.");
      });
  };

  return (
    <div style={{ marginLeft: '40px', marginTop: '30px' }}>
      <button className='btn-livres' onClick={() => setShowForm(!showForm)}>
        {showForm ? "✖️ Fermer" : "🔍 Rechercher par ID"}
      </button>

      {showForm && (
        <form className="form-livre" onSubmit={handleSubmit}>
          <h2>🔍 Rechercher un Livre par ID</h2>

          <label>ID du Livre :</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <button type="submit">🔍 Rechercher</button>

          {livre && (
            <div className="livre-card">
              <h3>📚 Livre Trouvé :</h3>
                <img src={livre.picture} alt={livre.nameLivre}/>
              <p><strong>Titre:</strong> {livre.nameLivre}</p>
              <p><strong>Auteur:</strong> {livre.auteur}</p>
              <p><strong>Description:</strong> {livre.bio}</p>

            </div>
          )}

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default GetLivreById;
