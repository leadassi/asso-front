import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const HistoriqueLivraisons = () => {
  const [livraisons, setLivraisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const utilisateurId = sessionStorage.getItem('utilisateurId');
    console.log("ID utilisateur :", utilisateurId);

    if (!utilisateurId) {
      console.error("Aucun ID utilisateur trouvé dans le sessionStorage.");
      setError("Aucun ID utilisateur trouvé.");
      setLoading(false);
      return;
    }

    const fetchLivraisons = async () => {
      try {
        const response = await fetch(`http://192.168.107.234:8082/livraison/utilisateur/${utilisateurId}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erreur ${response.status} : ${errorText}`);
        }

        const data = await response.json();
        setLivraisons(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des livraisons :", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLivraisons();
  }, []);

  return (
    <div className="container" style={{ marginTop: "10%" }}>
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '90%', marginTop: '50px' }}>
        <button className="mb-3" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <h2 className="mb-4">Historique des Livraisons</h2>
        <p className="text-muted" style={{ color: "#666" }}>
          Retrouvez ici l'historique de toutes vos livraisons effectuées.
        </p>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Commande</th>
                <th>Date</th>
                <th>Qr_code</th>
                <th>Livreur</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {livraisons.length > 0 ? (
                livraisons.map((livraison) => (
                  <tr key={livraison.idLivraison}>
                    <td>{livraison.idCommande}</td>
                    <td>{new Date(livraison.date).toLocaleDateString()}</td>
                    <td>
                      <img 
                        src={livraison.qr_code} 
                        alt="QR Code" 
                        style={{ width: '50px', height: '50px' }} 
                      />
                    </td>
                    <td>{livraison.livreur_nom}</td>
                    <td>
                      <span
                        className={`badge ${
                          livraison.statut === "DELIVERED"
                            ? "bg-success"
                            : livraison.statut === "INPROGRESS"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                      >
                        {livraison.statut}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    {loading ? <p>Chargement des livraisons...</p> : <p>Aucune livraison disponible.</p>}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {error && <p style={{ color: "red", fontWeight: "bold" }}>Erreur : {error}</p>}
      </div>
    </div>
  );
};

export default HistoriqueLivraisons;
