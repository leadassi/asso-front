import React, {useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Description.css";
import fleche from './fleche.png'

const Description = ({ onAddToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();

  /*const [quantite, setQuantite] = useState(0);
  const [options, setOptions] = useState([]);
  const [couleurs, setCouleurs] = useState([]);
  const [optionChoisie, setOptionChoisie] = useState("");
  const [couleurChoisie, setCouleurChoisie] = useState(""); 
  const [categorie, setCategorie] = useState("");
  const [sousCategorie, setSousCategorie] = useState("");
  const [isBoutonDisabled, setIsBoutonDisabled] = useState(true);*/

  const [rating, setRating] = useState(0); // État local pour la note sélectionnée
  const [hover, setHover] = useState(0); // État pour gérer le survol
  const utilisateurId = sessionStorage.getItem("utilisateurId");
  if (!utilisateurId) {
    navigate('/connection');
    
  }


  const { product } = location.state || {}; 

  /*useEffect(() => {
    // Appel pour récupérer la catégorie et sous-catégorie depuis le microservice produit
    fetch(`http://192.168.107.239:8080/produits/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setCategorie(data.categorie);
        setSousCategorie(data.sousCategorie);
        chargerOptions(data.categorie, data.sousCategorie); // Charger les options en fonction de la catégorie
      })
      .catch((error) => console.error("Erreur lors de la récupération du produit :", error));
  }, [productId]);


  useEffect(() => {
    // Désactiver le bouton si la quantité n'est pas définie
    setIsBoutonDisabled(quantite <= 0 || !optionChoisie || !couleurChoisie);
  }, [quantite, optionChoisie, couleurChoisie]);*/

 //const{id} = useParams();
      //const product= products.find(p)=>  p.id === parseInt(id));

      if(!product) return <p className="mb-3 text-warning-emphasis">produit non trouvé</p>
  
    /*const { id, imageSrc, name, price, description } = location.state || {};

      const product ={
      id:id,
      name:name,
      description:description,
      price:price
    };


    if (!imageSrc || !name || !price || !description) {
      return (
        <div className="error-page">
          <p>Error: Missing product data</p>
          <button className="go-back-button" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      );
    } */

  
    // Fonction pour charger les options dynamiques
    /*const chargerOptions = (categorie, sousCategorie) => {
      if (categorie === "Vêtements" && sousCategorie === "Chaussures") {
        setOptions(["Pointure 36", "Pointure 37", "Pointure 38", "Pointure 39", "Pointure 40"]);
        setCouleurs(["Noir", "Blanc", "Rouge", "Bleu"]);
      } else if (categorie === "Vêtements" && sousCategorie === "Sac") {
        setOptions(["5L", "10L", "15L", "20L"]);
        setCouleurs(["Noir", "Gris", "Beige", "Bleu"]);
      } else if (categorie === "Alimentation" && sousCategorie === "Épices") {
        setOptions(["50g", "100g", "200g", "500g"]);
        setCouleurs([]);
      } else {
        setOptions([]);
        setCouleurs([]);
      }
    };
  
    // Gérer la soumission (exemple d'appel à un microservice pour finaliser l'achat)
    const handleAcheter = () => {
      const produit = {
        productId,
        quantite,
        optionChoisie,
        couleurChoisie,
      };
      navigate("/connection");
      // Récupération du panier actuel dans SessionStorage
      const panier = JSON.parse(sessionStorage.getItem("panier")) || [];
  
      // Ajout du produit au panier
      panier.push(produit);
  
      // Mise à jour du SessionStorage
      sessionStorage.setItem("panier", JSON.stringify(panier));
  
      console.log("Produit ajouté au panier !");
    };
*/

  
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
        const response = await fetch(`http://192.168.107.101:8067/recommandations/saverecommandation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(body),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log("Vote enregistré avec succès :", result);
          alert("Votre vote a été enregistré avec succès !");
        } else {
          console.error("Erreur lors de l'enregistrement du vote :", response.statusText);
          alert("Une erreur est survenue lors de l'enregistrement de votre vote.");
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

    {/* <p className="mb-3 text-warning-emphasis">Catégorie : {categorie}</p>
      <p className="mb-3 text-warning-emphasis">Sous-catégorie : {sousCategorie}</p>

      <div>
        <label className="mb-3 text-warning-emphasis">Quantité :</label>
        <input
          type="number"
          min="1"
          value={quantite}
          onChange={(e) => setQuantite(parseInt(e.target.value))}
        />
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
    
    <button className="bout" onClick={handleAcheter} disabled={isBoutonDisabled} style={{boxShadow:"initial", marginTop:"15px"}}>Acheter</button>
  </div>*/}
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
