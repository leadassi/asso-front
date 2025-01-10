import React, { useState, useEffect } from 'react';
import '../../index.css';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, onAddQuantity, onSubtractQuantity, onRemoveFromCart }) {
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();
  
  // Récupérer l'ID de l'utilisateur depuis sessionStorage
  const userId = sessionStorage.getItem("utilisateurId");
  
  // Calcul du total du panier
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleValidationRedirect = () => {
    if (cartItems.length === 0) {
      setNotification("Votre panier est vide. Ajoutez des produits avant de valider la commande.");
      return;
    }

    // Vérifier si userId est disponible
    if (!userId) {
      setNotification("Utilisateur non identifié. Veuillez vous connecter.");
      return;
    }

    // Stocker les produits dans le sessionStorage en fonction de l'ID utilisateur
    sessionStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));

    // Vérification que les éléments ont bien été enregistrés
    const storedItems = JSON.parse(sessionStorage.getItem(`cartItems_${userId}`));

    if (storedItems && storedItems.length > 0) {
      // Déclencher l'événement personnalisé pour générer le QR Code
      const event = new CustomEvent("generateQRCode");
      window.dispatchEvent(event);
      setNotification("QR Code généré avec succès !");
    } else {
      setNotification("Aucun produit n'a été enregistré. Veuillez réessayer.");
      return;
    }

    // Rediriger vers la page de validation
    navigate('/choisir');
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('');
      }, 5000); // Cacher la notification après 5 secondes

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className='cont'>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '600px' }}>
          <h2 className="text-center mb-4 text-primary-emphasis">Votre panier</h2>

          {notification && (
            <div className="alert alert-warning text-center mb-4" role="alert">
              {notification}
            </div>
          )}

          <ul className="list-group mb-3">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center border border-warning-subtle bg-warning-subtle mb-2"
                >
                  <div>
                    <strong>{item.name}</strong>
                    <p className="mb-1 text-secondary">Quantité : {item.quantity}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => onAddQuantity(item.id)}
                      className="btn btn-sm btn-success me-1"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onSubtractQuantity(item.id)}
                      className="btn btn-sm btn-secondary me-1"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Retirer
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item text-center text-warning">
                Votre panier est vide.
              </li>
            )}
          </ul>

          <h3 className="text-center text-primary-emphasis">
            Total : <span className="text-success">{total.toFixed(2)} FCFA</span>
          </h3>

          <div className="d-flex justify-content-center mt-4">
            <button
              onClick={handleValidationRedirect}
              className="btn btn-warning px-4"
              style={{ backgroundColor: '#D97706' }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#b45309')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#D97706')}
            >
              Valider la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
