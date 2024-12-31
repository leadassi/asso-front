// MainPage.jsx
import React from "react";
import { NavLink } from "react-router-dom";

function MainPage() {
  return (
    <header>
      <h1>Section Livraison</h1>
      <nav>
        <NavLink to="/" className="nav-link">Nous</NavLink>
        <NavLink to="/livraisons" className="nav-link">Livraisons</NavLink>
        <NavLink to="/validation" className="nav-link">Validation</NavLink>
      </nav>
    </header>
  );
}

export default MainPage;