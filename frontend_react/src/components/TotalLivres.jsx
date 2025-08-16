// src/components/TotalLivres.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './TotalLivres.css';

function TotalLivres() {
  const [total, setTotal] = useState(null);
  const [error, setError] = useState('');

  const handleClick = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/total_livres');
      setTotal(response.data.total);
      setError('');
    } catch (error) {
      console.error(error);
      setError("Erreur lors de la récupération du total.");
    }
  };

  return (
    <div className="total-container">
      <button onClick={handleClick} className="btn-total">📊 Total des Livres</button>
      {total !== null && <p className="result-text">📚 Total : {total}</p>}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default TotalLivres;
