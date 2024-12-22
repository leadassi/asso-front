import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  
  const [editableField, setEditableField] = useState(null); // Champ en cours de modification
  //const [editedValue, setEditedValue] = useState(""); // Valeur modifiée
  const fieldsOrder = ["nom","prenom", "email", "numerotelephone", "ville", "quartier"]; // Champs à afficher et ordre
  const [editedFields, setEditedFields] = useState({});

  // Sauvegarder l'avatar sélectionné dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("selectedAvatar", selectedAvatar);
  }, [selectedAvatar]);

  // Gère la sélection d'un avatar
  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setIsEditing(false); // Ferme la liste après la sélection
  };

  const [utilisateurNom, setUtilisateurNom] = useState("");
  const [utilisateurPrenom, setUtilisateurPrenom] = useState("");


  const fetchCsrfToken = async () => {
    try {
      const response = await fetch('http://localhost:9091/Utilisateurs/csrf-token', {
        method: 'GET',
        credentials: 'include', // Inclut les informations de session (cookies)
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération du jeton CSRF : ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Réponse du jeton CSRF:', data);

      if (data.token) {
        return data.token.replace(/"/g, ''); // Renvoie le jeton CSRF récupéré
      }

      throw new Error('Jeton CSRF non trouvé dans la réponse.');
    } catch (err) {
      console.error('Erreur lors de la récupération du jeton CSRF :', err);
      throw err;
    }
  };


  const [user, setUser] = useState(null);



  useEffect(() => {

    const utilisateurId = sessionStorage.getItem('utilisateurId');
    if (!utilisateurId) {
      console.error("Aucun ID utilisateur trouvé dans le sessionStorage.");
      return;
    }

    const utilisateurNom = sessionStorage.getItem('utilisateurNom');
    const utilisateurPrenom = sessionStorage.getItem('utilisateurPrenom');
    if (!utilisateurNom || !utilisateurPrenom) {
      console.error("Aucun nom, prénom d'utilisateur trouvé dans le sessionStorage.");
      return;
    }

      fetch(`http://localhost:9091/Utilisateurs/${utilisateurId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Erreur lors du chargement des données utilisateur :", error));

    // Charger l'historique des commandes en temps réel
    fetch("http://localhost:8080/orders/user/1") // URL de l'API des commandes
      .then(response => setOrders(response.data))
      .catch(error => console.error("Erreur lors du chargement des commandes :", error));

    
    setUtilisateurNom(JSON.parse(utilisateurNom));
    setUtilisateurPrenom(JSON.parse(utilisateurPrenom));
  }, []);


  const handleSaveClick = async () => {
    try {
      // Construire l'objet utilisateur avec les modifications locales
      const updatedUser = { ...user, ...editedFields };
      const utilisateurId = sessionStorage.getItem('utilisateurId');
      const csrfToken = await fetchCsrfToken();
  
      // Ajouter l'en-tête Authorization avec Basic Auth
      const username = 'user'; // Nom d'utilisateur Basic Auth
      const password = 'password123'; // Mot de passe Basic Auth
      const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
  
      // Faire la requête PUT avec fetch
      const response = await fetch(`http://localhost:9091/Utilisateurs/${utilisateurId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Spécifier le type de contenu
          "X-CSRF-TOKEN": csrfToken, // Inclure le token CSRF
          Authorization: authHeader
        },
        body: JSON.stringify(updatedUser), // Convertir l'objet utilisateur en JSON
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
  
      // Mettre à jour l'état local avec les données renvoyées par le serveur
      const updatedData = await response.json();
      setUser(updatedData);
  
      // Réinitialiser les champs édités et désactiver le mode édition
      setEditedFields({});
      setEditableField(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations utilisateur :", error);
    }
  };
  

  const handleEditChange = (field, value) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [field]: value, // Mettre à jour uniquement le champ modifié
    }));
  };

  const handleCancelClick = () => {
    setEditableField(null); // Annuler la modification
    //setEditedValue(""); // Réinitialiser la valeur éditée
  };


  const handleLogout = async () => {
    try {
      const csrfToken = await fetchCsrfToken();
  
      // Ajouter l'en-tête Authorization avec Basic Auth
      const username = 'user'; // Nom d'utilisateur Basic Auth
      const password = 'password123'; // Mot de passe Basic Auth
      const authHeader = `Basic ${btoa(`${username}:${password}`)}`;


      const response = await fetch("http://localhost:9091/Utilisateurs/deconnexion", {
        method: "POST", // Ou 'GET' selon votre backend
        credentials: "include", // Inclure les cookies pour la session, si nécessaire
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Inclure le token CSRF
          Authorization: authHeader
        },
        
      });
  
      if (response.ok) {
        // Déconnexion réussie : rediriger l'utilisateur ou afficher un message
        alert("Déconnexion réussie !");
        sessionStorage.removeItem("utilisateurId");
        sessionStorage.removeItem("utilisateurPrenom");
        sessionStorage.removeItem("utilisateurNom");
        navigate("/"); // Redirection vers la page de connexion
      } else {
        // Gérer les erreurs de déconnexion
        const errorData = await response.json();
        alert(`Erreur : ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleAccountDeletion = async () => {
    
    const utilisateurId = sessionStorage.getItem('utilisateurId');

    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      try {

        const csrfToken = await fetchCsrfToken();
  
      // Ajouter l'en-tête Authorization avec Basic Auth
      const username = 'user'; // Nom d'utilisateur Basic Auth
      const password = 'password123'; // Mot de passe Basic Auth
      const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

        const response = await fetch(`http://localhost:9091/Utilisateurs/${utilisateurId}`, {
          method: "DELETE", // Méthode DELETE pour la suppression
          credentials: "include", // Inclure les cookies pour la session
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken, // Inclure le token CSRF
            Authorization: authHeader
          },
        });
  
        if (response.ok) {
          alert("Votre compte a été supprimé avec succès.");
          sessionStorage.removeItem("utilisateurId");
          sessionStorage.removeItem("utilisateurPrenom");
          sessionStorage.removeItem("utilisateurNom");
          navigate("/"); // Redirection après suppression (modifiez l'URL selon votre application)
        } else {
          const errorData = await response.json();
          alert(`Erreur : ${errorData.message}`);
        }
      } catch (error) {
        console.error("Erreur lors de la suppression du compte :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };
  

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
          onClick={() => navigate("/cart")} 
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
      <br/>
      <h3>Bonjour {utilisateurPrenom} {utilisateurNom},</h3>
      {/* Section Grille */}
      <div className="content-grid">
      
        {/* Informations utilisateur */}
        <div className="user-info">
          <h3>Mes Informations</h3>
          
        {user ? (
          <>
            {fieldsOrder.map((field) => (
              <div className="info-item" key={field} >
                <span style={{ fontWeight: "bold", marginRight: "10px" }}>
          {field}:{" "}
        </span>
        {editableField === field ? (
          <input
          type="text"
          value={editedFields[field] || user[field]} // Utiliser la valeur modifiée ou la valeur originale
          onChange={(e) => handleEditChange(field, e.target.value)}
          style={{
            flex: 1,
            padding: "5px",
            marginRight: "10px",
          }}
        />
        ) : (
          <span style={{ flex: 1 }}>{user[field]}</span>)}
                {editableField === field ? (
                  <>
                    <button onClick={handleSaveClick} style={{marginRight: "15px"}}>Enregistrer</button>
                    <button onClick={handleCancelClick}>Annuler</button>
                  </>
                ) : (
                  <FaPen
                    className="edit-icon"
                    onClick={() => setEditableField(field)}
                  />
                )}
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

      <br/>

      <div className="row justify-content-center mt-4">
    <div className="col-auto">
    <button type="submit" className="btn  me-6" style={{ backgroundColor: '#D97706' }} onMouseEnter={(e) => (e.target.style.backgroundColor = '#b45309')} onMouseLeave={(e) => (e.target.style.backgroundColor = '#D97706')} onClick={handleLogout}>Se déconnecter</button>
    <button type="submit" className="btn  " style={{ backgroundColor: '#D97706' }} onMouseEnter={(e) => (e.target.style.backgroundColor = '#b45309')} onMouseLeave={(e) => (e.target.style.backgroundColor = '#D97706')} onClick={handleAccountDeletion}>Supprimer le compte</button>
    </div>
  </div>

    </div>
  );
};



export default Profile;