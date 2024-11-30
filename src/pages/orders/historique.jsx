import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from "axios";



const Historique = () => {
    
    const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/orders") 
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des commandes :", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      {/* Bouton Retour */}
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
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>{order.totalPrice.toFixed(2)} €</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "Livré"
                          ? "bg-success"
                          : order.status === "En cours"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Aucune commande trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    
    </div>
  );
};

export default Historique;
