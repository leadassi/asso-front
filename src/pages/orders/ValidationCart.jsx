import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


/*function PaymentComponent({ handleCheckout, handleDeliveryCheckout, testCheckout }) {
  return (
    <div className="d-flex justify-content-between mb-3">
      <button
        type="button"
        className="btn btn-warning"
        onClick={handleCheckout}
      >
        Paiement avant livraison
      </button>
      <button
        type="button"
        className="btn btn-warning"
        onClick={handleDeliveryCheckout}
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
}*/

function ValidationCart() {
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const cartItems = state?.cartItems || [];
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    confirmation: false,
    //paymentPreference: '', // Stocke le type de paiement sélectionné
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  
  
  
    // URLs des services
    const paymentServiceURL = "http://192.168.88.62:9090/";
    const orderServiceURL = "http://localhost:8081/";
  
    // Récupération des données depuis sessionStorage
    //const userId = sessionStorage.getItem("utilisateurId");
    const orderId = sessionStorage.getItem("idCommande");
  
    /*if (!userId || !orderId) {
      console.error("User ID ou Order ID manquant dans sessionStorage.");
      return <p>Erreur : Identifiant utilisateur ou commande non trouvé.</p>;
    }*/
  
    // Fonction pour récupérer les données de paiement
    const getPaymentData = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        return null;
      }
    };
  
    // Réduire la quantité des produits dans une commande
   /* const reduceQuantity = async (orderId) => {
      try {
        const response = await fetch(`${paymentServiceURL}payments/orders/contenancepanier`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: orderId }),
        });
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        console.log("Quantité mise à jour avec succès.");
      } catch (error) {
        console.error("Erreur lors de la mise à jour des quantités:", error);
      }
    };*/
  
    // Mettre à jour le statut d'une commande
    const updateOrderStatus = async (orderId, status) => {
      try {
        const response = await fetch(`${orderServiceURL}commande/historique-commandes/${orderId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ statutCommande: status }),
        });
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        console.log("Statut de commande mis à jour.");
      } catch (error) {
        console.error("Erreur lors de la mise à jour du statut:", error);
      }
    };
  
    // Sauvegarder la transaction
    const saveTransaction = async (orderId, status, paymentMethod, amount) => {
      try {
        const response = await fetch(`${paymentServiceURL}payments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: orderId,
            customer_id: 1,
            amount: amount,
            payment_method: paymentMethod,
            payment_state: status,
          }),
        });
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        console.log("Transaction sauvegardée.");
      } catch (error) {
        console.error("Erreur lors de la sauvegarde de la transaction:", error);
      }
    };
  
    // Gérer le paiement standard
    const handleCheckout = async () => {
      const userData = await getPaymentData(`${paymentServiceURL}cinetpaypayments/1/${orderId}`);
      if (!userData) return;
  
      if (window.CinetPay) {
        window.CinetPay.setConfig({
          apikey: userData.apikey,
          site_id: userData.site_id,
          notify_url: userData.notify_url,
          return_url: userData.return_url,
          mode: userData.mode,
        });
  
        window.CinetPay.getCheckout({
          transaction_id: userData.transaction_id,
          amount: userData.amount,
          currency: userData.currency,
          channels: userData.channels,
          description: userData.description,
          customer_name: userData.customer_name,
          customer_surname: userData.customer_surname,
          customer_email: userData.customer_mail,
          customer_phone_number: userData.customer_phone_number,
          customer_address: userData.customer_address,
          customer_city: userData.customer_city,
          customer_country: userData.customer_country,
          customer_state: userData.customer_state,
          customer_zip_code: userData.customer_zip_code,
        });
  
        window.CinetPay.waitResponse(async (data) => {
          console.log(data);
  
          if (data.status === "REFUSED") {
            alert("Votre paiement a échoué");
            window.location.reload();
          } else if (data.status === "ACCEPTED") {
            //await reduceQuantity(orderId);
            alert("Votre paiement a été effectué avec succès");
            window.location.reload();
          }
          await updateOrderStatus(userData.transaction_id, data.status);
          await saveTransaction(
            userData.transaction_id,
            data.status,
            data.payment_method,
            userData.amount
          );
        });
  
        window.CinetPay.onError((data) => {
          console.error(data);
        });
      } else {
        console.error("CinetPay library is not loaded.");
      }
    };
  
    // Gérer le paiement à la livraison
    const handleDeliveryCheckout = async () => {
      const userData = await getPaymentData(`${paymentServiceURL}cinetpaydeliverypayments/1/${orderId}`);
      if (!userData) return;
  
      if (window.CinetPay) {
        window.CinetPay.setConfig({
          apikey: userData.apikey,
          site_id: userData.site_id,
          notify_url: userData.notify_url,
          return_url: userData.return_url,
          mode: userData.mode,
        });
  
        window.CinetPay.getCheckout({
          transaction_id: userData.transaction_id,
          amount: userData.amount,
          currency: userData.currency,
          channels: userData.channels,
          description: userData.description,
          customer_name: userData.customer_name,
          customer_surname: userData.customer_surname,
          customer_email: userData.customer_mail,
          customer_phone_number: userData.customer_phone_number,
          customer_address: userData.customer_address,
          customer_city: userData.customer_city,
          customer_country: userData.customer_country,
          customer_state: userData.customer_state,
          customer_zip_code: userData.customer_zip_code,
        });
  
      window.CinetPay.waitResponse(async (data) => {
        if (data.status === "REFUSED") {
          alert("Votre paiement a échoué.");
        } else if (data.status === "ACCEPTED") {
          alert("Paiement de livraison réussi.");
          //await reduceQuantity(orderId);
        }
        await updateOrderStatus(orderId, "IN_PROGRESS");
        await saveTransaction(orderId, data.status, data.payment_method, data.amount);
      });
  
      window.CinetPay.onError((error) => {
        console.error("Erreur avec CinetPay:", error);
      });
    }};
  
    const testCheckout = async () => {
      const userData = await getPaymentData(`${paymentServiceURL}cinetpaypayments/1/${orderId}`);
      //await reduceQuantity(orderId);
      await updateOrderStatus(orderId, 'ACCEPTED');
      await saveTransaction(orderId, 'ACCEPTED', 'OMCM', userData.amount, 1);
    }
  



  
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  /*const handleCheckout = () => {
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
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (!formData.email || !formData.name){ //|| !formData.paymentPreference) {
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
      const prixTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

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

      const panierResponse = await fetch('http://localhost:8081/commande/panier/validerPanier', {
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

      const commandeResponse = await fetch('http://localhost:8081/commande/validercmd', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commande),
      });

      if (!commandeResponse.ok) {
        throw new Error(`Erreur lors de la validation de la commande : ${commandeResponse.statusText}`);
      }

      const idCommande  = await commandeResponse.text();
      console.log("Commande validée. ID de commande :", idCommande);

      const factureResponse = await fetch(`http://localhost:8081/commande/email/envoyer-facture/${idCommande}`,{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
      });

      if (!factureResponse.ok) {
        throw new Error(`Erreur lors de l'envoie de la facture : ${factureResponse.statusText}`);
      }

      

      sessionStorage.setItem('idCommande', idCommande);
      sessionStorage.setItem('idPanier', idPanier);

      setSuccess("Commande validée avec succès !");
      setTimeout(() => navigate('/orders'), 3000);
    } catch (err) {
      console.error("Erreur :", err);
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

            {/*<PaymentComponent
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
            </button>*/}

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

            <button onClick={handleCheckout} disabled={loading}>Paiement Standard</button>
      <button onClick={handleDeliveryCheckout} disabled={loading}>Paiement Livraison</button>
      <button onClick={testCheckout} disabled={loading}>Poursuivre le test sans payer</button>

          </form>

          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
      </div>
    </div>
  );
}

export default ValidationCart;