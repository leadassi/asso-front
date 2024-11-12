import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {


  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <header>
      <h1>Mon E-commerce</h1>
      <nav>
      <img src="../public/logoappli.jpg" alt="logo" />
        <Link to="/">Catalogue</Link>
        <Link to="/panier">Panier</Link>
        <Link to="/àproposdenous">About Us</Link>
        <div className="connexion-button">
        <button className="round-button" onClick={() => setMenuOpen(!menuOpen)}>
          <i className="fa-solid fa-user"></i>
        </button>
        {menuOpen && (
          <div className="menu-vertical">
            <ul>
              <li> <Link to="/profil">Mon Compte</Link></li>
              <li> <Link to="/LoginSupplier">comment etre un fournisseur?</Link></li>
              <li><Link to="/LoginUser">se connecter</Link></li>
              <li><Link to="/#">se déconnecter</Link></li>

            </ul>
          </div>
      )}
    </div>

      </nav>
    </header>
  );
}

export default Header;