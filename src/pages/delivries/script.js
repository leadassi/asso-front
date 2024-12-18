const video = document.getElementById('video');
const resultDisplay = document.getElementById('result');
const startScanButton = document.getElementById('start-scan');

startScanButton.addEventListener('click', async () => {
  try {
    // Demande l'accès à la caméra
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = stream;

    // Démarre le scan du QR Code
    scanQRCode();
  } catch (error) {
    resultDisplay.textContent = 'Accès à la caméra refusé ou indisponible.';
    console.error('Erreur d’accès caméra :', error);
  }
});

function scanQRCode() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const scan = () => {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        resultDisplay.textContent = `QR Code détecté : ${code.data}`;
        return; // QR code détecté, on arrête le scan
      } else {
        resultDisplay.textContent = "Aucun QR Code détecté.";
      }
    }

    requestAnimationFrame(scan);
  };

  requestAnimationFrame(scan);
}
