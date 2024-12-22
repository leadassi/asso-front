import React, {useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Description.css";
import fleche from './fleche.png'

const Description = ({ onAddToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  
  const utilisateurId=sessionStorage.getItem("utilisateurId")
  

  const [rating, setRating] = useState(0); // État local pour la note sélectionnée
  const [hover, setHover] = useState(0); // État pour gérer le survol


  /*useEffect(() => {
    // Appel pour récupérer la catégorie et sous-catégorie depuis le microservice produit
    fetch(`http://192.168.140.239:8080/produitService/getProduit/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setCategorie(data.category);
        setSousCategorie(data.subCategory);
        chargerOptions(data.category, data.subCategory); // Charger les options en fonction de la catégorie
      })
      .catch((error) => console.error("Erreur lors de la récupération du produit :", error));
  }, [productId]);*/


  
  
    const {productId, imageSrc, name, price, description } = location.state || {};

    if (!imageSrc || !name || !price || !description) {
      return (
        <div className="error-page">
          <p>Error: Missing product data</p>
          <button className="go-back-button" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      );
    }

  
    // Gérer la soumission (exemple d'appel à un microservice pour finaliser l'achat)
    /*const handleAcheter = () => {
      const produit = {
        productId,
        quantite,
        optionChoisie,
        couleurChoisie,
      };
      const panier = JSON.parse(sessionStorage.getItem("panier")) || [];

  
      // Ajout du produit au panier
      panier.push(produit);
  
      // Mise à jour du SessionStorage
      sessionStorage.setItem("panier", JSON.stringify(panier));

      console.log("Produit ajouté au panier !");

      navigate("/accueil");
    };*/


  
    const handleRating = async (selectedRating) => {
      setRating(selectedRating);
  
      // Construire le corps de la requête
      const body = {
        productId: productId,
        userId: utilisateurId,
        rating: selectedRating,
      };
  
      try {
        // Appeler l'endpoint du microservice avec fetch
        const response = await fetch(`http://192.168.140.101:8082/recommandations/saverecommandation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify(body),
        });
  
        if (response.ok) {
          navigate("/connection")
          const result = await response.json();
          console.log("Vote enregistré avec succès :", result);
          console.log("Votre vote a été enregistré avec succès !");
        } else {
          console.error("Erreur lors de l'enregistrement du vote :", response.statusText);
          console.log("Une erreur est survenue lors de l'enregistrement de votre vote.");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Une erreur réseau est survenue. Veuillez réessayer.");
      }
    };

  return (
      <div className="container1">
  <button
    style={{
      borderRadius: "50%",
      mixBlendMode: "multiply",
      maxWidth: "40px",
      position: "absolute",
      top: "20px",
      left: "20px",
      zIndex: 2, // S'assurer que le bouton est au-dessus du fond
    }}
    onClick={() => navigate(-1)}
  >
    <img style={{ paddingLeft: "5px" }} src={fleche} alt="Retour" />
  </button>

  {/* Section gauche (texte) */}
  <div className="left-section">
  <h3 className="mb-3 text-warning-emphasis">{name}</h3>
    <h1 className="mb-5 text-warning-emphasis">DESCRIPTION</h1>
    <br/>
    <br/>
    <p className="mb-3 text-warning-emphasis">
    {description}
    </p>
    <div>
              <span className="mb-3 text-warning-emphasis">PRIX : {price} FCFA</span><br/><br/>
              <span className="mb-3 text-warning-emphasis">
        Laissez une note sur le produit :
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`fa-heart ${i < (hover || rating) ? "fas" : "far"}`}
            onClick={() => handleRating(i + 1)} // Enregistrer la note au clic
            onMouseEnter={() => setHover(i + 1)} // Survol
            onMouseLeave={() => setHover(0)} // Arrêt du survol
            style={{
              cursor: "pointer",
              color: i < (hover || rating) ? "red" : "gray", // Couleur dynamique
            }}
          ></i>
        ))}
      </span><br/><br/>
            </div>
      
    
    <button className="bout" onClick={() => onAddToCart() } style={{boxShadow:"initial", marginTop:"15px"}}>Ajouter au panier</button>
  </div>

  {/* Section droite (image) */}
  <div className="right-section" style={{borderRadius: "50%", mixBlendMode: 'multiply' }}>
    <img src={imageSrc} alt={name} />
  </div>
  <div class="background-image-contain">
        <img src={imageSrc} alt="" class="background-imag"/>
      </div>
</div>


  );
};

export default Description;
