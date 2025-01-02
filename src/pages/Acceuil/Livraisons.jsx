import React, { useEffect, useState } from "react";
import "./Livraisons.css";

const Livraisons = () => {
  const [livraisons, setLivraisons] = useState([]);

  useEffect(() => {
    const fetchLivraisons = async () => {
      try {
        const response = await fetch("http://localhost:8001/Livraisonservices/Livraisonservicesapi/livraisons");
        const data = await response.json();
        setLivraisons(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des livraisons :", error);
      }
    };

    fetchLivraisons();
  }, []);

  return (
    <div className="livraisons-container">
      <h1 className="page-title">Suivi de vos Livraisons</h1>

      {livraisons.length === 0 ? (
        <p>Aucune livraison disponible pour le moment.</p>
      ) : (
        livraisons.map((livraison) => (
          <div key={livraison.id_commande} className="livraison-card">
            {/* Section Livreurs */}
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

            {/* Détails de Livraison */}
            <div className="livraison-details">
              <p><strong>Produits :</strong> {livraison.liste_produit}</p>
              <p><strong>Destination :</strong> {livraison.destination}</p>
              <p><strong>Coût :</strong> {livraison.cout} FCFA</p>
              <p><strong>ID Client :</strong> {livraison.id_client}</p>
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
