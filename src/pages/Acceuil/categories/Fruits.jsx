/*port React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarCategories from "../NavbarCategories";
import "../Clothing.css";
import data from "./fruits";

const Fruits = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    // Charger les favoris depuis le localStorage ou une liste vide si pas de favoris enregistrés
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log("Favoris chargés depuis localStorage:", storedFavorites); // Débogage
    return storedFavorites;
  });

  const navigate = useNavigate();

  const openModal = (src) => {
    setModalImage(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  // Fonction pour gérer les favoris avec stockage local
  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === product.id);

      if (isFavorite) {
        // Retirer le produit des favoris
        const updatedFavorites = prevFavorites.filter((fav) => fav.id !== product.id);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        console.log(`Retiré des favoris: ${product.title} (ID: ${product.id})`);
        return updatedFavorites;
      } else {
        // Ajouter le produit aux favoris
        const updatedFavorites = [...prevFavorites, product];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        console.log(`Ajouté aux favoris: ${product.title} (ID: ${product.id})`);
        return updatedFavorites;
      }
    });
  };

  // Charger les favoris depuis le localStorage au chargement de la page
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    console.log("Favoris chargés depuis localStorage:", storedFavorites);
  }, []);

  return (
    <div className="clothing-page">
      <NavbarCategories />

      /* Affichage des produits 
      <div className="category-content">
        <h2>Fruits disponibles</h2>
        {data.length > 0 ? (
          <div className="products-container">
            {data.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="icons">
                  <button
                    className="icon-button fas fa-plus"
                    title="Voir les détails"
                    onClick={() =>
                      navigate("/description", { state: { ...product } })
                    }
                  ></button>
                  <button
                    className="icon-button fas fa-heart"
                    title="Ajouter aux favoris"
                    onClick={() => toggleFavorite(product)}
                    style={{
                      color: favorites.some((fav) => fav.id === product.id)
                        ? "red"
                        : "black",
                    }}
                  ></button>
                  <button
                    className="icon-button fas fa-eye"
                    onClick={() => openModal(product.img)}
                  ></button>
                </div>
                <img
                  src={product.img || "placeholder.jpeg"}
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
                          i < product.rating ? 'fas' : 'far'
                        }`}
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

      {/* Modal 
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

export default Fruits;
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarCategories from "../NavbarCategories";
import "../Clothing.css";
import data from "./fruits";

const Fruits = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return storedFavorites;
  });
  const [produitsStockes, setProduitsStockes] = useState([]);
  const [produitsAPI, setProduitsAPI] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  const openModal = (src) => {
    setModalImage(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === product.id);

      if (isFavorite) {
        const updatedFavorites = prevFavorites.filter((fav) => fav.id !== product.id);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      } else {
        const updatedFavorites = [...prevFavorites, product];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      }
    });
  };

  const fetchProduits = async () => {
    try {
      const response = await fetch('http://192.168.107.239:8080/produitService/getAllProduits', {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      const produitsData = await response.json();
      localStorage.setItem('produits', JSON.stringify(produitsData));
      setProduitsAPI(produitsData);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
  };

  useEffect(() => {
    const produitsStockesLocal = JSON.parse(localStorage.getItem("produits")) || [];
    setProduitsStockes(produitsStockesLocal);
    fetchProduits();
  }, []);

  const produitsAffiches = [
    ...data.filter((product) => product.category === "fruits"),
    ...produitsStockes.filter((product) => product.category === "fruits"),
    ...produitsAPI.filter((product) => product.subCategory === "fruits"),
  ];

  return (
    <div className="clothing-page">
      <NavbarCategories />

      {/* Products Section */}
      <section className="products" id="products">
        <h1 className="heading">
          <span>Nos Produits</span>
        </h1>
        <div className="carousel-products-container">
          <div className="carousel-products">
            {produitsAffiches
              .slice(currentPage * 8, currentPage * 8 + 8) // 8 images par page
              .map((product, index) => (
                <div className="box" key={product.id}>
                  <div className="icons">
                    <button
                      className="icon-button fas fa-plus"
                      title="Voir les détails"
                      onClick={() =>
                        navigate('/description', {
                          state: { product }
                        })
                      }
                    ></button>
                    <button
                      className="icon-button fas fa-heart"
                      title="Ajouter aux favoris"
                      onClick={() => toggleFavorite(product)}
                      style={{
                        color: favorites.some((fav) => fav.id === product.id) ? 'red' : 'black',
                      }}
                    ></button>
                    <button
                      className="icon-button fas fa-eye"
                      title="Voir l'image"
                      onClick={() => openModal(product.imageUrl)}
                    ></button>
                  </div>
                  <img
                    src={product.imageUrl || "placeholder.jpeg"}
                    alt={product.name || "Produit"}
                  />
                  <div className="content">
                    <h3>{product.name}</h3>
                    <div className="price">{product.price} FCFA</div>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fa-star ${
                            i < product.rating ? 'fas' : 'far'
                          }`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="carousel-bar">
          {Array.from(
            { length: Math.ceil(produitsAffiches.length / 8) },
            (_, i) => (
              <div
                key={i}
                className={`carousel-dot ${currentPage === i ? 'active' : ''}`}
                onClick={() => setCurrentPage(i)}
              >
                {i + 1}
              </div>
            )
          )}
        </div>
      </section>

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

export default Fruits;
