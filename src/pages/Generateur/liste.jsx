import React, { useState, useEffect } from 'react';
import "./listes.css";
const QRCodeDisplay = () => {
  const [qrCodeSrc, setQrCodeSrc] = useState('');

  useEffect(() => {
    // Récupérer le QR code stocké dans le localStorage
    const storedQrCode = localStorage.getItem("qrCode");

    if (storedQrCode) {
      setQrCodeSrc(storedQrCode);  // Mettre à jour l'état avec l'URL du QR code
    } else {
      console.log("Aucun QR code trouvé dans le Local Storage.");
    }
  }, []);

  return (
    <div className="wrapper">
      <header>
        <h1>QR Code Affichage</h1>
        <p>Voici le QR Code généré précédemment.</p>
      </header>
      {qrCodeSrc ? (
        <div className="qr-code">
          <img src={qrCodeSrc} alt="QR Code" />
        </div>
      ) : (
        <p>Pas de QR code disponible.</p>
      )}
    </div>
  );
};

export default QRCodeDisplay;
