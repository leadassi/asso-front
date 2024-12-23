import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';




const Historique = () => {
    
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const response = await fetch("http://localhost:8080/orders")
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des commandes");
        }

        const data = await response.json();
        setCommandes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }};

      fetchCommandes();
    }, []);

    if (loading) {
      return <p>Chargement des commandes...</p>;
    }
  
    if (error) {
      return <p>Erreur : {error}</p>;
    }

  return (
    <div className="container" style={{marginTop:"30%"}}>
      {/*<div className="card shadow-lg p-4 w-100" style={{ maxWidth: '500px', marginTop:'50px' }}>*/}
      <button className=" mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft /> 
      </button>

      {/* Titre */}
      <h2 className="mb-4">Historique des commandes</h2>

      <p className="text-muted">
          Vous trouverez ici vos commandes passées depuis la creation de votre compte.
        </p>
        <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Commande</th>
              <th>Date</th>
              <th>Prix Total</th>
              <th>Paiement</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
          {commandes.map((commande) => (
          <tr key={commande.id}>
            <td>{commande.id}</td>
            <td>{new Date(commande.date).toLocaleDateString()}</td>
            <td>{commande.totalPrice.toFixed(2)} €</td>
            <td>{commande.paymentMethod}</td>
                  <td>
                    <span
                      className={`badge ${
                        commande.status === "Livré"
                          ? "bg-success"
                          : commande.status === "En cours"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {commande.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>
    
  );
};

export default Historique;
