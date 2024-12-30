// MesFavoris.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Favories.css';

const MesFavoris = () => {
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  // Charger les favoris depuis le localStorage lors du montage du composant
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    console.log("Favoris chargés depuis localStorage:", storedFavorites);
  }, []);

  // Fonction pour retirer un favori
  const toggleFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    console.log(`Retiré des favoris: ID ${id}`);
  };

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
              .map((image, index) => (
                <div className="box" key={image.id}>
                  <div className="icons">
                    <button
                      className="icon-button fas fa-plus"
                      title="Voir les détails"
                      onClick={() =>
                        navigate('/description', {
                          state: {
                            imageSrc: image.imageUrl,
                            name: image.name,
                            price: image.price,
                            rating: image.rating,
                            description: image.description,
                          },
                        })
                      }
                    ></button>
                    <button
                      className="icon-button fas fa-heart"
                      title="Retirer des favoris"
                      onClick={() => toggleFavorite(image.id)}
                      style={{
                        color: 'red',
                      }}
                    ></button>
                    <button
                      className="icon-button fas fa-eye"
                      title="Voir l'image"
                      onClick={() => window.open(image.imageUrl, '_blank')}
                    ></button>
                  </div>
                  <img src={image.imageUrl} alt={image.name} />
                  <div className="content">
                    <h3>{image.name}</h3>
                    <div className="price">{image.price} FCFA</div>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fa-star ${
                            i < image.rating ? 'fas' : 'far'
                          }`}
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
                  className={`carousel-dot ${
                    currentPage === i ? 'active' : ''
                  }`}
                  onClick={() => setCurrentPage(i)}
                >
                  {i + 1}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MesFavoris;
