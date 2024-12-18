import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ currentPosition, routes }) => {
  useEffect(() => {
    let map = null;

    // Initialiser la carte uniquement si elle n'existe pas encore
    if (!map) {
      map = L.map("map").setView([0, 0], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    }

    // Récupérer la position actuelle de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Assurez-vous que la carte est initialisée avant de définir la vue
          if (map) {
            map.setView([latitude, longitude], 13);

            L.marker([latitude, longitude], {
              icon: L.icon({
                iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              }),
            }).addTo(map);
          }
        },
        (error) => {
          console.error("Erreur lors de la récupération de la position :", error);
        }
      );
    }

    // Ajouter les itinéraires (si disponibles)
    if (routes.length > 0 && map) {
      const routeLayer = L.geoJSON(routes[0]).addTo(map);
      map.fitBounds(routeLayer.getBounds());
    }

    return () => {
      if (map) {
        map.remove(); // Supprimez la carte lors du démontage
      }
    };
  }, [currentPosition, routes]);

  return <div id="map" style={{ height: "100%", width: "100%" }}></div>;
};

export default MapComponent;
