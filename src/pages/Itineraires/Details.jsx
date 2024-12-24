import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Details.css"

const Details = () => {
  const mapRef = useRef(null); // Référence pour le conteneur DOM
  const mapInstance = useRef(null); // Référence pour l'instance de la carte
  const [locationDetails, setLocationDetails] = useState("Chargement...");
  const tomtomApiKey = "wntKCJUiXq0MM1325AV79nZHxio0FMHI"; // Clé API TomTom

  useEffect(() => {
    // Si la carte existe déjà, on la détruit avant de créer une nouvelle instance
    if (mapInstance.current) {
      mapInstance.current.remove();
    }

    mapInstance.current = L.map(mapRef.current).setView([0, 0], 2);

    // Ajouter les tuiles OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance.current);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          mapInstance.current.setView([latitude, longitude], 13);

          // Ajouter un marqueur à l'emplacement de l'utilisateur
          const userLocationIcon = L.icon({
            iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          });

          const marker = L.marker([latitude, longitude], {
            icon: userLocationIcon,
          }).addTo(mapInstance.current);

          try {
            const response = await fetch(
              `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${tomtomApiKey}`
            );
            const data = await response.json();
            const address =
              data.addresses?.[0]?.address?.freeformAddress || "Adresse inconnue";

            setLocationDetails(`Position actuelle : ${address}`);
            marker.bindPopup(`Vous êtes ici : ${address}`).openPopup();
          } catch (error) {
            console.error("Erreur lors de la récupération de l'adresse :", error);
            setLocationDetails("Impossible de récupérer l'adresse.");
          }
        },
        (error) => {
          console.error("Erreur lors de la géolocalisation :", error);
          setLocationDetails("La géolocalisation a échoué.");
        }
      );
    } else {
      console.error("La géolocalisation n'est pas prise en charge par ce navigateur.");
      setLocationDetails("La géolocalisation n'est pas prise en charge.");
    }
  }, []);

  return (
    <div className="map-container">
      <div ref={mapRef} className="map"></div>
      <div className="location-details">
        <h2>Détails :</h2>
        <p>{locationDetails}</p>
      </div>
    </div>
  );
};

export default Details;
