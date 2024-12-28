// pages/Acceuil/Accessoires.jsx
import React, { useState } from "react";
import NavbarCategories from "./NavbarCategories";
import "./Aliments.css";
import "../../index.css";

import Sac from "./categories/Sac";
import Chaussures from "./categories/Chaussures";

const Accessoires = () => {
  const [category, setCategory] = useState("Sac");

  return (
    <div className="accessoires-page">
      <NavbarCategories />
      
      {/* Navigation des catégories */}
      <div className="category-nav">
        {[
          "Sac",
          "Chaussures",
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

      {category === "Sac" && <Sac />}
      {category === "Chaussures" && <Chaussures />}

     
    </div>
  );
};

export default Accessoires;
