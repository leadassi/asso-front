import React from 'react';
import { Link } from 'react-router-dom';
import products from '../../utils/products';



const Home = () => {
  

  return (
    <div>
      <h2>Catalogue de produits</h2>
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
