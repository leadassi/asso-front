import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarCategories from "../NavbarCategories";
import "../Clothing.css";
import vetements from "./vetement";  // Import du fichier vetements.js

const Vetements = () => {
  const [category] = useState("Vetements");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [ratings, setRatings] = useState({});
  const [minRating, setMinRating] = useState(0);
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
      category: selectedCategory === "all" || product.category === selectedCategory,
      rating: calculateAverageRating(product.title, product.rating) >= minRating,
      color: selectedColor === "all" || product.color === selectedColor,
      price:
        selectedPrice === "all" ||
        {
          "100-300": product.price >= 100 && product.price <= 300,
          "400-700": product.price >= 400 && product.price <= 700,
          "800-1000": product.price >= 800 && product.price <= 1000,
          "1000+": product.price > 1000,
        }[selectedPrice],
    };
    return Object.values(match).every(Boolean);
  };

  const filteredProducts = vetements.filter(filterByCriteria);

  return (
    <div className="clothing-page">
      <NavbarCategories />

      {/* Affichage des filtres uniquement pour la catégorie Vetements */}
      {category === "Vetements" && (
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
                  {["all", "rouge", "vert", "jaune", "noir", "blanc","gris"].map(
                    (color) => (
                      <button
                        key={color}
                        className={`color-circle ${
                          selectedColor === color ? "active" : ""
                        }`}
                        style={{
                          background:
                            color === "all"
                              ? "linear-gradient(to right, red, green, yellow, black, white)"
                              : color === "rouge"
                              ? "radial-gradient(circle, #ff4d4d, #cc0000)"
                              : color === "vert"
                              ? "radial-gradient(circle, #80ff80, #009933)"
                              : color === "jaune"
                              ? "radial-gradient(circle, #ffff80, #e6b800)"
                              : color === "noir"
                              ? "radial-gradient(circle, #555555, #000000)"
                              : color === "blanc"
                              ? "radial-gradient(circle, #ffffff, #f2f2f2)"
                              : color === "gris"
                              ? "radial-gradient(circle, #534b4b, #5e5757)"
                              : color,
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
                  <option value="100-300">100-300 FCFA</option>
                  <option value="400-700">400-700 FCFA</option>
                  <option value="800-1000">800-1000 FCFA</option>
                  <option value="1000+">1000+ FCFA</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Catégorie :</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">Toutes</option>
                  <option value="tshirt">T-shirt</option>
                  <option value="robe">Robe</option>
                  <option value="pull">Pull</option>
                  <option value="veste">Veste</option>
                  <option value="chemise">Chemise</option>
                  <option value="chemisette">Chemisette</option>
                </select>
              </div>
            </div>
          </details>
        </div>
      )}

      {/* Affichage des produits */}
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

export default Vetements;
