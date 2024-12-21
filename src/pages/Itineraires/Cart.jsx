import React from "react";

const Cart = ({ cartItems, onRemoveFromCart }) => {
  return (
    <div>
      <h1>Panier</h1>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price} €
              <button onClick={() => onRemoveFromCart(item.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
