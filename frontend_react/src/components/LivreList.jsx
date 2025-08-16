// src/components/LivreList.jsx
import React, { useState } from "react";
import axios from "axios";
import "./LivreList.css"


const LivreList = () => {
  const [livres, setLivres] = useState([]);

  const fetchLivres = async () => {
      try {
          const response = await axios.get("http://127.0.0.1:8000/livres");
          setLivres(response.data);
      } catch(error) {
        console.error("Erreur lors de la récupération des livres :", error);
      }
  };

  return (
    <div className="livre-container">

      <button className="btn-livres" onClick={fetchLivres}>📖 Voir les livres</button>

     <div className="livre-list">
         {livres.length === 0 ? (
        <p>Aucun livre trouvé.</p>
      ) : (
          livres.map((livre) => (
            <div key={livre.id} className="livre-card">
                <img src={livre.picture} alt={livre.nameLivre}/>
                <div className="livre-info">
                    <h3>{livre.nameLivre}</h3>
                    <p><strong>Auteur :</strong> {livre.auteur}</p>
                    <p><em>{livre.bio}</em></p>
                </div>
            </div>
          ))
      )}
     </div>
    </div>
  );
};

export default LivreList;
