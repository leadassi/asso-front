import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Services.css";

const Services = () => {
  const mapRef = useRef(null); // Référence pour maintenir l'instance de la carte

  useEffect(() => {
    // Si une carte existe déjà, on la supprime avant d'en créer une nouvelle
    if (mapRef.current) {
      mapRef.current.remove(); // Supprime l'ancienne carte si elle existe
    }

    // Initialisation de la carte
    const map = L.map("map", {
      center: [3.848, 11.502], // Centre du Cameroun, Yaoundé
      zoom: 6,
    });

    // Ajouter les tuiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Définir l'icône d'utilisateur
    const userLocationIcon = L.icon({
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // URL de l'icône de localisation
      iconSize: [25, 41], // Taille de l'icône
      iconAnchor: [12, 41], // Position de l'icône par rapport à la position du marqueur
    });

    // Définir l'icône rouge pour Yaoundé
    const yaoundeIcon = L.icon({
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x-red.png", // URL de l'icône rouge
      iconSize: [25, 41], // Taille de l'icône
      iconAnchor: [12, 41], // Position de l'icône par rapport à la position du marqueur
    });

    // Ajouter des flèches vers les chefs-lieux des régions
    const regions = [
      { name: "Douala", coords: [4.0511, 9.7679], icon: userLocationIcon },
      { name: "Garoua", coords: [9.3265, 13.3963], icon: userLocationIcon },
      { name: "Bamenda", coords: [5.9631, 10.1591], icon: userLocationIcon },
      { name: "Bertoua", coords: [4.5773, 13.6846], icon: userLocationIcon },
      { name: "Ngaoundéré", coords: [7.3277, 13.5849], icon: userLocationIcon },
      { name: "Yaoundé", coords: [3.8480, 11.5021], icon: yaoundeIcon }, // Utiliser l'icône rouge pour Yaoundé
      { name: "Maroua", coords: [10.5915, 14.3193], icon: userLocationIcon },
      { name: "Limbe", coords: [4.0225, 9.2001], icon: userLocationIcon },
      { name: "Kribi", coords: [4.5566, 9.9364], icon: userLocationIcon },
      { name: "Ebolowa", coords: [3.0677, 11.5495], icon: userLocationIcon }
    ];

    regions.forEach((region) => {
      // Vérifier si la région est Yaoundé, et définir la couleur de la flèche en conséquence
      const polylineColor = region.name === "Yaoundé" ? "red" : "blue";
      
      // Ajouter une flèche (polyline) vers chaque région avec la couleur appropriée
      L.polyline([[3.848, 11.502], region.coords], { color: polylineColor, weight: 2 }).addTo(map);
      
      // Ajouter un marqueur avec l'icône personnalisée pour chaque région
      L.marker(region.coords, { icon: region.name === "Yaoundé" ? yaoundeIcon : userLocationIcon })
        .bindPopup(`Direction : ${region.name}`)
        .addTo(map);
    });

    // Stocker l'instance de la carte dans la référence pour un éventuel nettoyage futur
    mapRef.current = map;

    // Nettoyer l'instance de carte lors du démontage du composant
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null; // Libérer la référence pour éviter les erreurs futures
      }
    };
  }, []); // Exécution lors du montage initial uniquement

  return (
    <div className="services-container">
      {/* Section Lieu de livraisons */}
      <section className="delivery-location">
        <h2>Lieu de livraisons</h2>
        <div id="map" className="map"></div>
      </section>

      {/* Section Nos Livreurs */}
      <section className="our-deliverers">
        <h2>Nos Livreurs</h2>
        <div className="deliverers-container">
          <div className="deliverer">
            <img src="https://via.placeholder.com/150" alt="Livreur 1" />
            <p>Jean Dupont</p>
          </div>
          <div className="deliverer">
            <img src="https://via.placeholder.com/150" alt="Livreur 2" />
            <p>Marie Claire</p>
          </div>
          <div className="deliverer">
            <img src="https://via.placeholder.com/150" alt="Livreur 3" />
            <p>Paul Tchop</p>
          </div>
        </div>
      </section>

      {/* Section Votre Commande */}
      <section className="your-order">
        <h2>Votre Commande</h2>
        <form className="order-form">
          <label>
            Nom du produit :
            <input type="text" placeholder="Entrez le nom du produit" />
          </label>
          <label>
            Quantité :
            <input type="number" placeholder="Entrez la quantité" />
          </label>
          <label>
            Adresse de livraison :
            <input type="text" placeholder="Entrez votre adresse" />
          </label>
          <button type="submit">Passer la commande</button>
        </form>
      </section>
    </div>
  );
};

export default Services;
