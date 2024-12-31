import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./choisir.css";

const Page = () => {
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleLivrer = () => {
    setNotification("Un livreur sera assigné à votre commande.");
    hideNotificationAfterDelay("map"); // Redirige vers la page Livraisons
  };

  const handleRecuperer = () => {
    setNotification("Vous avez choisi de récupérer vous-même votre commande.");
    hideNotificationAfterDelay("asso"); // Redirige vers la page Retrait (ou une autre)
  };

  const hideNotificationAfterDelay = (path) => {
    setTimeout(() => {
      setNotification(null);
      navigate(`/${path}`); // Redirection vers la page spécifiée
    }, 2000); // Cache la notification après 10 secondes
  };

  return (
    <div className="commande-page">
      <h1 className="page-title">Gestion des Commandes</h1>
      {notification && <div className="notification">{notification}</div>}
      <div className="buttons-container">
        <button className="animated-button livrer" onClick={handleLivrer}>
          Livrer ma commande
        </button>
        <button className="animated-button recuperer" onClick={handleRecuperer}>
          Récupérer ma commande
        </button>
      </div>
    </div>
  );
};

export default Page;
