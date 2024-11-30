import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./userprofile.css";
import { FaPen, FaPlus, FaQrcode, FaShoppingCart } from "react-icons/fa";
import defaultAvatar from "./avatar1.avif";
import avatar1 from './avatar1.avif';
import avatar2 from './avatar2.avif';
import avatar3 from './avatar3.avif';
import avatar4 from './avatar4.avif';
import avatar5 from './avatar5.avif';
import editIcon from "./editionicone.avif";

const Profile = () => {
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState([]);

  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5]; // Liste des avatars 

  // Charger l'avatar depuis localStorage ou utiliser l'avatar par défaut
  const storedAvatar = localStorage.getItem("selectedAvatar") || defaultAvatar;
  const [selectedAvatar, setSelectedAvatar] = useState(storedAvatar);
  const [isEditing, setIsEditing] = useState(false); // Contrôle de l'état d'édition

  // Sauvegarder l'avatar sélectionné dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("selectedAvatar", selectedAvatar);
  }, [selectedAvatar]);

  // Gère la sélection d'un avatar
  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setIsEditing(false); // Ferme la liste après la sélection
  };


  const [user, setUser] = useState(null);


  useEffect(() => {
    
    /*axios.get("http://localhost:9091/Utilisateurs/1") 
    .then((response) => response.json())
    .then((data) => setUser(data))
      .catch(error => console.error("Erreur lors du chargement des données utilisateur :", error));*/

      fetch("http://localhost:9091/Utilisateurs/1")
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Erreur lors du chargement des données utilisateur :", error));

    // Charger l'historique des commandes en temps réel
    axios.get("http://localhost:8080/orders/user/1") // URL de l'API des commandes
      .then(response => setOrders(response.data))
      .catch(error => console.error("Erreur lors du chargement des commandes :", error));
  }, []);

  return (
    <div className="user-profile">
      {/* Boutons de navigation */}
      <div className="footer-icons">
        <FaQrcode 
          className="icon" 
          onClick={() => navigate("/scanner")} 
        />&emsp;&emsp;
        <FaShoppingCart 
          className="icon" 
          onClick={() => navigate("/panier")} 
        />
      </div>
      <br/>
      {/* Section Avatar */}
      <div className="avatar-section" style={{ position: "relative", display: "inline-block" }}>


      <img
          src={selectedAvatar}
          alt="Avatar"
          style={{ borderRadius: "50%", width: "110px", height: "110px", border:"4px solid #ddd" }}
        />
        {/* Icône de modification */}
        
        <img
          src={editIcon}
          alt="Modifier l'avatar"
          onClick={() => setIsEditing(!isEditing)}
          style={{
            position: "absolute",
            bottom: "0",
            right: "-8%",
            width: "21%",
            cursor: "pointer",
          }}
        />
      </div>

      {/* Liste des avatars (visible seulement en mode édition) */}
      
      {isEditing && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            gap: "10px",
          }}
        >
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index + 1}`}
              onClick={() => handleAvatarSelect(avatar)}
              style={{
                borderRadius: "50%",
                width: "70px",
                height: "70px",
                cursor: "pointer",
                border: selectedAvatar === avatar ? "2px solid blue" : "none",
              }}
            />
          ))}
        </div>
      )}

      <div class="background-image-container">
        <img src="fontprofile.jpg" alt="" class="background-image"/>
      </div>
      

      {/* Section Grille */}
      <div className="content-grid">
        {/* Informations utilisateur */}
        <div className="user-info">
          <h3>Informations Utilisateur</h3>
          {user ? (
            <>
              {Object.entries(user).map(([key, value]) => (
                <div className="info-item" key={key}>
                  <span>{key}: {value}</span>
                  <FaPen className="edit-icon" />
                </div>
              ))}
            </>
          ) : (
            <p>Chargement des informations...</p>
          )}
        </div>

        {/* Historique des commandes */}
        <div className="order-history">
          <h3>Historique des commandes</h3>
          {orders.length > 0 ? (
            orders.slice(0, 5).map(order => ( 
              <div className="order-item" key={order.id}>
                Commande {order.id}: {order.description}
              </div>
            ))
          ) : (
            <p className="text-center">Vide</p>
          )}
          <button 
            className="view-all-btn" 
            onClick={() => navigate("/historique")}
          >
            <FaPlus /> Plus
          </button>
        </div>
      </div>

      
    </div>
  );
};



export default Profile;