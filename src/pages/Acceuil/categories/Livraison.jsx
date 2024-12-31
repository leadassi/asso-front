import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Services.css";

const Services = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
    }

    const map = L.map("map", {
      center: [3.848, 11.502], 
      zoom: 6,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Définir les icônes
    const defaultIconUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png";
   
    const defaultIcon = L.icon({
      iconUrl: defaultIconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });


    const regions = [
      { name: "Douala", coords: [4.0511, 9.7679], icon: defaultIcon },
      { name: "Garoua", coords: [9.3265, 13.3963], icon: defaultIcon },
      { name: "Bamenda", coords: [5.9631, 10.1591], icon: defaultIcon },
      { name: "Bertoua", coords: [4.5773, 13.6846], icon: defaultIcon },
      { name: "Ngaoundéré", coords: [7.3277, 13.5849], icon: defaultIcon },
      { name: "Yaoundé", coords: [3.8480, 11.5021], icon: defaultIcon },
      { name: "Maroua", coords: [10.5915, 14.3193], icon: defaultIcon },
      { name: "Limbe", coords: [4.0225, 9.2001], icon: defaultIcon },
      { name: "Kribi", coords: [4.5566, 9.9364], icon: defaultIcon },
      { name: "Ebolowa", coords: [3.0677, 11.5495], icon: defaultIcon },
    ];

    regions.forEach((region) => {
      const popupText =
        region.name === "Yaoundé"
          ? "ASSO Yaounde, Ngoa -Ekélé"
          : `Direction : ${region.name}`
          

      const polylineColor = region.name === "Yaoundé" ? "red" : "blue";
      L.polyline([[3.848, 11.502], region.coords], { color: polylineColor, weight: 2 }).addTo(map);

      L.marker(region.coords, { icon: region.icon })
        .bindPopup(popupText)
        .addTo(map);
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="services-container">
      <section className="delivery-location">
        <h2>Lieu de livraisons</h2>
        <div id="map" className="map"></div>
      </section>
    </div>
  );
};

export default Services;
