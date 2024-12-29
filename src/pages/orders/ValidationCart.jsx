import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


function PaymentComponent({ checkout, DeliveryCheckout, testCheckout }) {
  return (
    <div className="d-flex justify-content-between mb-3">
      <button
        type="button"
        className="btn btn-warning"
        onClick={checkout}
      >
        Paiement avant livraison
      </button>
      <button
        type="button"
        className="btn btn-warning"
        onClick={DeliveryCheckout}
      >
        Paiement après livraison
      </button>
      <button
        type="button"
        className="btn btn-warning"
        onClick={testCheckout}
      >
        Continuer sans payer
      </button>
    </div>
  );
}

function ValidationCart() {
  const navigate = useNavigate();
  //const { state } = useLocation(); 
  //const cartItems = state?.cartItems || [];
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    confirmation: false,
    paymentPreference: '', // Stocke le type de paiement sélectionné
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCheckout = () => {
    setFormData((prev) => ({ ...prev, paymentPreference: 'avant' }));
    console.log("Paiement avant livraison sélectionné.");
  };

  const handleDeliveryCheckout = () => {
    setFormData((prev) => ({ ...prev, paymentPreference: 'apres' }));
    console.log("Paiement après livraison sélectionné.");
  };

  const testCheckout = () => {
    setFormData((prev) => ({ ...prev, paymentPreference: 'sans' }));
    console.log("Test sans paiement sélectionné.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (!formData.email || !formData.name || !formData.paymentPreference) {
      setError("Veuillez remplir tous les champs et sélectionner un mode de paiement.");
      return;
    }

    if (!formData.confirmation) {
      setError("Veuillez confirmer vos informations avant de soumettre.");
      return;
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      setError("Votre panier est vide. Ajoutez des articles avant de valider.");
      return;
    }

    const panierValide = cartItems.every(
      (item) => item.quantity > 0 && item.price > 0
    );

    if (!panierValide) {
      setError("Votre panier contient des articles invalides. Veuillez vérifier.");
      return;
    }

    setError('');
    setLoading(true);

    try {
  let prixTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Convertir prixTotal en entier multiple de 5
  prixTotal = Math.round(prixTotal / 5) * 5;



      const contenances = cartItems.map((item) => ({
        idProduit: item.id,
        quantite: item.quantity || 1,
      }));

      const panier = {
        idUtilisateur: 1,
        prixTotal: prixTotal,
        contenances: contenances,
      };

      console.log("Données du panier :", panier);

      const panierResponse = await fetch('http://192.168.17.234:8081/commande/panier/validerPanier', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(panier),
      });

      if (!panierResponse.ok) {
        throw new Error(`Erreur lors de la création du panier : ${panierResponse.statusText}`);
      }

      const idPanier = await panierResponse.text();

      const commande = {
        date: new Date().toISOString(),
        prixTotal: prixTotal + 5.0,
        montant_livraison: 5.0,
        statutCommande: "NULL",
        idUtilisateur: 1,
        panier: {
          idPanier: idPanier,
          idUtilisateur: 1,
          prixTotal: prixTotal,
          contenances: contenances.map(item => ({
            idProduit: item.idProduit,
            quantite: item.quantite,
          })),
        },
      };

      const commandeResponse = await fetch('http://192.168.17.234:8081/commande/validercmd', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commande),
      });

      if (!commandeResponse.ok) {
        throw new Error(`Erreur lors de la validation de la commande : ${commandeResponse.statusText}`);
      }

      const idCommande  = await commandeResponse.text();
      console.log("Commande validée. ID de commande :", idCommande);

      const factureResponse = await fetch(`http://192.168.17.234:8081/commande/email/envoyer-facture/${idCommande}`,{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
      });

      if (!factureResponse.ok) {
        throw new Error(`Erreur lors de l'envoie de la facture : ${factureResponse.statusText}`);
      }

      

      sessionStorage.setItem('idCommande', idCommande);
      sessionStorage.setItem('idPanier', idPanier);
      console.log("cartItems");
      setSuccess("Commande validée avec succès !");
      setTimeout(() => navigate('/orders'), 3000);
    } catch (err) {
      console.error("Erreur :", err);
      console.log("cartItems");
      setError(err.message || "Impossible de compléter l'opération.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cont">
      <script src ="https://cdn.cinetpay.com/seamless/main.js"></script>
      <div
        className="container d-flex justify-content-center align-items-center vh-100"
        style={{ marginBottom: '10px' }}
      >
        <div
          className="card shadow-lg p-4 w-100"
          style={{
            maxWidth: '350px',
            minHeight: '400px',
          }}
        >
          <div>
            <button onClick={() => navigate(-1)}>
              <FaArrowLeft size={20} className="pointer" />
            </button>
          </div>
          <h2 className="text-center mb-4">Formulaire des commandes</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email :</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Entrez votre email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nom :</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Entrez votre nom"
              />
            </div>

            <PaymentComponent
              handleCheckout={handleCheckout}
              handleDeliveryCheckout={handleDeliveryCheckout}
              testCheckout={testCheckout}
            />

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="confirmation"
                name="confirmation"
                checked={formData.confirmation}
                onChange={handleChange}
              />
              <label htmlFor="confirmation" className="form-check-label">
                Je confirme que mes informations sont correctes.
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Validation en cours...' : 'Envoyer'}
            </button>

          </form>

          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
      </div>
    </div>
  );
}

export default ValidationCart;