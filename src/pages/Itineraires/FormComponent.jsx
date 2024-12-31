import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const FormComponent = ({ onSubmit, depart, setDepart }) => {
  const [suggestions, setSuggestions] = useState([]); // État pour stocker les suggestions
  const tomtomApiKey = "wntKCJUiXq0MM1325AV79nZHxio0FMHI"; // Clé API TomTom
  const suggestionsRef = useRef(null); // Référence pour le champ de suggestions

  // Fonction pour rechercher des suggestions en fonction de l'entrée utilisateur
  const fetchSuggestions = async (input) => {
    if (input.length < 3) {
      setSuggestions([]); // Réinitialiser les suggestions si l'entrée est trop courte
      return;
    }

    try {
      const response = await fetch(
        `https://api.tomtom.com/search/2/search/${encodeURIComponent(
          input
        )}.json?key=${tomtomApiKey}&typeahead=true&limit=5`
      );
      const data = await response.json();

      const formattedSuggestions = data.results.map((result) => {
        const city = result.address.municipality || "Ville inconnue";
        const zone = result.address.streetName || "Zone inconnue";
        return `${city}, ${zone}`;
      });

      setSuggestions(formattedSuggestions);
    } catch (error) {
      console.error("Erreur lors de la récupération des suggestions :", error);
    }
  };

  // Fonction pour gérer la saisie utilisateur
  const handleInputChange = (e) => {
    const input = e.target.value;
    setDepart(input);
    fetchSuggestions(input);
  };

  // Fonction pour gérer la sélection d'une suggestion
  const handleSuggestionClick = (suggestion) => {
    setDepart(suggestion); // Met à jour le champ de saisie avec la suggestion sélectionnée
    setSuggestions([]); // Réinitialise les suggestions
  };

  // Fonction pour détecter un clic à l'extérieur
  const handleClickOutside = (event) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target)
    ) {
      setSuggestions([]); // Réinitialise les suggestions
    }
  };

  // Ajout de l'écouteur pour détecter les clics extérieurs
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="form-container">
      <h2>Planifiez votre itinéraire</h2>
      <form>
        <div className="form-group">
          <label htmlFor="depart">Votre lieu de livraison :</label>
          <input
            id="depart"
            type="text"
            value={depart}
            onChange={handleInputChange}
            placeholder="Ville,Zone"
            required
          />
          {/* Liste des suggestions */}
          {suggestions.length > 0 && (
            <ul className="suggestions-list" ref={suggestionsRef}>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="suggestion-item"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="button"
          className="form-button"
          onClick={onSubmit}
        >
          Calculer l'itinéraire
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
