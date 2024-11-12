// panier
import { Link } from 'react-router-dom';
import React from 'react';

function Cart({ cartItems, onRemoveFromCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>Panier</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => onRemoveFromCart(item.id)}>Retirer</button>
          </li>
        ))}
      </ul>
      <h3>Total : ${total.toFixed(2)}</h3>
      <p><Link to="/ValidationCart">formulaire de validation de la commande</Link></p>
    </div>
  );
}

export default Cart;