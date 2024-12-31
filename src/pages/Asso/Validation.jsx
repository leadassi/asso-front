import React from "react";

function Validation() {
  return (
    <div className="page">
      <h2>Validation de la livraison</h2>
      <p>Confirmez si la livraison a été effectuée :</p>
      <div className="buttons">
        <button className="btn valid">Valide</button>
        <button className="btn invalid">Invalide</button>
      </div>
    </div>
  );
}

export default Validation;