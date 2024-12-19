import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarCategories from "../Acceuil/NavbarCategories";
import data from "../data/data"; // Assure-toi que le chemin est correct
import "../Acceuil/Clothing.css";
import Chapeaux from "./categories/chapeaux"; 
import Vetements from "./categories/Vetements";
import Sacs from "./categories/Sacs"; 

const Clothing = () => {
  const [category, setCategory] = useState("Chaussures");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [ratings, setRatings] = useState({});
  const [minRating, setMinRating] = useState(0);
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");

  const navigate = useNavigate();

  const openModal = (src) => {
    setModalImage(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  const handleRating = (productName, rating) => {
    setRatings((prevRatings) => {
      const productRatings = prevRatings[productName] || [];
      productRatings.push(rating);
      return { ...prevRatings, [productName]: productRatings };
    });
  };

  const calculateAverageRating = (productName, initialRating) => {
    const productRatings = ratings[productName] || [];
    const total = productRatings.reduce((acc, rating) => acc + rating, 0);
    return productRatings.length > 0
      ? Math.round(total / productRatings.length)
      : Math.round(initialRating);
  };

  const filterByCriteria = (product) => {
    const match = {
      category: category === "Chaussures" || product.category === category,
      rating: calculateAverageRating(product.title, product.rating) >= minRating,
      color: selectedColor === "all" || product.color === selectedColor,
      price:
        selectedPrice === "all" ||
        {
          "1000-3000": product.price >= 1000 && product.price <= 3000,
          "4000-7000": product.price >= 4000 && product.price <= 7000,
          "8000-10000": product.price >= 8000 && product.price <= 10000,
          "10000+": product.price > 10000,
        }[selectedPrice],
      size:
        selectedSize === "all" ||
        {
          "20-30": product.size >= 20 && product.size <= 30,
          "31-40": product.size >= 31 && product.size <= 40,
          "41-50": product.size >= 41 && product.size <= 50,
        }[selectedSize],
    };
    return Object.values(match).every(Boolean);
  };

  const filteredProducts = data.filter(filterByCriteria);

  return (
    <div className="clothing-page">
      <NavbarCategories />

      {/* Navigation des catégories */}
      <div className="category-nav">
        {[
          "Vetements",
          "Chaussures",
          "Sacs",
          "Chapeaux", // Ajout de Chapeaux ici
          "Electronics",
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

      {/* Affichage des filtres uniquement pour la catégorie Chaussures */}
      {category === "Chaussures" && (
        <div className="filters">
          <details className="filter-dropdown">
            <summary>Filtrer les produits</summary>
            <div className="filter-content">
              <div className="filter-group">
                <label>Notes :</label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(parseInt(e.target.value))}
                >
                  <option value={0}>Tout afficher</option>
                  <option value={1}>1 étoile et plus</option>
                  <option value={2}>2 étoiles et plus</option>
                  <option value={3}>3 étoiles et plus</option>
                  <option value={4}>4 étoiles et plus</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Couleur :</label>
                <div className="color-filters">
                  {["all", "rouge", "vert", "jaune", "noir", "blanc"].map(
                    (color) => (
                      <button
                        key={color}
                        className={`color-circle ${
                          selectedColor === color ? "active" : ""
                        }`}
                        style={{
                          background:
                            color === "all"
                              ? "linear-gradient(to right, red, green, yellow, black, white)" // Dégradé pour "all"
                              : color === "rouge"
                              ? "radial-gradient(circle, #ff4d4d, #cc0000)" // Dégradé pour rouge
                              : color === "vert"
                              ? "radial-gradient(circle, #80ff80, #009933)" // Dégradé pour vert
                              : color === "jaune"
                              ? "radial-gradient(circle, #ffff80, #e6b800)" // Dégradé pour jaune
                              : color === "noir"
                              ? "radial-gradient(circle, #555555, #000000)" // Dégradé pour noir
                              : color === "blanc"
                              ? "radial-gradient(circle, #ffffff, #f2f2f2)" // Dégradé pour blanc
                              : color, // Couleur par défaut
                        }}
                        onClick={() => setSelectedColor(color)}
                      ></button>
                    )
                  )}
                </div>
              </div>

              <div className="filter-group">
                <label>Prix :</label>
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                >
                  <option value="all">Tout</option>
                  <option value="1000-3000">1000-3000 FCFA</option>
                  <option value="4000-7000">4000-7000 FCFA</option>
                  <option value="8000-10000">8000-10000 FCFA</option>
                  <option value="10000+">10000+ FCFA</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Taille :</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="all">Tout</option>
                  <option value="20-30">20-30</option>
                  <option value="31-40">31-40</option>
                  <option value="41-50">41-50</option>
                </select>
              </div>
            </div>
          </details>
        </div>
      )}

      {/* Affichage des produits pour la catégorie "Chapeaux" */}
      {category === "Chapeaux" ? (
        <Chapeaux /> // Affichage du composant Chapeaux
      ) :category === "Vetements" ? (
        <Vetements /> // Affichage du composant Vetements
      ) : category === "Sacs" ? (
        <Sacs /> // Affichage du composant sacs
      ) : (
        <div className="category-content">
          <h2>Produits disponibles</h2>
          {filteredProducts.length > 0 ? (
            <div className="products-container">
              {filteredProducts.map((product, index) => (
                <div className="product-card" key={index}>
                  <div className="icons">
                    <button
                      className="icon-button fas fa-plus"
                      title="Voir les détails"
                      onClick={() =>
                        navigate("/description", { state: { ...product } })
                      }
                    ></button>
                    <Link to="#" className="icon-button fas fa-heart"></Link>
                    <button
                      className="icon-button fas fa-eye"
                      onClick={() => openModal(product.img)}
                    ></button>
                  </div>
                  <img
                    src={product.img || "placeholder.jpg"}
                    alt={product.title || "Produit"}
                  />
                  <div className="content">
                    <h3>{product.title}</h3>
                    <div className="price">{product.price} FCFA</div>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fa-star ${
                            i < calculateAverageRating(product.title, product.rating)
                              ? "fas"
                              : "far"
                          }`}
                          onClick={() => handleRating(product.title, i + 1)}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucun produit trouvé.</p>
          )}
        </div>
      )}

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
    </div>
  );
};

export default Clothing;
