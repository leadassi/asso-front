import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Asso.css";

const ASSO = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
    }

    // Initialisation de la carte
    const map = L.map("map", {
      center: [3.8480, 11.5021], // Centre sur Yaoundé, Ngoa-Ekélé
      zoom: 12, // Niveau de zoom adapté pour la ville
    });

    // Ajouter les tuiles OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Définir l'icône de l'entreprise ASSO avec l'image hébergée sur GitHub
    const assoIcon = L.icon({
      iconUrl: "https://raw.githubusercontent.com/DOSSIVIL/IMAGES/main/Aliment/logoappli.jpg", // URL brute de l'image
      iconSize: [60, 60], // Taille de l'icône
      iconAnchor: [20, 40], // Ancrage de l'icône
      className: "icon-asso",
    });

    // Ajouter le marqueur pour la position de l'entreprise à Yaoundé, Ngoa-Ekélé
    L.marker([3.8480, 11.5021], { icon: assoIcon })
      .bindPopup("<b>ASSO Yaoundé, Ngoa-Ekélé</b>")
      .addTo(map);

    // Stocker l'instance de la carte pour nettoyage futur
    mapRef.current = map;

    // Nettoyer l'instance de carte lors du démontage du composant
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="asso-container">
      <section className="map-section">
        <div id="map" className="map"></div>
      </section>


     
    </div>
  );
};

export default ASSO;
