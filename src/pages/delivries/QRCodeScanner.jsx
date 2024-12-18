import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import "./QRCodeScanner.css"; // Importation du fichier CSS

const QRCodeScanner = () => {
  const videoRef = useRef(null);
  const [result, setResult] = useState("Scannez un QR code avec la caméra.");

  const handleStartScan = async () => {
    try {
      // Demande l'accès à la caméra
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        scanQRCode();
      }
    } catch (error) {
      setResult("Accès à la caméra refusé ou indisponible.");
      console.error("Erreur d’accès caméra :", error);
    }
  };

  const scanQRCode = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const scan = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        canvas.height = videoRef.current.videoHeight;
        canvas.width = videoRef.current.videoWidth;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setResult(`QR Code détecté : ${code.data}`);
          return; // QR code détecté, on arrête le scan
        } else {
          setResult("Aucun QR Code détecté.");
        }
      }

      requestAnimationFrame(scan);
    };

    requestAnimationFrame(scan);
  };

  useEffect(() => {
    const videoElement = videoRef.current; // Copie locale de la référence
    return () => {
      if (videoElement && videoElement.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []); // Pas de dépendances à ajouter ici

  return (
    <div className="scanner-page">
      <div className="scanner-container">
        <h2>Simulateur de Scanner QR Code</h2>
        <video ref={videoRef} className="scanner" autoPlay></video>
        <button id="start-scan" onClick={handleStartScan}>
          Commencer le scan
        </button>
        <p id="result">{result}</p>
      </div>
    </div>
  );
};

export default QRCodeScanner;
