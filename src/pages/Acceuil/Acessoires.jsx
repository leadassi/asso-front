// pages/Acceuil/Cosmetics.jsx
import React, { useState } from "react";
import "./Accessoires.css"
import { Link } from "react-router-dom";
import '../../index.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Sac from "./categories/Sac";
import Chaussures from "./categories/Chaussures";

const Accessoires = () => {
  const [category, setCategory] = useState("Sac");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const closeModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };
  return (
    <div className="cosmetics-page">
      {/* Navigation des catégories */}
      <div className="spacer"></div>
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
      {/* Modal */}
      {isModalOpen && modalImage && (
        <div className="modal open" onClick={closeModal}>
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <img src={modalImage} alt="Zoom" />
          </div>
        </div>
      )}
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
            style={{ color: '#4267B2' }}
          >
            <FaFacebook size={24} />
          </a>

          {/* Lien vers Twitter */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="me-3 text-decoration-none"
            style={{ color: '#1DA1F2' }}
          >
            <FaTwitter size={24} />
          </a>

          {/* Lien vers Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
            style={{ color: '#E4405F' }}
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

