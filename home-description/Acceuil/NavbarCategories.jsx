import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavbarCategories.css";
import logo from "./logoappli.jpg"; // Importation du logo

const NavbarCategories = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    const category = e.target.category.value;
    navigate(`/search?query=${searchQuery}&category=${category}`);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-categories">
      <div className="navbar-container">
        {/* Logo remplaçant AssoShop */}
        
          <img src={logo} alt="Logo" className="navbar-logo" />
        

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
            <span>Cosmetics</span>
          </li>
          <li
            onClick={() => navigate("/Clothing")}
            className={`nav-item ${isActive("/Clothing") ? "active" : ""}`}
          >
            <span>Clothing</span>
          </li>
          <li
            onClick={() => navigate("/aliments")}
            className={`nav-item ${isActive("/aliments") ? "active" : ""}`}
          >
            <span>Aliments</span>
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
          <i className="icon-button-1 fas fa-home" onClick={() => navigate("/acceuil")} title="Accueil"></i>
          <i className="icon-button-1 fas fa-shopping-cart" onClick={() => navigate("/cart")} title="Panier"></i>
          <i className="icon-button-1 fas fa-user" onClick={() => navigate("/profil")} title="Profil"></i>
        </div>
      </div>

      {/* Menu Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        <i className={`bx ${menuOpen ? "bx-x" : "bx-menu"}`}></i>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="dropdown-menu">
          <button onClick={() => navigate("/homme")} className="dropdown-item">
            Homme
          </button>
          <button onClick={() => navigate("/femme")} className="dropdown-item">
            Femme
          </button>
          <button onClick={() => navigate("/enfant")} className="dropdown-item">
            Enfant
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavbarCategories;
