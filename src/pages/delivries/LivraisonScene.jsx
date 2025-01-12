import React, { useEffect, useState } from "react";
import "./Livraison.css";
import q from "./q.png"; // Image illustration
import scooter from "./scooter.jpeg";
import voiture from "./voiture.jpeg";
import moto from "./moto.jpeg";
import camion from "./camion.jpeg";
import Header from "../../components/Header";

const messages = ["Rapide", "Sécurisé", "7/7J", "24/24h"];
const colors = ["#FF5733", "#33FF57", "#337BFF", "#FFFF00"];

const moyens = [
  { image: scooter, titre: "Scooters", description: "Rapides et pratiques pour les livraisons en ville." },
  { image: voiture, titre: "Voitures", description: "Sécurisées et adaptées aux longues distances." },
  { image: moto, titre: "Motos", description: "Parfaites pour les livraisons express et flexibles." },
  { image: camion, titre: "Camions", description: "Idéaux pour les grandes quantités et la logistique." }
];

const LivraisonScene = () => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    let i = 0;
    const messageInterval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentMessage(messages[i]);
        setCurrentColor(colors[i]);
        setFade(true);
        i = (i + 1) % messages.length;
      }, 500);
    }, 2500);

    return () => {
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="livraison-container">
      <Header />
      <div className="scrolling-text">
        <p style={{ color: "#D97706" }}>Bienvenue sur Votre Page Gestion de Vos Livraisons</p>
      </div>

      {/* Animation des messages */}
      <div className="overlay">
        <h2>Vos Livraisons :</h2>
        <h3 style={{ color: currentColor, opacity: fade ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}>
          {currentMessage}
        </h3>
      </div>

      {/* Barre de navigation */}
      <div className="navLiv">
        <ul>
          <li><a href="/livraisons">Livraisons en cours</a></li>
          <li><a href="#suivi">Suivi Livraison</a></li>
          <li><a href="/historique-livraisons">Historique Livraisons</a></li>
          <li><a href="/ASSO">Retraits Commandes</a></li>
        </ul>
      </div>

      {/* Illustration */}
      <div className="image-container">
        <img src={q} alt="Illustration Livraison" />
      </div>

      {/* Moyens de livraison */}
      <div className="moyens-container">
        <h2 className="title">Nos moyens de Livraisons</h2>
        <div className="slogan-container">
          <p className="slogan">La rapidité et la sécurité au service de vos besoins</p>
        </div>

        {/* Liste statique des moyens de livraison */}
        <div className="carousel">
          <div className="carousel-inner">
            {moyens.map((moyen, i) => (
              <div className="card-1" key={i}>
                <div className="image-section">
                  <img src={moyen.image} alt={moyen.titre} />
                </div>
                <div className="divider"></div>
                <div className="text-section">
                  <h3>{moyen.titre}</h3>
                  <p>{moyen.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default LivraisonScene;
