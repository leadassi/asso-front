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
  /*const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);*/
  const [favorites, setFavorites] = useState([]);
  // État pour la page actuelle
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  // Change l'image toutes les 6 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Changement automatique toutes les 6 secondes
    return () => clearInterval(interval);
  }, [images.length]);

  const galleryImages = [
    { id: 1, name: "Veste", src: `${process.env.PUBLIC_URL}/image/1.jpeg`, rating: 4, price: 15000, description: "Une veste élégante et confortable, parfaite pour les occasions formelles ou décontractées." },
    { id: 2, name: "Chemise", src: `${process.env.PUBLIC_URL}/image/3.jpeg`, rating: 5, price: 9999, description: "Chemise en coton de haute qualité, idéale pour les journées de travail ou les sorties." },
    { id: 3, name: "Tshirt", src: `${process.env.PUBLIC_URL}/image/10.jpeg`, rating: 3, price: 11000, description: "Un t-shirt décontracté pour un confort optimal, parfait pour l'été." },
    { id: 4, name: "sac", src: `${process.env.PUBLIC_URL}/image/6.jpeg`, rating: 2, price: 4000, description: "Manteau idéal pour l'hiver vous maintient au chaud et protège contre le froid." },
    { id: 5, name: "Sac", src: `${process.env.PUBLIC_URL}/image/3.jpg`, rating: 4, price: 5000, description: "Sac élégant et spacieux pour transporter vos essentiels avec style." },
    { id: 6, name: "Tricot", src: `${process.env.PUBLIC_URL}/image/a3.png`, rating: 4, price: 5000, description: "Tricot doux et chaud, parfait pour les journées fraîches." },
    { id: 7, name: "Bonnet", src: `${process.env.PUBLIC_URL}/image/4.jpg`, rating: 4, price: 1000, description: "Un bonnet confortable et élégant pour compléter votre tenue d'hiver." },
    { id: 8, name: "Talon", src: `${process.env.PUBLIC_URL}/image/w1.png`, rating: 4, price: 7000, description: "Chaussures à talons élégantes pour des occasions spéciales." },
    { id: 9, name: "Sandale", src: `${process.env.PUBLIC_URL}/image/w2.png`, rating: 3, price: 4000, description: "Sandales légères et confortables pour l'été." },
    { id: 10, name: "Parfum", src: `${process.env.PUBLIC_URL}/image/c.jpg`, rating: 4, price: 4000, description: "Parfum raffiné pour une touche de sophistication au quotidien." },
    { id: 11, name: "Chapeau", src: `${process.env.PUBLIC_URL}/image/p.jpg`, rating: 4, price: 4000, description: "Un chapeau traditionnel unique pour les amateurs de culture." },
    { id: 12, name: "Chaussures", src: `${process.env.PUBLIC_URL}/image/slider0.jpg`, rating: 3, price: 7000, description: "Meilleur choix pour vos sorties." },
]

  /*const products = [
    { name: "ON PREPARE NOEL", src: `${process.env.PUBLIC_URL}/images/i.png`},
    { name: "IDÉE DE CADEAUX", src: `${process.env.PUBLIC_URL}/images/p.png`},
    { name: "JOUETS DE NOEL", src: `${process.env.PUBLIC_URL}/images/j.png` },
    { name: "STYLES VESTIMENTAIRES", src: `${process.env.PUBLIC_URL}/images/o.png` },
  ];

  const helpOptions = [
    { name: "Trouver un magasin",src: `${process.env.PUBLIC_URL}/images/t.svg` },
    { name: "Obtenir de l'aide", src: `${process.env.PUBLIC_URL}/images/y.svg` },
    { name: "Services Livraisons", src: `${process.env.PUBLIC_URL}/images/serv-1.png` },
    { name: "Consulter la FAQ", src: `${process.env.PUBLIC_URL}/images/i.svg` },
  ];*/
  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage("");
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  /*const openCoursesModal = () => {
    setIsCoursesModalOpen(true);
  };*/

  /*const closeCoursesModal = () => {
    setIsCoursesModalOpen(false);
  }*/
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((favId) => favId !== id); // Supprime des favoris
      }
      return [...prevFavorites, id]; // Ajoute aux favoris
    });
  };

  const currentImage = galleryImages[currentIndex] || {};
  
  return (
    <div className="accueil-page">
      <Navbar />
      <div className="spacer"></div>

      <div className="carousel-container">
        {/* Images floutées en arrière-plan */}
        <div className="carousel-background">
          {Array(9)
            .fill(currentImage.src)
            .map((src, index) => (
              <img key={index} src={src} alt={`Background ${index}`} className="blurred-image" />
            ))}
        </div>

        {/* Image principale */}
        <div className="carousel-center">
          <img
            src={currentImage.src}
            alt={currentImage.name}
            className="carousel-image"
          />
        </div>

        {/* Navigation */}
        <button className="carousel-prev" onClick={prevImage}>
          &#10094;
        </button>
        <button className="carousel-next" onClick={nextImage}>
          &#10095;
        </button>
      </div>



      {/* Navigation des catégories */}
      <div className="navbar-categories-i">
        <Link to="/" className="nav-item all">All</Link>
        <Link to="/cosmetics" className="nav-item cosmetics">Cosmetics</Link>
        <Link to="/Clothing" className="nav-item dresses">Clothing</Link>
        <Link to="/aliments" className="nav-item aliments">Aliments</Link>
      </div>


             {/* <section className="product-cards">
          <div className="white-card">
            <div className="text-container">
              <h3>Courses du quotidien</h3>
              <p>Retrait en drive ou livrées chez vous en 1h</p>
              <button className="blue-button-1" onClick={openCoursesModal}>Faire mes courses</button>
            </div>
            <img src={`${process.env.PUBLIC_URL}/images/5.gif`} alt="Courses gif" className="card-gif" />
          </div>

          <div className="white-card">
            <div className="text-container">
              <h3>Maison & loisirs</h3>
              <p>Retrait magasin gratuit, livraison gratuite dès 50000 d’achat</p>
              <button className="blue-button">Découvrir</button>
            </div>
            <img src={`${process.env.PUBLIC_URL}/images/1.gif`} alt="Maison gif" className="card-gif" />
          </div>
        </section>


      {isCoursesModalOpen && (
        <div className="modal-1" onClick={closeCoursesModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeCoursesModal}>&times;</button>
            <h2>Comment souhaitez-vous faire vos courses aujourd’hui ?</h2>
            <p>Choisissez un service pour profiter des produits et des promos disponibles dans votre magasin 👇</p>
            <div className="service-options">
              <div className="service-card">
                <img src={`${process.env.PUBLIC_URL}/images/2.svg`} alt="Drive" />
                <p className="blue-text">Drive</p>
              </div>
              <div className="service-card">
                <img src={`${process.env.PUBLIC_URL}/images/3.svg`} alt="Livraison" />
                <p className="blue-text">Livraison</p>
              </div>
              <div className="service-card">
                <img src={`${process.env.PUBLIC_URL}/images/4.svg`} alt="Livraison express" />
                <p className="blue-text">Livraison express</p>
              </div>
              <div className="service-card">
                <img src={`${process.env.PUBLIC_URL}/images/2.jpg`} alt="Test mon adresse" />
                <p className="blue-text">Test mon adresse</p>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      )}*/}

      

<section className="products" id="products">
  <h1 className="heading">
    <span>Nos Produits</span>
  </h1>
  <div className="carousel-products-container">
    <div className="carousel-products">
      {galleryImages
        .slice(currentPage * 8, currentPage * 8 + 8) // 8 images par page
        .map((image, index) => (
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
              <button
                className="icon-button fas fa-heart"
                title="Add to Favorites"
                onClick={() => toggleFavorite(image.id)}
                style={{
                  color: favorites.includes(image.id) ? 'red' : 'black',
                }}
              ></button>
              <button
                className="icon-button fas fa-eye"
                title="View Image"
                onClick={() => openModal(image.src)}
              ></button>
            </div>
            <img src={image.src} alt={image.name} />
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
        ))}
    </div>
  </div>

  {/* Pagination */}
  <div className="carousel-bar">
    {Array.from(
      { length: Math.ceil(galleryImages.length / 8) },
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



      {/* Section Catégories 
            
      <div className="four-card-container">
        {products.map((image, index) => (
          <div className="card" key={index}>
            <div className="card-header">
              {image.name}
            </div>
            <div className="card-body">
              <img
                src={image.src}
                alt={image.name}
                onClick={() => openModal(image.src)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        ))}*/}
      

                    {/* Bloc d'aide en ligne 
        </div>
        <div className="help-container-inline">
          {helpOptions.map((image, index) => (
            <div className="help-item" key={index}>
              <img 
                src={image.src} 
                alt={image.name} 
                className="help-icon" 
              />
              <span>{image.name}</span>
            </div>
          ))}
        </div>*/}




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
