import React, { useState, useEffect } from "react";
import { useNavigate, useLocation,Link } from "react-router-dom";
import "./NavbarCategories.css";
import logo from "./logoappli.jpg"; // Importation du logo
import { useTheme } from "../../ThemeContext";

const NavbarCategories = () => {
  const [notifications, setNotifications] = useState([]);
  const [isNotificationListVisible, setNotificationListVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const deleteNotification = (index) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((_, i) => i !== index)
    );
  };
  /*notification*/
     // Connexion WebSocket à Django Channels pour recevoir des notifications
     useEffect(() => {
      const socket = new WebSocket("ws://127.0.0.1:8000/ws/Gestion_Livraison.asgi/notifications/");
      socket.onopen = () => console.log("Connexion établie");
      socket.onmessage = (event) => console.log(event.data);
      
  
      socket.onopen = () => {
        console.log("Connexion WebSocket établie");
      };
  
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          data.message,
        ]);
      };
  
      socket.onclose = () => {
        console.log("Connexion WebSocket fermée");
      };
  
      return () => {
        socket.close();
      };
    }, []);
    const handleNotificationToggle = () => {
      setNotificationListVisible(!isNotificationListVisible);
    };
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("null");
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
    const products = localStorage.getItem('produits');
    const produits = JSON.parse(products);
    // Si une catégorie spécifique est choisie, redirige vers la page correspondante
    if (category !== "Tout" && category !== "null") {
      switch (category) {
        case "Clothing":
          handleNavigation("/Clothing");
          break;
        case "aliments":
          handleNavigation("/aliments");
          break;
        case "cosmetics":
          handleNavigation("/cosmetics");
          break;
        case "accessoires":
          handleNavigation("/accessoires");
          break;
        default:
          handleNavigation("/Acceuil");
      }
    } else if (searchQuery) {
      // Logique de recherche par sous-catégorie
      const matchedProducts = produits.filter((product) =>
        product.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      if (matchedProducts.length > 0) {
        console.log("Produits correspondants :", matchedProducts);
        // Redirigez vers une page de résultats si nécessaire
        const firstMatchedProduct = matchedProducts[0]; 
        if (firstMatchedProduct.category !== "Tout" && firstMatchedProduct.category !== "null") {
          switch (firstMatchedProduct.category) {
            case "vetement":
              handleNavigation("/Clothing");
              break;
            case "alimentaire":
              handleNavigation("/aliments");
              break;
            case "cosmetique":
              handleNavigation("/cosmetics");
              break;
            case "accessoire":
              handleNavigation("/accessoires");
              break;
            default:
              handleNavigation("/Acceuil");
          }
        }
      } else {
        console.log("Aucun produit trouvé pour cette recherche.");
      }
    } else {
      console.log("Veuillez entrer une recherche ou sélectionner une catégorie.");
    }
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

  function showNotification(message, type = "success") {
    const container = document.getElementById("notification-container");

    if (!container) return;

    const notification = document.createElement("div");
    notification.className = `notification1 ${type}`;
    notification.textContent = message;

    container.appendChild(notification);

    // Supprimer la notification après 5 secondes
    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => container.removeChild(notification), 0); // Attendre la fin de la transition
    }, 5000);
}


  const handleLogout = async () => {
    try {
        const csrfToken = await fetchCsrfToken();

        const username = "user"; 
        const password = "password123"; 
        const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

        const response = await fetch("http://localhost:9091/Utilisateurs/deconnexion", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
                Authorization: authHeader,
            },
        });

        if (response.ok) {
            // Déconnexion réussie
            showNotification("Déconnexion réussie !", "success");
            sessionStorage.removeItem("utilisateurId");
            sessionStorage.removeItem("utilisateurPrenom");
            sessionStorage.removeItem("utilisateurNom");
            
        } else {
            // Gérer les erreurs de déconnexion
            const errorData = await response.json();
            showNotification(`Erreur : ${errorData.message}`, "error");
        }
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
        showNotification("Une erreur est survenue. Veuillez réessayer.", "error");
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
            onClick={() => navigate("/accessoires")}
            className={`nav-item ${isActive("/accessoires") ? "active" : ""}`}
          >
            <span>Accessoires</span>
          </li>
        </ul>

        {/* Search Bar */}
        {/*<form className="search-form" onSubmit={handleSearch}>
          <input
            type="search"
            name="search"
            placeholder="Search"
            //required
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
        </form>*/}

<form className="search-form" onSubmit={handleSearch}>
          <input
            type="search"
            name="search"
            placeholder="Search"
            //required
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="search-category-container">
            <select
              id="category"
              name="category"
              className="search-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
                  <div className="notification-icon" onClick={handleNotificationToggle}>
                    <i className="fas fa-bell"></i>
                    {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
                  </div>
                </div>
                {isNotificationListVisible && (
                <div className="notification-list">
                  <ul>
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <li key={index}>
                          {notification}
                          <button
                            className="delete-btn"
                            onClick={() => deleteNotification(index)}
                          >
                            Supprimer
                          </button>
                        </li>
                      ))
                    ) : (
                      <li>Aucune notification</li>
                    )}
                  </ul>
                </div>
              )}
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
        <div id="notification-container" style={{ position: "fixed", top: "40px", right: "10px", zIndex: 1000 }}></div>
      </div>
    </nav>
  );
};

export default NavbarCategories;
