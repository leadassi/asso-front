import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavbarCategories.css";
import logo from "./logoappli.jpg"; // Importation du logo
import { useTheme } from "../../ThemeContext";

const NavbarCategories = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    const category = e.target.category.value;
    navigate(`/search?query=${searchQuery}&category=${category}`);
  };

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

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-categories">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo-container" onClick={() => navigate("/acceuil")}>
          <img src={logo} alt="Logo" className="navbar-logo" />
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li
            onClick={() => navigate("/acceuil")}
            className={`nav-item ${isActive("/acceuil") ? "active" : ""}`}
          >
            <span>All</span>
          </li>
          <li
            onClick={() => navigate("/cosmetics")}
            className={`nav-item ${isActive("/cosmetics") ? "active" : ""}`}
          >
            <span>Cosmetiques</span>
          </li>
          <li
            onClick={() => navigate("/Clothing")}
            className={`nav-item ${isActive("/Clothing") ? "active" : ""}`}
          >
            <span>Vestimentaires</span>
          </li>
          <li
            onClick={() => navigate("/aliments")}
            className={`nav-item ${isActive("/aliments") ? "active" : ""}`}
          >
            <span>Aliments</span>
          </li>
          <li
            onClick={() => navigate("/accessoirees")}
            className={`nav-item ${isActive("/accessoires") ? "active" : ""}`}
          >
            <span>Accessoires</span>
          </li>
        </ul>

        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="search"
            name="search"
            placeholder="Search"
            required
            className="search-input"
          />
          <div className="search-category-container">
            <select
              id="category"
              name="category"
              className="search-category"
              defaultValue="null"
            >
              <option value="null">Tout</option>
              <option value="Clothing">Vetements</option>
              <option value="aliments">Aliments</option>
              <option value="cosmetics">Cosmetiques</option>
              <option value="accessoires">Accessoires</option>
            </select>
          </div>
          <button type="submit" className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </form>

        {/* Icônes de navigation */}
        <div className="icon-container-1">
          <i
            className="icon-button-1 fas fa-home"
            onClick={() => navigate("/acceuil")}
            title="Accueil"
          ></i>
          <i
            className="icon-button-1 fas fa-shopping-cart"
            onClick={() => navigate("/cart")}
            title="Panier"
          ></i>
          <i
            className="icon-button-1 fas fa-user"
            onClick={() => navigate("/profil")}
            title="Profil"
          ></i>
        </div>

        {/* Menu Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        <i className={`bx ${menuOpen ? "bx-x" : "bx-menu"}`}></i>
      </div>
      </div>

      {/* Dropdown Menu */}
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
            {/* Modification ici : on ajoute l'appel à handleNavigation */}
            <li onClick={() => handleNavigation('/mesfavoris')}>Mes Favoris</li>
            <li>Dernières Nouveautés</li>
          </ul>
        </div>
        <hr className="dropdown-separator" />

        {/* Bloc 3: Aide et paramètres */}
        <div className="dropdown-section">
          <h3 className="dropdown-title">Aide et paramètres</h3>
          <ul className="dropdown-list">
          <li onClick={() => handleNavigation("/form_fournisseur")}>Voulez vous vendre?</li>
            <li onClick={() => handleNavigation("/profil")}>Votre compte</li>
            <li>Français</li>
            <li>
            <button onClick={toggleTheme}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Gray Mode"}
      </button>
            </li>
            <li>
              <i className="icon-button-1 bx bxs-map"></i>Cameroun
            </li>
            <li onClick={() => handleNavigation("/service-client")}>Service client</li>
            <li onClick={() => handleNavigation("/connection")}>Se connecter</li>
          <li onClick={handleLogout}>
          Se déconnecter</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarCategories;
