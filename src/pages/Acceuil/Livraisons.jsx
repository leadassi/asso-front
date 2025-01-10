import React, { useEffect, useState } from "react";
import "./Livraisons.css";
import { useNavigate } from "react-router-dom";

const Livraisons = () => {
  const navigate = useNavigate();
  const [livraisons, setLivraisons] = useState([]);
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchLivraisons = async () => {
      const idUtilisateur = 2; // Définition manuelle
      const idCommande = 5; // Définition manuelle
      
      try {
        const response = await fetch(`http://127.0.0.1:8000/Livraisonservices/livraisons/${idUtilisateur}/${idCommande}/`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des livraisons");
        }
        const data = await response.json();
        console.log(data);
        setLivraisons(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des livraisons :", error);
      }
    };

    fetchLivraisons();
  }, []);

  return (
    <div className="livraisons-container">
      <button className="back-button" onClick={handleBack}>
        <i className="fas fa-arrow-left"></i>
      </button>
      <h1 className="page-title">Suivi de vos Livraisons</h1>
      {livraisons.length === 0 ? (
        <p>Aucune livraison disponible pour le moment.</p>
      ) : (
        livraisons.map((livraison) => (
          <div key={livraison.id_commande} className="livraison-card">
            <div className="livreur-section">
              <img
                src={livraison.livreur.image_url || "https://via.placeholder.com/150"}
                alt={`${livraison.livreur.nom} ${livraison.livreur.prenom}`}
                className="livreur-image"
              />
              <div className="livreur-info">
                <h3>{livraison.livreur.nom} {livraison.livreur.prenom}</h3>
                <p className="livreur-role">Votre livreur</p>
              </div>
            </div>
            <div className="livraison-details">
              <p><strong>Produits :</strong> {livraison.liste_produit}</p>
              <p><strong>Destination :</strong> {livraison.destination}</p>
              <p><strong>Coût :</strong> {livraison.cout} FCFA</p>
              <p><strong>ID Client :</strong> {livraison.id_utilisateur}</p>
              <p><strong>ID Commande :</strong> {livraison.id_commande}</p>
              <p><strong>Date :</strong> {livraison.date}</p>
              <p>
                <strong>QR Code :</strong> 
                {livraison.qr_code_url ? (
                  <a
                    href={livraison.qr_code_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="qr-code-link"
                  >
                    Voir le QR Code
                  </a>
                ) : (
                  " Non disponible"
                )}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Livraisons;
