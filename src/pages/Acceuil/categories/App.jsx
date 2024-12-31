import React, { useState, useEffect } from 'react';
import './App.css';


const Api = () => {
  const [produits, setProduits] = useState([]);
  const [recommandations, setRecommandations] = useState([]);

  // Fonction pour récupérer les produits
  const fetchProduits = async () => {
    try {
      const response = await fetch('http://192.168.88.23:8080/produitService/getAllProduits', {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*', // Permet de gérer CORS pour les requêtes vers l'API
        },
      });
      const produitsData = await response.json();
      console.log('Produits:', produitsData);

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
      const response = await fetch('http://192.168.88.129:8082/recommandations', {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*', // Permet de gérer CORS pour les requêtes vers l'API
        },
      });
      const recommandationsData = await response.json();
      const formattedRecommandations = recommandationsData.map((recommandation) => ({
        id: recommandation.id,
        name: recommandation.name,
        description: recommandation.description,
        price: recommandation.price,
        quantity: recommandation.quantity,
        category: recommandation.category,
        imageUrl: recommandation.imageUrl,
        subCategory: recommandation.subCategory,
        idFournisseur: recommandation.idFournisseur,
      }));
      console.log('Recommandations:', formattedRecommandations);

      // Sauvegarder dans localStorage
      localStorage.setItem('recommandations', JSON.stringify(formattedRecommandations));
      setRecommandations(formattedRecommandations);
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

      {/* Tableau des recommandations */}
      <div>
        <h2>Recommandations</h2>
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
              <th>Sub-Catégorie</th>
              <th>ID Fournisseur</th>
            </tr>
          </thead>
          <tbody>
            {recommandations.map((recommandation) => (
              <tr key={recommandation.id}>
                <td>{recommandation.id}</td>
                <td>{recommandation.name}</td>
                <td>{recommandation.description}</td>
                <td>{recommandation.price}</td>
                <td>{recommandation.quantity}</td>
                <td>{recommandation.category}</td>
                <td>
                  <img
                    src={recommandation.imageUrl}
                    alt={recommandation.name}
                    style={{ width: '50px', height: '50px' }}
                  />
                </td>
                <td>{recommandation.subCategory}</td>
                <td>{recommandation.idFournisseur}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tableau des produits */}
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
              <th>SubCatégorie</th>
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
                <td>{produit.subCategory}</td>
                <td>
                  <img
                    src={produit.imageUrl}
                    alt={produit.name}
                    style={{ width: '50px', height: '50px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Api;
