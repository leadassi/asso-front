import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import '../../index.css';
import { Link } from "react-router-dom"; // Importation de Link pour la navigation
import "./QRCodeScanner.css";

const QRCodeScanner = () => {
  const videoRef = useRef(null);
  const [result, setResult] = useState("Scannez un QR code avec la caméra.");

  const handleStartScan = async () => {
    try {
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
          return;
        } else {
          setResult("Aucun QR Code détecté.");
        }
      }

      requestAnimationFrame(scan);
    };

    requestAnimationFrame(scan);
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    return () => {
      if (videoElement && videoElement.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="cont">
    <div className="">
      {/* Première page */}
      <div className="spacer"></div>
      <div className="scanner-page">
        <div className="scanner-header">
          {/* Bouton retour avec icône */}
          <Link to="/profil" className="return-button">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <h1>Votre Scanner de QR_Code</h1>
        </div>
        <div className="divider"></div>

        {/* Deuxième page */}
        <div className="scanner-container">
          <video ref={videoRef} className="scanner" autoPlay></video>
          <button id="start-scan" onClick={handleStartScan}>
            Commencer le scan
          </button>
          <p id="result">{result}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default QRCodeScanner;
