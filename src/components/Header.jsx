import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
          <h3 className="dropdown-title">Tendances</h3>
          <ul className="dropdown-list">
            <li>Meilleures ventes</li>
            <li>Dernières Nouveautés</li>
            <li>Baromètre des ventes</li>
          </ul>
        </div>
        <hr className="dropdown-separator" />

        {/* Bloc 3: Aide et paramètres */}
        <div className="dropdown-section">
          <h3 className="dropdown-title">Aide et paramètres</h3>
          <ul className="dropdown-list">
            <li>Votre compte</li>
            <li>Français</li>
            <li>
            <button onClick={toggleTheme}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Gray Mode"}
      </button>
            </li>
            <li>
              <i className="icon-button-1 bx bxs-map"></i>Cameroun
            </li>
            <li>Service client</li>
            <li>Se connecter</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;