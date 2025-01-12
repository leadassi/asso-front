import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Favories.css';

const MesFavoris = () => {
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage("");
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
        console.log(`Retiré des favoris: ${product.name} (ID: ${product.id})`);
        return updatedFavorites;
      }
      return prevFavorites;
    });
  };

  // Charger les favoris depuis le localStorage au chargement de la page
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    console.log("Favoris chargés depuis localStorage:", storedFavorites);
  }, []);

  // Vérification des données
  if (!favorites || !Array.isArray(favorites)) {
    return <div>Chargement des favoris...</div>;
  }

  return (
    <section className="products" id="mes-favoris">
      <h1 className="heading">
        <span>Mes Favoris</span>
      </h1>
      <div className="carousel-products-container">
        <div className="carousel-products">
          {favorites.length === 0 ? (
            <p>Aucun favori trouvé.</p>
          ) : (
            favorites
              .slice(currentPage * 4, currentPage * 4 + 4) // 4 images par page
              .map((product) => (
                <div className="box" key={product.id}>
                  <div className="icons">
                    <button
                      className="icon-button fas fa-plus"
                      title="Voir les détails"
                      onClick={() => navigate('/description', { state: { product } })}
                    ></button>
                    <button
                      className="icon-button fas fa-heart"
                      title="Retirer des favoris"
                      onClick={() => toggleFavorite(product)}
                      style={{
                        color: 'red',
                      }}
                    ></button>
                   <button
                    className="icon-button fas fa-eye"
                    title="Voir l'image"
                    onClick={() => openModal(product.img || product.imageUrl)}
                  ></button>
                  </div>
                  <img src={product.imageUrl} alt={product.name} />
                  <div className="content">
                    <h3>{product.name}</h3>
                    <div className="price">{product.price} FCFA</div>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fa-star ${i < product.rating ? 'fas' : 'far'}`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Pagination */}
        {favorites.length > 4 && (
          <div className="carousel-bar">
            {Array.from(
              { length: Math.ceil(favorites.length / 4) },
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
        )}
      </div>
      {/* Image Modal */}
      {isModalOpen && modalImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>&times;</button>
            <img src={modalImage} alt="Zoom" className="modal-image" />
          </div>
        </div>
      )}
    </section>
  );
};

export default MesFavoris;
