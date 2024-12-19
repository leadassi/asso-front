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

    const panier = {
      idUtilisateur: userId,
      prixTotal: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    const commande = {
      idUtilisateur: userId,
      montantLivraison: 5.0,
      prixTotal: panier.prixTotal + 5.0,
      statutCommande: 'VALIDÉE',
    };

    const contenances = cartItems.map((item) => ({
      idProduit: item.id,
      quantite: item.quantity,
    }));

    const requestBody = {
      commande,
      panier,
      contenances,
    };

    try {
      const response = await axios.post('/api/commandes/create', requestBody);

      if (response.status === 200) {
        setSuccess("Commande validée avec succès !");
        setTimeout(() => navigate('/orders'), 3000);
      }
    } catch (err) {
      console.error("Erreur lors de la validation de la commande :", err);
      setError("Impossible de valider la commande. Veuillez réessayer.");
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
            maxWidth: '350px', // Réduction de la largeur
            minHeight: '400px', // Réduction de la hauteur
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

            <div className="mb-3 text-warning-emphasis">
              <label htmlFor="paymentPreference" className="form-label">Préférence de paiement :</label>
              <select
                id="paymentPreference"
                name="paymentPreference"
                className="form-select border border-warning-subtle bg-warning-subtle"
                value={formData.paymentPreference}
                onChange={handleChange}
                required
              >
                <option value="">-- Sélectionnez une option --</option>
                <option value="avant">Avant la livraison</option>
                <option value="apres">Après la livraison</option>
              </select>
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
          marginTop: '-20px', // Réduction de l'espace
          height: '50px', // Réduction de la hauteur du footer
        }}
      >
        <a
          href="/about"
          style={{
            textDecoration: 'underline',
            color: '#000',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#D4AF37')} // Couleur dorée au survol
          onMouseLeave={(e) => (e.target.style.color = '#000')}
        >
          About Us
        </a>
      </footer>
    </div>
  );
}

export default ValidationCart;
