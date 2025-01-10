import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent";
import MapComponent from "./MapComponent";
import "./style.css";

const Carte = () => {
  const [depart, setDepart] = useState(""); // Seul le départ est demandé
  const [currentPosition, setCurrentPosition] = useState(null);
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  // L'arrivée est fixée à "Yaoundé, Ngoa"
  const arrivee = "Yaoundé, Ngoa";

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(
        `https://api.tomtom.com/search/2/geocode/${depart}.json?key=wntKCJUiXq0MM1325AV79nZHxio0FMHI`
      );
      const data = await response.json();
      const departCoord = data.results[0].position;

      // Récupérer l'ID de l'utilisateur depuis sessionStorage
      const userId = sessionStorage.getItem("utilisateurId")

      if (userId) {
        const { idUtilisateur } = JSON.parse(userId);

        if (idUtilisateur) {
          // Stocker le lieu de départ en fonction de l'ID de l'utilisateur
          sessionStorage.setItem(`lieuDepart_${idUtilisateur}`, depart);
        } else {
          console.error("ID utilisateur introuvable dans sessionStorage !");
        }
      } else {
        console.error("Aucune donnée utilisateur trouvée dans sessionStorage !");
      }

      // Utilisation de "Yaoundé, Ngoa" pour l'arrivée
      const responseArrivee = await fetch(
        `https://api.tomtom.com/search/2/geocode/${arrivee}.json?key=wntKCJUiXq0MM1325AV79nZHxio0FMHI`
      );
      const dataArrivee = await responseArrivee.json();
      const arriveeCoord = dataArrivee.results[0].position;

      setCurrentPosition([departCoord.lat, departCoord.lon]);

      const routeResponse = await fetch(
        `https://api.tomtom.com/routing/1/calculateRoute/${departCoord.lat},${departCoord.lon}:${arriveeCoord.lat},${arriveeCoord.lon}/json?key=wntKCJUiXq0MM1325AV79nZHxio0FMHI`
      );
      const routeData = await routeResponse.json();

      const geoJsonRoute = {
        type: "Feature",
        properties: {
          distance: routeData.routes[0].summary.lengthInMeters, // Ajout de la distance
        },
        geometry: {
          type: "LineString",
          coordinates: routeData.routes[0].legs[0].points.map((point) => [
            point.longitude,
            point.latitude,
          ]),
        },
      };

      setRoutes([geoJsonRoute]);

      // Attendre 15 secondes avant de rediriger vers la page de validation
      setTimeout(() => {
        navigate("/ValidationCart");
      }, 15000);

    } catch (error) {
      console.error("Erreur lors du calcul de l'itinéraire:", error);
    }
  };

  return (
    <div className="itinerary-container">
      <FormComponent
        onSubmit={handleFormSubmit}
        depart={depart}
        setDepart={setDepart}
      />
      <MapComponent currentPosition={currentPosition} routes={routes} />
    </div>
  );
};

export default Carte;
