import React from 'react';
import { Link } from 'react-router-dom';
import products from '../../utils/products';

function Home() {
  return (
    <div>
      <h2>Catalogue de Produits</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.name}</Link> - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
