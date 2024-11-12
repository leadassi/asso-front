import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../../utils/products';

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <div>Produit non trouvé</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Prix : ${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Ajouter au Panier</button>
    </div>
  );
}

export default ProductDetail;
