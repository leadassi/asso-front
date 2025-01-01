import React, {useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Description.css";
import fleche from './fleche.png'

const Description = ({ onAddToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();

  
  const [options, setOptions] = useState([]);
  const [couleurs, setCouleurs] = useState([]);
  const [optionChoisie, setOptionChoisie] = useState("");
  const [couleurChoisie, setCouleurChoisie] = useState(""); 
  const [categorie, setCategorie] = useState("");
  const [sousCategorie, setSousCategorie] = useState("");

  const [rating, setRating] = useState(0); // État local pour la note sélectionnée
  const [hover, setHover] = useState(0); // État pour gérer le survol
  const utilisateurId = sessionStorage.getItem("utilisateurId");
  if (!utilisateurId) {
    navigate('/connection');
    
  }


  const { product } = location.state || {}; 

  // Fonction pour charger les options dynamiques
  const chargerOptions = useCallback(() => {
    if (categorie === "accessoire" && sousCategorie === "Chaussures") {
      setOptions(["Pointure 36", "Pointure 37", "Pointure 38", "Pointure 39", "Pointure 40"]);
      setCouleurs(["Noir", "Blanc", "Rouge", "Bleu"]);
    } else if (categorie === "accessoire" && sousCategorie === "sac") {
      setOptions([]);
      setCouleurs(["Noir", "Gris", "Beige", "Bleu","rouge"]);
    } else if (categorie === "vetement" && sousCategorie === "pantalon") {
      setOptions(["Taille XS", "Taille S", "Taille M", "Taille L", "Taille XL", "Taille XXL"]);
      setCouleurs(["blanc", "rouge", "noir", "gris"]);
    } else if (categorie === "vetement" && sousCategorie === "robe") {
      setOptions(["Taille XS", "Taille S", "Taille M", "Taille L", "Taille XL", "Taille XXL"]);
      setCouleurs(["blanc", "rouge", "noir", "gris"]);
    } else if (categorie === "vetement" && sousCategorie === "t_shirt") {
      setOptions(["Taille XS", "Taille S", "Taille M", "Taille L", "Taille XL", "Taille XXL"]);
      setCouleurs(["blanc", "rouge", "noir", "gris"]);
    }  else if (categorie === "vetements" && sousCategorie === "jupe") {
    setOptions(["Taille XS", "Taille S", "Taille M", "Taille L", "Taille XL", "Taille XXL"]);
    setCouleurs(["blanc", "rouge", "noir", "gris"]);
  }  else if (categorie === "vetements" && sousCategorie === "chapeau") {
    setOptions([]);
    setCouleurs(["blanc", "rouge", "noir", "gris"]);
  } else {
      setOptions([]);
      setCouleurs([]);
    }
  }, [categorie, sousCategorie]);

  useEffect(() => {
    setCategorie(product.category);
    setSousCategorie(product.subCategory);
    // Désactiver le bouton si la quantité n'est pas définie
    //setIsBoutonDisabled(!optionChoisie || !couleurChoisie);
  }, [product.category, product.subCategory]);

  useEffect(() => {
    // Charger les options en fonction de la catégorie et de la sous-catégorie
    chargerOptions();
  }, [categorie, sousCategorie, chargerOptions]);

 

  if(!product) return <p className="mb-3 text-warning-emphasis">produit non trouvé</p>


  
    const handleRating = async (selectedRating) => {
      setRating(selectedRating);
  
      // Construire le corps de la requête
      const body = {
        productId: product.id,
        userId: utilisateurId,
        rating: selectedRating,
      };
  
      try {
        // Appeler l'endpoint du microservice avec fetch
        const response = await fetch(`http://192.168.227.101:8082/recommandations/saverecommandation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin':'*',
          },
          //credentials: 'include',
          body: JSON.stringify(body),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log("Vote enregistré avec succès :", result);
          
        } else {
          console.error("Erreur lors de l'enregistrement du vote :", response.statusText);
          
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
        
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
      top: "5%",
      left: "5%",
      zIndex: 2, // S'assurer que le bouton est au-dessus du fond
    }}
    onClick={() => navigate(-1)}
  >
    <img style={{ paddingLeft: "5px" }} src={fleche} alt="Retour" />
  </button>

  {/* Section gauche (texte) */}
  <div className="left-section1">
  <h3 className="mb-3 text-warning-emphasis">{product.name}</h3>
    <h1 className="mb-5 text-warning-emphasis">DESCRIPTION</h1>
    <br/>
    <br/>
    <p className="mb-3 text-warning-emphasis">
    {product.description}
    </p>
    <div>
              <span className="mb-3 text-warning-emphasis">PRIX : {product.price} FCFA</span><br/><br/>
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
  <button className="bout" onClick={()=> onAddToCart(product)} style={{boxShadow:"initial", marginTop:"15px"}}>Ajouter au panier</button>
  </div>
  {/* Section droite (image) */}
  <div className="right-section1" style={{borderRadius: "50%", mixBlendMode: 'multiply' }}>
    <img src={product.imageUrl} alt={product.name} />
  </div>
  <div class="background-image-contain1">
        <img src={product.imageUrl} alt="" class="background-imag1"/>
      </div>
</div>


  );
};

export default Description;
