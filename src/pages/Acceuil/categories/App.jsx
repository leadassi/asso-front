import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Api = () => {
  const [produits, setProduits] = useState([]);
  const [recommandations, setRecommandations] = useState([]);

  // Fonction pour récupérer les produits
  const fetchProduits = async () => {
    try {
      const response = await axios.get('http://localhost:5000/produitService/getAllProduits'); // API pour récupérer tous les produits
      const produitsData = response.data;
      // Sauvegarder dans localStorage
      localStorage.setItem('produits', JSON.stringify(produitsData));
      setProduits(produitsData);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
  };

  // Fonction pour récupérer les recommandations
  const fetchRecommandations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/recommandations'); // API pour récupérer les recommandations
      const recommandationsData = response.data;
      // Sauvegarder dans localStorage
      localStorage.setItem('recommandations', JSON.stringify(recommandationsData));
      setRecommandations(recommandationsData);
    } catch (error) {
      console.error('Erreur lors de la récupération des recommandations:', error);
    }
  };

  useEffect(() => {
    fetchProduits();
    fetchRecommandations();
  }, []);

  return (
    <div className="App">
      <h1>Produits et Recommandations</h1>
      
      <div>
        <h2>Recommandations</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID Produit</th>
              <th>ID Utilisateur</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {recommandations.map((recommandation) => (
              <tr key={recommandation.id}>
                <td>{recommandation.productId}</td>
                <td>{recommandation.userId}</td>
                <td>{recommandation.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Produits</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Catégorie</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit) => (
              <tr key={produit.id}>
                <td>{produit.id}</td>
                <td>{produit.name}</td>
                <td>{produit.description}</td>
                <td>{produit.price}</td>
                <td>{produit.quantity}</td>
                <td>{produit.category}</td>
                <td><img src={produit.imageUrl} alt={produit.name} style={{ width: '50px', height: '50px' }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Api;
