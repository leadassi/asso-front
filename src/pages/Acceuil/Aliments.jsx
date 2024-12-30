import React, { useState } from "react";
import NavbarCategories from "./NavbarCategories";
import { Link, /*useNavigate*/ } from "react-router-dom";
import "../../index.css";

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Fruits from "./categories/Fruits";
import Legumes from "./categories/Legumes";
import Feculents from "./categories/Feculents";
import Boissons from "./categories/Boissons";

const Aliments = () => {
  const [category, setCategory] = useState("Fruits");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  //const navigate = useNavigate();

 /* const openModal = (src) => {
    setModalImage(src);
    setIsModalOpen(true);
  };*/

  const closeModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="aliments-page">
      <NavbarCategories />
      <div className="spacer"></div>
      {/* Navigation des catégories */}
      <div className="category-nav">
        {[
          "Legumes",
          "Fruits",
          "Feculents",
          "Boissons",
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

      {/* Affichage des produits */}
      {category === "Fruits" && <Fruits />} {/* Dynamically render Fruits component based on selected category */}
      {category === "Legumes" && <Legumes />} {/* Dynamically render Legumes component based on selected category */}
      {category === "Feculents" && <Feculents/>}
      {category === "Boissons" && <Boissons/>}
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

      {/* Footer */}
      <footer className="footer py-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0)', borderTop: '1px solid #ddd' }}>
        <div className="container text-center">
          <Link
            to="/àproposdenous"
            className="text-decoration-none text-muted mb-2 d-block about-link"
          >
            About Us
          </Link>

          <div className="social-links d-flex justify-content-center mb-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="me-3 text-decoration-none"
              style={{ color: '#4267B2' }}
            >
              <FaFacebook size={24} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="me-3 text-decoration-none"
              style={{ color: '#1DA1F2' }}
            >
              <FaTwitter size={24} />
            </a>

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

export default Aliments;
