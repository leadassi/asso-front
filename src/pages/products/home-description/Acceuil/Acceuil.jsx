import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Acceuil.css";
import "./Products.css";

const Accueil = () => {
  const imageCount = 10;
  const images = Array.from(
    { length: imageCount },
    (_, i) => `${process.env.PUBLIC_URL}/images/${i + 1}.jpeg`
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const navigate = useNavigate();

  // Change l'image toutes les 6 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  const galleryImages = [
    { name: "Veste", src: `${process.env.PUBLIC_URL}/image/1.jpeg`, rating: 4, price: 15000, description: "Une veste élégante et confortable, parfaite pour les occasions formelles ou décontractées." },
    { name: "Chemise", src: `${process.env.PUBLIC_URL}/image/3.jpeg`, rating: 5, price: 9999, description: "Chemise en coton de haute qualité, idéale pour les journées de travail ou les sorties." },
    { name: "Tshirt", src: `${process.env.PUBLIC_URL}/image/10.jpeg`, rating: 3, price: 11000, description: "Un t-shirt décontracté pour un confort optimal, parfait pour l'été." },
    { name: "Manteau", src: `${process.env.PUBLIC_URL}/vetements/6.jpg`, rating: 2, price: 4000, description: "Manteau idéal pour l'hiver vous maintient au chaud et protège contre le froid." },
    { name: "Sac", src: `${process.env.PUBLIC_URL}/image/3.jpg`, rating: 4, price: 5000, description: "Sac élégant et spacieux pour transporter vos essentiels avec style." },
    { name: "Tricot", src: `${process.env.PUBLIC_URL}/image/a3.png`, rating: 4, price: 5000, description: "Tricot doux et chaud, parfait pour les journées fraîches." },
    { name: "Bonnet", src: `${process.env.PUBLIC_URL}/image/4.jpg`, rating: 4, price: 1000, description: "Un bonnet confortable et élégant pour compléter votre tenue d'hiver." },
    { name: "Talon", src: `${process.env.PUBLIC_URL}/image/w1.png`, rating: 4, price: 7000, description: "Chaussures à talons élégantes pour des occasions spéciales." },
    { name: "Sandale", src: `${process.env.PUBLIC_URL}/image/w2.png`, rating: 3, price: 4000, description: "Sandales légères et confortables pour l'été." },
    { name: "Parfum", src: `${process.env.PUBLIC_URL}/image/c.jpg`, rating: 4, price: 4000, description: "Parfum raffiné pour une touche de sophistication au quotidien." },
    { name: "Chapeau traditionnel", src: `${process.env.PUBLIC_URL}/image/p.jpg`, rating: 4, price: 4000, description: "Un chapeau traditionnel unique pour les amateurs de culture." },
    { name: "Chaussures", src: `${process.env.PUBLIC_URL}/chaussures/mw3.png`, rating: 3, price: 7000, description: "Meilleur choix pour vos sorties." },
  ];

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage("");
    setIsModalOpen(false);
  };

  return (
    <div className="accueil-page">
      <Navbar />
      <div className="spacer"></div>
    
      {/* Carrousel 3D */}
      <div className="carousel-container">
        <div className="carousel-center">
          {/* Carrousel */}
          <div className="carousel-3d">
            {images.map((image, index) => {
              const angle = (360 / images.length) * index;
              const isActive = index === currentIndex;
              return (
                <div
                  key={index}
                  className={`carousel-item ${isActive ? "active" : ""}`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(500px)`,
                  }}
                >
                  <img
                    src={image}
                    alt={`Carrousel ${index + 1}`}
                    className="carousel-image"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>


      {/* Navigation */}
      <div className="navbar-categories-i">
        <Link to="/" className="nav-item all">All</Link>
        <Link to="/cosmetics" className="nav-item cosmetics">Cosmetics</Link>
        <Link to="/Clothing" className="nav-item dresses">Clothing</Link>
        <Link to="/aliments" className="nav-item aliments">Aliments</Link>
      </div>

      {/* Section Produits */}
      <section className="products" id="products">
        <h1 className="heading">products <span>Top Rated</span></h1>
        <div className="box-container">
          {galleryImages.map((image, index) => (
            <div className="box" key={index}>
              <div className="icons">
                <button
                  className="icon-button fas fa-plus"
                  title="View Details"
                  onClick={() =>
                    navigate('/description', {
                      state: {
                        imageSrc: image.src,
                        name: image.name,
                        price: image.price,
                        rating: image.rating,
                        description: image.description,
                      },
                    })
                  }
                ></button>
                <Link to="#" className="icon-button fas fa-heart" title="Add to Favorites"></Link>
                <button className="icon-button fas fa-eye" title="View Image" onClick={() => openModal(image.src)}></button>
              </div>
              <img src={image.src} alt={image.name} />
              <div className="content">
                <h3>{image.name}</h3>
                <div className="price">{image.price} FCFA</div>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa-heart ${i < image.rating ? "fas" : "far"}`}></i>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && modalImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>&times;</button>
            <img src={modalImage} alt="Zoom" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Accueil;
