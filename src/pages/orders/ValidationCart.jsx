import React, { useState,/*useEffect*/ } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
//import PaymentComponent from './PaymentComponent';



{/*function PaymentComponen({ handleCheckout, handleDeliveryCheckout, testCheckout }) {
  return (
    <div className="d-flex justify-content-between mb-3">
      <button
        type="submit"
        className="btn btn-warning me-4"
        onClick={handleCheckout}
        
      >
        Paiement avant livraison
      </button>
      <button
        type="submit"
        className="btn btn-warning me-4"
        onClick={handleDeliveryCheckout}
      >
        Paiement après livraison
      </button>
      <button
        type="submit"
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
  //const [loading, setLoading] = useState(false);

  
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const paymentServiceURL = "http://192.168.227.101:9090/";
  const orderServiceURL = "http://192.168.227.101:8081/";
  const userId = 1; // Remplacez par la logique pour obtenir l'ID utilisateur
  const orderId = 26; // Remplacez par la logique pour obtenir l'ID commande

  useEffect(() => {
    if (!userId || !orderId) {
      console.error("User ID or Order ID is missing.");
      return;
    }
  }, [userId, orderId]);

  const handleCheckout = async () => {
    setFormData((prev) => ({ ...prev, paymentPreference: 'avant' }));
    console.log("Paiement avant livraison sélectionné.");

    

  // Fonctions auxiliaires
  const getPaymentData = async (userId) => {
    try {
      const response = await fetch(`${paymentServiceURL}cinetpaypayments/${userId}/${orderId}`);
      console.log("aaaaa");
      return response.json();
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };


  const reduceQuantity = async (orderId) => {
    try {
      const response = await fetch(`${paymentServiceURL}payments/orders/contenancepanier`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Product quantity reduced.");
    } catch (error) {
      console.error("Error reducing quantity:", error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`${orderServiceURL}commande/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Statut: status }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Order status updated.");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const sendPaymentRequest = async (orderId, status, paymentMethod, amount, userId) => {
    try {
      const response = await fetch(`${paymentServiceURL}payments/sendpayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          customer_id: userId,
          amount,
          payment_method: paymentMethod,
          payment_state: status,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Payment sent to delivery service.");
    } catch (error) {
      console.error("Error sending payment request:", error);
    }
  };

  const saveTransaction = async (orderId, status, paymentMethod, amount, userId) => {
    try {
      const response = await fetch(`${paymentServiceURL}payments/savepayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          customer_id: userId,
          amount,
          payment_method: paymentMethod,
          payment_state: status,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Transaction saved.");
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };




    const userData = await getPaymentData(userId);
    if (!window.CinetPay) {
      console.error("CinetPay not found.");
      return;
    }

    window.CinetPay.setConfig({
      apikey: userData.apikey,
      site_id: userData.siteId,
      notify_url: userData.notifyUrl,
      return_url: userData.returnUrl,
      mode: userData.mode,
    });

    window.CinetPay.getCheckout({
      transaction_id: userData.transactionId,
      amount: userData.amount,
      currency: userData.currency,
      channels: userData.channels,
      description: userData.description,
      customer_name: userData.customerName,
      customer_surname: userData.customerSurname,
      customer_email: userData.customerMail,
      customer_phone_number: userData.customerPhoneNumber,
      customer_address: userData.customerAddress,
      customer_city: userData.customerCity,
      customer_country: userData.customerCountry,
      customer_state: userData.customerState,
      customer_zip_code: userData.customerZipCode,
    });

    window.CinetPay.waitResponse(async (data) => {
      console.log("Response from CinetPay:", data);
      if (data.status === "ACCEPTED") {
        await reduceQuantity(orderId);
        await sendPaymentRequest(orderId, data.status, data.payment_method, data.amount, userId);
      }
      await updateOrderStatus(orderId, data.status);
      await saveTransaction(orderId, data.status, data.payment_method, data.amount, userId);
    });

    window.CinetPay.onError((data) => {
      console.error("Error from CinetPay:", data);
    });
  
  };

  const handleDeliveryCheckout = () => {
    setFormData((prev) => ({ ...prev, paymentPreference: 'apres' }));
    console.log("Paiement après livraison sélectionné.");


    // Fonctions auxiliaires
  const getPaymentData = async (userId) => {
    try {
      const response = await fetch(`${paymentServiceURL}cinetpaypayments/${userId}/${orderId}`);
      console.log("aaaaa");
      return response.json();
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };


  const reduceQuantity = async (orderId) => {
    try {
      const response = await fetch(`${paymentServiceURL}payments/orders/contenancepanier`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Product quantity reduced.");
    } catch (error) {
      console.error("Error reducing quantity:", error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`${orderServiceURL}commande/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Statut: status }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Order status updated.");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };


  const saveTransaction = async (orderId, status, paymentMethod, amount, userId) => {
    try {
      const response = await fetch(`${paymentServiceURL}payments/savepayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          customer_id: userId,
          amount,
          payment_method: paymentMethod,
          payment_state: status,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Transaction saved.");
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };



    getPaymentData(userId).then((userData) => {
      if (!window.CinetPay) {
        console.error("CinetPay n'est pas trouvé.");
        return;
      }

      window.CinetPay.setConfig({
        apikey: userData.apikey,
        site_id: userData.siteId,
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
        customer_email: userData.customer_email,
        customer_phone_number: userData.customer_phone_number,
        customer_address: userData.customer_address,
        customer_city: userData.customer_city,
        customer_country: userData.customer_country,
        customer_state: userData.customer_state,
        customer_zip_code: userData.customer_zip_code,
      });

      window.CinetPay.waitResponse(async (data) => {
        console.log("Réponse de CinetPay:", data);

        if (data.status === "REFUSED") {
          alert("Votre paiement a échoué");
        } else if (data.status === "ACCEPTED") {
          await reduceQuantity(orderId);
          alert("Votre paiement a été effectué avec succès");
        }
        await updateOrderStatus(userData.transaction_id, "IN_PROGRESS");
        await saveTransaction(userData.transaction_id, data.status, data.payment_method, data.amount, userId);
      });

      window.CinetPay.onError((data) => {
        console.error("Erreur de CinetPay:", data);
      });
    });

  };

  const testCheckout = () => {
    setFormData((prev) => ({ ...prev, paymentPreference: 'sans' }));
    console.log("Test sans paiement sélectionné.");


      // Fonctions auxiliaires
  const getPaymentData = async (userId) => {
    try {
      const response = await fetch(`${paymentServiceURL}cinetpaypayments/${userId}/${orderId}`);
      console.log("aaaaa");
      return response.json();
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };


  const reduceQuantity = async (orderId) => {
    try {
      const response = await fetch(`${paymentServiceURL}payments/orders/contenancepanier`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Product quantity reduced.");
    } catch (error) {
      console.error("Error reducing quantity:", error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`${orderServiceURL}commande/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Statut: status }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Order status updated.");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };



  const saveTransaction = async (orderId, status, paymentMethod, amount, userId) => {
    try {
      const response = await fetch(`${paymentServiceURL}payments/savepayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          customer_id: userId,
          amount,
          payment_method: paymentMethod,
          payment_state: status,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Transaction saved.");
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };


    
      getPaymentData(userId).then((userData) => {
        updateOrderStatus(userData.transaction_id, "ACCEPTED");
        reduceQuantity(orderId);
        saveTransaction(userData.transaction_id, "ACCEPTED", "OMCM", userData.amount, userId);
      });
    
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
    //setLoading(true);

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

      const panierResponse = await fetch('http://192.168.227.101:8081/commande/panier/validerPanier', {
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

      const commandeResponse = await fetch('http://192.168.227.101:8081/commande/validercmd', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commande),
      });

      if (!commandeResponse.ok) {
        throw new Error(`Erreur lors de la validation de la commande : ${commandeResponse.statusText}`);
      }

      const idCommande  = await commandeResponse.text();
      console.log("Commande validée. ID de commande :", idCommande);

      const factureResponse = await fetch(`http://192.168.227.101:8081/commande/email/envoyer-facture/${idCommande}`,{
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
      //setLoading(false);
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
            maxWidth: '500px',
            minHeight: '400px',
          }}
        >
          <div>
            <button onClick={() => navigate(-1)}>
              <FaArrowLeft size={20} className="pointer" />
            </button>
          </div>
          <h2 className="text-center mb-4">Formulaire des commandes</h2>
          <br/>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-warning-emphasis">Email :</label>
              <input
                type="email"
                className="form-control border border-warning-subtle bg-warning-subtle"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Entrez votre email"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-warning-emphasis">Nom :</label>
              <input
                type="text"
                className="form-control border border-warning-subtle bg-warning-subtle"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Entrez votre nom"
              />
            </div>
            <br/>
            <PaymentComponen
              handleCheckout={handleCheckout}
              handleDeliveryCheckout={handleDeliveryCheckout}
              testCheckout={testCheckout}
            />
            <br/>
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
            <br/>
            <button
              type="submit"
              className="btn  w-100" style={{ backgroundColor: '#D97706' }} onMouseEnter={(e) => (e.target.style.backgroundColor = '#b45309')} onMouseLeave={(e) => (e.target.style.backgroundColor = '#D97706')}
              //disabled={loading}
            >
              envoyer
            </button>

          </form>

          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
      </div>
    </div>
  );
}*/}

function PaymentComponent({ checkout, DeliveryCheckout, testCheckout }) {
  return (
    <div className="d-flex justify-content-between mb-3">
      <button
        type="button"
        className="btn btn-warning me-4"
        onClick={checkout}
      >
        Paiement avant livraison
      </button>
      <button
        type="button"
        className="btn btn-warning me-4"
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
            maxWidth: '500px',
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
              <label htmlFor="email" className="form-label text-warning-emphasis">Email :</label>
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
              <label htmlFor="name" className="form-label text-warning-emphasis">Nom :</label>
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

            <div className="mb-1 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="confirmation"
                name="confirmation"
                checked={formData.confirmation}
                onChange={handleChange}
              />
              <label htmlFor="confirmation" className="form-check-label ml-3">
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