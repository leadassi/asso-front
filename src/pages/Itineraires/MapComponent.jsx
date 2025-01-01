import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ currentPosition, routes }) => {
  const mapContainerRef = useRef(null); // Référence à l'élément DOM de la carte
  const mapInstance = useRef(null); // Référence pour l'instance de la carte Leaflet
  const distanceRef = useRef(null); // Référence à l'élément affichant la distance
  const priceRef = useRef(null); // Référence à l'élément affichant le prix

  const tomtomApiKey = "wntKCJUiXq0MM1325AV79nZHxio0FMHI"; // Clé API TomTom

  useEffect(() => {
    if (!mapContainerRef.current) {
      console.error("Conteneur de carte introuvable.");
      return;
    }

    // Initialiser la carte uniquement si elle n'existe pas encore
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapContainerRef.current, {
        center: [7.3697, 12.3547], // Position initiale (Cameroun)
        zoom: 6, // Niveau de zoom initial
      });

      // Ajouter les tuiles OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);
    }

    // Ajouter la géolocalisation de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          if (mapInstance.current) {
            mapInstance.current.setView([latitude, longitude], 13);

            // Ajouter un marqueur pour la position de l'utilisateur
            const userLocationIcon = L.icon({
              iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            });

            const marker = L.marker([latitude, longitude], { icon: userLocationIcon }).addTo(mapInstance.current);

            // Ajout d'un événement `click` sur le marqueur
            marker.on("click", async () => {
              try {
                const response = await fetch(
                  `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${tomtomApiKey}`
                );
                const data = await response.json();
                const address = data.addresses?.[0]?.address?.freeformAddress || "Adresse inconnue";

                // Afficher l'adresse dans une popup
                marker.bindPopup(`Vous êtes ici : ${address}`).openPopup();
              } catch (error) {
                console.error("Erreur lors de la récupération de l'adresse :", error);
              }
            });
          }
        },
        (error) => {
          console.error("Erreur de géolocalisation :", error);
        }
      );
    }

    // Afficher les routes si elles sont disponibles
    if (routes && routes.length > 0 && mapInstance.current) {
      const routeLayer = L.geoJSON(routes[0], {
        style: {
          color: "red",
          weight: 5,
        },
      }).addTo(mapInstance.current);

      mapInstance.current.fitBounds(routeLayer.getBounds());

      // Afficher la distance si disponible
      const totalDistance = routes[0].properties?.distance || null; // Distance en mètres
      if (totalDistance && distanceRef.current) {
        const distanceInKm = totalDistance / 1000; // Conversion en kilomètres
        let price = distanceInKm * 100 * 2; // Calcul du prix (300 unités par km * 2)

        // Arrondir le prix au multiple de 5 le plus proche
        price = Math.round(price); // Arrondi au plus proche
        price = Math.ceil(price / 5) * 5; // Conversion au multiple de 5 supérieur

        // Afficher la distance et le prix
        distanceRef.current.textContent = `Distance : ${distanceInKm.toFixed(2)} km`;
        if (priceRef.current) {
          priceRef.current.textContent = `Prix estimé : ${price} Francs CFA`;
        }

        // Stocker le prix dans le Local Storage
        localStorage.setItem("prixLivraison", price);
      }
    }
  }, [currentPosition, routes]); // Réexécuter l'effet si les dépendances changent

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={mapContainerRef}
        style={{
          height: "600px",
          width: "900px",
        }}
      ></div>
      <div
        id="distance"
        ref={distanceRef}
        style={{
          marginTop: "10px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "red",
        }}
      ></div>
      <div
        id="price"
        ref={priceRef}
        style={{
          marginTop: "5px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "blue",
        }}
      ></div>
    </div>
  );
};

export default MapComponent;
