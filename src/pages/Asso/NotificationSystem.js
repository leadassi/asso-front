import React, { useState } from "react";
import "./NotificationSystem.css";

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([
    "Nouvelle commande reçue !",
    "Message de l'administrateur.",
    "Votre profil a été mis à jour."
  ]);
  const [isVisible, setIsVisible] = useState(false);

  // Basculer l'affichage de la liste des notifications
  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  // Supprimer une notification spécifique
  const handleDeleteNotification = (index) => {
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);
  };

  return (
    <div className="notification-system">
      {/* Icône de notification */}
      <div className="notification-icon" onClick={handleToggle}>
        <i className="fas fa-bell"></i>
        {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
      </div>

      {/* Liste des notifications */}
      {isVisible && notifications.length > 0 && (
        <div className="notification-list">
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>
                <span>{notification}</span>
                <button onClick={() => handleDeleteNotification(index)}>Supprimer</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Message si aucune notification */}
      {isVisible && notifications.length === 0 && (
        <div className="notification-list empty">
          <p>Aucune notification disponible.</p>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;
