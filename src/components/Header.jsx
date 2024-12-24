import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import logo from "./logoappli.jpg";
import { useTheme } from "../ThemeContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  const navigate = useNavigate();

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
 

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <img src={logo} alt="Logo" className="navbar-logo" />

        {/* Icône Service Client */}
        <div className="service-client-container">
          <Link to="/service-client" className="service-client-link">
            <img
              src={`${process.env.PUBLIC_URL}/serv-4.png`}
              alt="Service Client"
              className="service-client-icon"
            />
          </Link>
          <div className="service-client-tooltip">Service Client</div>
        </div>

        {/* Icônes de navigation */}
        <div className="icon-container-1">
          <Link
            to="/Acceuil"
            className="icon-button-1 fas fa-home"
            title="Accueil"
          ></Link>
          <Link
            to="/cart"
            className="icon-button-1 fas fa-shopping-cart"
            title="Panier"
          ></Link>
          <Link
            to="/profil"
            className="icon-button-1 fas fa-user"
            title="Profil"
          ></Link>
        </div>

        {/* Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={`bx ${menuOpen ? "bx-x" : "bx-menu"}`}></i>
        </div>
      </div>

      {/* Menu déroulant structuré */}
      <div className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
        {/* Bloc 1: Accueil */}
        <div className="dropdown-section welcome-section">
          <div className="welcome-title">
            <i className="icon-button-1 bx bxs-user-circle"></i>
            <span>Bonjour</span>
          </div>
        </div>
        <hr className="dropdown-separator" />

        {/* Bloc 2: Tendances */}
        <div className="dropdown-section">
          <h3 className="dropdown-title">Mes Produits</h3>
          <ul className="dropdown-list">
            <li>Mes Favoris</li>
            <li>Dernières Nouveautés</li>
          </ul>
        </div>
        <hr className="dropdown-separator" />

        {/* Bloc 3: Aide et paramètres */}
        <div className="dropdown-section">
          <h3 className="dropdown-title">Aide et paramètres</h3>
          <ul className="dropdown-list">
          <li><Link
            to="/form_fournisseur"
          >Voulez vous vendre?</Link></li>
            <li><Link
            to="/profil"
          >Votre compte</Link></li>
            <li>Français</li>
            <li>
            <button onClick={toggleTheme}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Gray Mode"}
      </button>
            </li>
            <li>
              <i className="icon-button-1 bx bxs-map"></i>Cameroun
            </li>
            <li><Link to="/service-client" className="service-client-link">Service client</Link></li>
            <li><Link
            to="/connection"
          >Se connecter</Link></li>
          <li onClick={handleLogout}>
          Se déconnecter</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;