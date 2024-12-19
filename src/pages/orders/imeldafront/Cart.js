
import React from 'react';
import '../../index.css';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, onAddQuantity, onSubtractQuantity, onRemoveFromCart }) {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleValidationRedirect = () => {
    navigate('/ValidationCart');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4 text-primary-emphasis">Votre panier</h2>
        
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
          Total : <span className="text-success">${total.toFixed(2)}</span>
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
  );
}

export default Cart;
