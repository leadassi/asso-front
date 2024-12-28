// QRCodeGenerator.jsx
/*import React, { useState } from "react";
import "./QRCodeGenerator.css";

const QRCodeGenerator = () => {
  const [inputValue, setInputValue] = useState("");
  const [qrCodeSrc, setQrCodeSrc] = useState("");

  const handleGenerate = () => {
    if (!inputValue.trim()) return;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(inputValue)}`;
    setQrCodeSrc(qrCodeUrl);
  };

  return (
    <div className="wrapper">
      <header>
        <h1>QR Code Generator</h1>
        <p>Entrez le Nom du Produit pour obtenir son QR_Code</p>
      </header>
      <div className="form">
        <input
          type="text"
          spellCheck="false"
          placeholder="Entrer un texte ou URL"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleGenerate}>Generate QR Code</button>
      </div>
      {qrCodeSrc && (
        <div className="qr-code">
          <img src={qrCodeSrc} alt="qr-code" />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;*/
// QRCodeGenerator.jsx
import React, { useState, useEffect } from "react";
import "./QRCodeGenerator.css";

const QRCodeGenerator = () => {
  const [qrCodeSrc, setQrCodeSrc] = useState("");
  const [isQrCodeGenerated, setIsQrCodeGenerated] = useState(false);
  const [notification, setNotification] = useState("");

  const handleGenerateFromLocalStorage = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (cartItems.length === 0) {
      setNotification("Aucun produit trouvé dans le Local Storage !");
      setIsQrCodeGenerated(false);  // QR Code non généré
      return;
    }

    const productListString = cartItems.map(item => item.name).join(", ");
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(productListString)}`;
    
    // Stocker le QR code dans le localStorage
    localStorage.removeItem("qrCode");
    localStorage.setItem("qrCode", qrCodeUrl);
    
    // Mettre à jour l'état pour afficher le QR code généré
    setQrCodeSrc(qrCodeUrl);
    setIsQrCodeGenerated(true);
    setNotification("QR Code généré avec succès !"); // Notification de succès
  };

  useEffect(() => {
    const eventListener = () => {
      handleGenerateFromLocalStorage();
    };

    // Ajouter l'écouteur d'événements pour "generateQRCode"
    window.addEventListener("generateQRCode", eventListener);

    // Vérifier si le QR code est déjà stocké dans le localStorage
    const storedQRCode = localStorage.getItem("qrCode");
    if (storedQRCode) {
      setQrCodeSrc(storedQRCode); // Afficher le QR code si déjà généré
      setIsQrCodeGenerated(true);
    } else {
      handleGenerateFromLocalStorage();  // Sinon, tenter de générer le QR code
    }

    // Nettoyage de l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener("generateQRCode", eventListener);
    };
  }, []); // Ce useEffect s'exécute une seule fois au montage du composant

  return (
    <div className="wrapper">
      <header>
        <h1>QR Code Generator</h1>
        <p>
          Génère un QR Code contenant la liste des produits enregistrés dans le
          Local Storage.
        </p>
      </header>
      
      {/* Affichage de la notification */}
      {notification && (
        <div className="alert alert-info">
          {notification}
        </div>
      )}

      {qrCodeSrc ? (
        <div className="qr-code">
          <img src={qrCodeSrc} alt="qr-code" />
          <p style={{ color: "green" }}>QR Code généré avec succès !</p>
        </div>
      ) : (
        isQrCodeGenerated === false && (
          <p style={{ color: "red" }}>Aucun QR Code généré pour le moment.</p>
        )
      )}
    </div>
  );
};

export default QRCodeGenerator;
