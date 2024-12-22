import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

function ValidationCart({ cartItems, userId }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    paymentPreference: '',
    confirmation: false,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.name || !formData.paymentPreference) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
  
    if (!formData.confirmation) {
      setError("Veuillez confirmer vos informations avant de soumettre.");
      return;
    }
  
    setError('');
    setLoading(true);
  
    // Calcul du prix total
    const prixTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
    // Préparation des données du panier
    const panier = {
      idUtilisateur: userId,
      prixTotal: prixTotal,
      contenances: [],
    };
  
    try {
      // 1. Envoyer le panier
      const panierResponse = await axios.post('http://192.168.93.234:8081/commande/panier/validerPanier', panier, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (panierResponse.status !== 201) {
        throw new Error("Erreur lors de la création du panier.");
      }
  
      const panierId = panierResponse.data; // ID du panier retourné par le backend
      console.log("Panier créé avec l'ID :", panierId);
  
      // 2. Préparation des contenances
      const contenances = cartItems.map((item) => ({
        idProduit: item.id,
        quantite: item.quantity,
        idPanier: panierId, // Associer les contenances au panier
      }));
  
      // 3. Envoyer les contenances
      const contenancesResponse = await axios.post('http://192.168.93.234:8081/commande/contenances/enregistrer', contenances, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (contenancesResponse.status !== 201) {
        throw new Error("Erreur lors de l'ajout des contenances.");
      }
  
      console.log("Contenances ajoutées :", contenancesResponse.data);
  
      // 4. Préparation et envoi de la commande
      const commande = {
        idUtilisateur: userId,
        idPanier: panierId, // Associer la commande au panier
        montantLivraison: 5.0,
        prixTotal: prixTotal + 5.0,
        statutCommande: 'NULL',
        date: new Date().toISOString(),
      };
  
      const commandeResponse = await axios.post('http://192.168.93.234:8081/commande/validercmd', commande, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (commandeResponse.status === 201) {
        const { idCommande } = commandeResponse.data;
        console.log("Commande validée. ID de commande :", idCommande);
  
        // Stocker l'ID de la commande dans sessionStorage
        sessionStorage.setItem('idCommande', idCommande);
        sessionStorage.setItem('idPanier', panierId);
  
        setSuccess("Commande validée avec succès !");
        setTimeout(() => navigate('/orders'), 3000);
      } else {
        throw new Error(`Erreur HTTP: ${commandeResponse.status}`);
      }
    } catch (err) {
      console.error("Erreur lors du traitement :", err);
      setError("Impossible de compléter l'opération. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cont">
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
            <div className="mb-3 text-warning-emphasis">
              <label htmlFor="email" className="form-label">Email :</label>
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

            <div className="mb-3 text-warning-emphasis">
              <label htmlFor="name" className="form-label">Nom :</label>
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

            {/* Ajout des boutons pour les moyens de paiement */}
            <div className="d-flex justify-content-between">
              <button
                type="button"
                id="checkoutBtn1"
                className="btn"
                style={{
                  backgroundColor: '#D97706',
                  width: '48%',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#b45309')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#D97706')}
                onClick={() => setFormData((prev) => ({ ...prev, paymentPreference: 'avant' }))}
              >
                Paiement avant livraison
              </button>
              <button
                type="button"
                id="checkoutBtn2"
                className="btn"
                style={{
                  backgroundColor: '#D97706',
                  width: '48%',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#b45309')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#D97706')}
                onClick={() => setFormData((prev) => ({ ...prev, paymentPreference: 'apres' }))}
              >
                Paiement après livraison
              </button>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="confirmation"
                name="confirmation"
                checked={formData.confirmation}
                onChange={handleChange}
              />
              <label htmlFor="confirmation" className="form-check-label text-warning-emphasis">
                Je confirme que mes informations sont correctes.
              </label>
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: '#D97706' }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#b45309')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#D97706')}
              disabled={loading}
            >
              {loading ? 'Validation en cours...' : 'Envoyer'}
            </button>
          </form>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
      </div>

      <footer
        className="text-center p-2"
        style={{
          backgroundColor: '#f8f9fa',
          fontSize: '14px',
          marginTop: '-20px',
          height: '50px',
        }}
      >
        <a
          href="/about"
          style={{
            textDecoration: 'underline',
            color: '#000',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#D4AF37')}
          onMouseLeave={(e) => (e.target.style.color = '#000')}
        >
          About Us
        </a>
      </footer>
    </div>
  );
}

export default ValidationCart;