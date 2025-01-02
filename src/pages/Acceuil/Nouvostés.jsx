import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Nouveautés.css";

const Nouveaute = () => {
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
  const handleBack = () => {
    navigate(-1); // Retourne à la page précédente
  };

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

      const updatedFavorites = isFavorite
        ? prevFavorites.filter((fav) => fav.id !== product.id)
        : [...prevFavorites, product];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const fetchProduits = async () => {
    try {
      const response = await fetch(
        "http://192.168.107.239:8080/produitService/getAllProduits",
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const produitsData = await response.json();
      localStorage.setItem("produits", JSON.stringify(produitsData));
      setProduitsAPI(produitsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };

  useEffect(() => {
    const produitsStockesLocal = JSON.parse(localStorage.getItem("produits")) || [];
    setProduitsStockes(produitsStockesLocal);
    fetchProduits();
  }, []);

  const sousCategories = ["pantalon", "sac", "jupe", "chaussure", "boissons"];
  const produitsAffiches = sousCategories.flatMap((sousCategorie) => {
    const produitsStockesParSousCategorie = produitsStockes
      .filter((product) => product.subCategory === sousCategorie)
      .slice(0, 2);
    const produitsAPIPartSousCategorie = produitsAPI
      .filter((product) => product.subCategory === sousCategorie)
      .slice(0, 2);

    return [...produitsStockesParSousCategorie, ...produitsAPIPartSousCategorie];
  });

  const productsPerPage = 8;
  const paginatedProducts = produitsAffiches.slice(
    currentPage * productsPerPage,
    currentPage * productsPerPage + productsPerPage
  );

  return (
    <div className="clothing-page">
      <section className="products" id="products">
         {/* Bouton de retour */}
      <button className="back-button" onClick={handleBack}>
        <i className="fas fa-arrow-left"></i> Retour
      </button>
        <h1 className="heading">
          <span>Vos Produits à des Prix Réduits</span>
        </h1>
        <div className="carousel-products-container">
          <div className="carousel-products">
            {paginatedProducts.map((product) => {
              const discountPrice = product.price * 0.9;
              return (
                <div className="box" key={product.title || product.id}>
                  <div className="discount-tag">-10%</div>
                  <div className="icons">
                    <button
                      className="icon-button fas fa-plus"
                      title="Voir les détails"
                      onClick={() =>
                        navigate("/description", { state: { product } })
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
                      title="Voir l'image"
                      onClick={() =>
                        openModal(product.img || product.imageUrl)
                      }
                    ></button>
                  </div>

                  <img
                    src={product.img || product.imageUrl || "placeholder.jpeg"}
                    alt={product.title || product.name || "Produit"}
                  />

                  <div className="content">
                    <h3>{product.title || product.name || "Produit sans nom"}</h3>
                    <div className="price-1">
                      <span className="original-price">{product.price} FCFA</span>
                      <span className="discount-price">{discountPrice.toFixed(2)} FCFA</span>
                    </div>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fa-star ${
                            i < product.rating ? "fas" : "far"
                          }`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="carousel-bar">
          {Array.from(
            { length: Math.ceil(produitsAffiches.length / productsPerPage) },
            (_, i) => (
              <div
                key={i}
                className={`carousel-dot ${currentPage === i ? "active" : ""}`}
                onClick={() => setCurrentPage(i)}
              >
                {i + 1}
              </div>
            )
          )}
        </div>
      </section>

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

export default Nouveaute;
