import React, { useState } from "react";
import FormComponent from "./FormComponent"; // Import du formulaire
import MapComponent from "./MapComponent"; // Import de la carte
import "./style.css"; // CSS spécifique au composant

const Carte = () => {
  const [depart, setDepart] = useState("");
  const [arrivee, setArrivee] = useState("");
  const [currentPosition, setCurrentPosition] = useState(null);
  const [routes, setRoutes] = useState([]);

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(
        `https://api.tomtom.com/search/2/geocode/${depart}.json?key=wntKCJUiXq0MM1325AV79nZHxio0FMHI`
      );
      const data = await response.json();
      const departCoord = data.results[0].position;

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
        arrivee={arrivee}
        setArrivee={setArrivee}
      />
      <MapComponent currentPosition={currentPosition} routes={routes} />
    </div>
  );
};

export default Carte;
