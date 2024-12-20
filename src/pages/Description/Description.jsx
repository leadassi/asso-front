import React, {useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Description.css";
import fleche from './fleche.png'

const Description = ({ onAddToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const productId=1;
  utilisateurId=1;
  const quantite = 1;
  const [options, setOptions] = useState([]);
  const [couleurs, setCouleurs] = useState([]);
  const [optionChoisie, setOptionChoisie] = useState("");
  const [couleurChoisie, setCouleurChoisie] = useState(""); 
  const [categorie, setCategorie] = useState("");
  const [sousCategorie, setSousCategorie] = useState("");
  const [isBoutonDisabled, setIsBoutonDisabled] = useState(true);

  const [rating, setRating] = useState(0); // État local pour la note sélectionnée
  const [hover, setHover] = useState(0); // État pour gérer le survol


  useEffect(() => {
    // Appel pour récupérer la catégorie et sous-catégorie depuis le microservice produit
    fetch(`http://192.168.88.28:8080/produitService/getProduit/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setCategorie(data.category);
        setSousCategorie(data.subCategory);
        chargerOptions(data.category, data.subCategory); // Charger les options en fonction de la catégorie
      })
      .catch((error) => console.error("Erreur lors de la récupération du produit :", error));
  }, [productId]);


  useEffect(() => {
    // Désactiver le bouton si la quantité n'est pas définie
    setIsBoutonDisabled(quantite <= 0 || !optionChoisie || !couleurChoisie);
  }, [quantite, optionChoisie, couleurChoisie]);
  
    const { imageSrc, name, price, description } = location.state || {};

    if (!imageSrc || !name || !price || !description) {
      return (
        <div className="error-page">
          <p>Error: Missing product data</p>
          <button className="go-back-button" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      );
    }

  
    // Fonction pour charger les options dynamiques
    const chargerOptions = (category, subCategory) => {
      if (category === "Vêtements" && subCategory === "Chaussures") {
        setOptions(["Pointure 36", "Pointure 37", "Pointure 38", "Pointure 39", "Pointure 40"]);
        setCouleurs(["Noir", "Blanc", "Rouge", "Bleu"]);
      } else if (category === "Vêtements" && subCategory === "Sac") {
        setOptions(["5L", "10L", "15L", "20L"]);
        setCouleurs(["Noir", "Gris", "Beige", "Bleu"]);
      } else if (category === "alimentaire" && subCategory === "homme") {
        setOptions(["50g", "100g", "200g", "500g"]);
        setCouleurs([]);
      } else {
        setOptions([]);
        setCouleurs([]);
      }
    };
  
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
        const response = await fetch(`http://192.168.88.32:8082/recommandations/saverecommandation`, {
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
      <div className="container">
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

      <p className="mb-3 text-warning-emphasis">Catégorie : {categorie}</p>
      <p className="mb-3 text-warning-emphasis">Sous-catégorie : {sousCategorie}</p>

      {options.length > 0 && (
        <div>
          <label>Options :</label>
          <select
            value={optionChoisie}
            onChange={(e) => setOptionChoisie(e.target.value)}
          >
            <option value="">Sélectionnez une option : </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

{couleurs.length > 0 && (
        <div>
          <label>Couleur :</label>
          <select
            value={couleurChoisie}
            onChange={(e) => setCouleurChoisie(e.target.value)}
          >
            <option value="">Sélectionnez une couleur : </option>
            {couleurs.map((couleur, index) => (
              <option key={index} value={couleur}>
                {couleur}
              </option>
            ))}
          </select>
        </div>
      )}
    
    <button className="bout" onClick={() => onAddToCart(product) } disabled={isBoutonDisabled} style={{boxShadow:"initial", marginTop:"15px"}}>Ajouter au panier</button>
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
