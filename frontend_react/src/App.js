import React, { useState, useEffect } from 'react';
import axios from "axios";
import LivreList from './components/LivreList';
import AddLivre from "./components/AddLivre";
import ModifierLivre from "./components/ModifierLivre";
import DeleteLivre from "./components/DeleteLivre";
import GetLivreById from "./components/GetLivreById";
import TotalLivres from "./components/TotalLivres";
import './App.css';
import './index.css';


function App() {
  const [livres, setLivres] = useState([]);

  const fetchLivres = async () => {
    const res = await axios.get('http://127.0.0.1:8000/livres');
    setLivres(res.data);
  };

  useEffect(() => {
    fetchLivres();
  }, []);

 return (
    <div className="card-container">
           <h1 className="main-title">📚 Bibliothèque de Montréal</h1>
              <div className="button-group top">
                <AddLivre />
                <ModifierLivre />
                <DeleteLivre />
                <GetLivreById />
              </div>

              <div className="button-group bottom">
                <LivreList />
                <TotalLivres />
              </div>
    </div>
  );
}

export default App;
