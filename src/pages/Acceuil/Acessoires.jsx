// pages/Acceuil/Accessoires.jsx
import React, { useState } from "react";
import NavbarCategories from "./NavbarCategories";
import { Link } from "react-router-dom";
import "./Aliments.css";
import "../../index.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
/*import Sac from "./categories/Sac";
import Habit from "./categories/Habit";*/

const Accessoires = () => {
  const [category, setCategory] = useState("Sac");

  return (
    <div className="accessoires-page">
      <NavbarCategories />
      
      {/* Navigation des catégories */}
      <div className="category-nav">
        {[
          "Sac",
          "Habit",
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

      {/*{category === "Sac" && <Sac />}
      {category === "Habit" && <Habit />*/}

      <footer className="footer py-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0)', borderTop: '1px solid #ddd' }}>
        <div className="container text-center">
          <Link
            to="/àproposdenous"
            className="text-decoration-none text-muted mb-2 d-block about-link"
          >
            About Us
          </Link>

          <div className="social-links d-flex justify-content-center mb-2">
            {/* Lien vers Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="me-3 text-decoration-none"
              style={{ color: "#4267B2" }}
            >
              <FaFacebook size={24} />
            </a>

            {/* Lien vers Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="me-3 text-decoration-none"
              style={{ color: "#1DA1F2" }}
            >
              <FaTwitter size={24} />
            </a>

            {/* Lien vers Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
              style={{ color: "#E4405F" }}
            >
              <FaInstagram size={24} />
            </a>
          </div>

          <p className="text-muted small mb-0">© 2024 Mon Application. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Accessoires;
