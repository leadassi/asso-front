import React from "react";
import "./style.css";

const FormComponent = ({ onSubmit, depart, setDepart }) => {
  // Fonction pour gérer la soumission via la touche "Entrée"
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="form-container">
      <h2>Planifiez votre itinéraire</h2>
      <form onKeyDown={handleKeyDown}>
        <div className="form-group">
          <label htmlFor="depart">Point de départ :</label>
          <input
            id="depart"
            type="text"
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
            placeholder="Entrez votre point de départ"
            required
          />
        </div>
        <button type="button" className="form-button" onClick={onSubmit}>
          Calculer l'itinéraire
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
