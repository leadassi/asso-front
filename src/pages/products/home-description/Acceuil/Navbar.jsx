import React, { useState } from "react";
import { Link,} from "react-router-dom";
import "./Navbar.css";
import logo from "./logoappli.jpg";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <img src={logo} alt="Logo" className="navbar-logo" />

        {/* Barre de recherche */}
        <form className="search-form">
          <input
            type="search"
            name="search"
            placeholder="Search"
            required
            className="search-input"
          />
          <div className="search-category-container">
            <select id="category" name="category" className="search-category">
              <option value="null">All categories</option>
              <option value="Clothing">Clothing</option>
              <option value="aliments">Aliments</option>
              <option value="cosmetics">Cosmetics</option>
            </select>
          </div>
          <button type="submit" className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </form>

        {/* Icônes de navigation */}
        <div className="icon-container-1">
          <Link to="/Acceuil" className="icon-button-1 fas fa-home" title="Accueil"></Link>
          <Link to="/cart" className="icon-button-1 fas fa-shopping-cart" title="Panier"></Link>
          <Link to="/profil" className="icon-button-1 fas fa-user" title="Profil"></Link>
        </div>

        {/* Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={`bx ${menuOpen ? "bx-x" : "bx-menu"}`}></i>
        </div>
      </div>

      {/* Menu déroulant structuré */}
      {menuOpen && (
        <div className="dropdown-menu">
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
              <li><i className="icon-button-1 bx bxs-map"></i>Cameroun</li>
              <li>Service client</li>
              <li>Se connecter</li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
