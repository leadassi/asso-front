// pages/Acceuil/Aliments.jsx
import React, { useState } from "react";
import NavbarCategories from "./NavbarCategories";
import "./Aliments.css";



const Aliments = () => {
  const [category, setCategory] = useState("Agro_Alimentaires");

  return (
    <div className="aliments-page">
      <NavbarCategories />
      {/* Navigation des catégories */}
      <div className="category-nav">
        {[
          "Produits Laitiers",
          "Agro Aliementaires",
          "Séréale",
          "Produits Vrivrier", 
          "Cultures Camerounaises",
        ].map((item) => (
          <button
            key={item}
            className={`category-btn ${category === item ? "active" : ""}`}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <h1>Aliments</h1>
      <p>Contenu de la page Aliments...</p>
    </div>
  );
};

export default Aliments;
