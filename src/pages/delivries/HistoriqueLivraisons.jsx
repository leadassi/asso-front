import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const HistoriqueLivraisons = () => {
  const [livraisons, setLivraisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const utilisateurId = sessionStorage.getItem('utilisateurId'); // Récupération de l'ID utilisateur
    console.log("ID utilisateur :", utilisateurId);

    if (!utilisateurId) {
      console.error("Aucun ID utilisateur trouvé dans le sessionStorage.");
      setError("Aucun ID utilisateur trouvé.");
      setLoading(false);
      
    }
    const id=2;

    const fetchLivraisons = async () => {
      try {
        // Envoi d'une requête GET
        const response = await fetch(`http://localhost:8000/Livraisonservices/historique/${id}/`, {
          method: 'GET', // Assure que la requête est bien un GET
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Erreur ${response.status}`);
        }

        const data = await response.json();
        if (data.message) {
          setLivraisons([]); // Aucune livraison trouvée
        } else {
          setLivraisons(data);
        }
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
        <p className="text-muted">
          Retrouvez ici l'historique de toutes vos livraisons effectuées.
        </p>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Commande N</th>
                <th>Date</th>
                <th>Qr Code</th>
                <th>Livreur</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Chargement des livraisons...
                  </td>
                </tr>
              ) : livraisons.length > 0 ? (
                livraisons.map((livraison) => (
                  <tr key={livraison.id_commande}>
                    <td>{livraison.id_commande}</td>
                    <td>{new Date(livraison.date).toLocaleString()}</td>
                    <td>
                      {livraison.qr_code ? (
                        <img 
                          src={livraison.qr_code} 
                          alt="QR Code" 
                          style={{ width: '50px', height: '50px' }} 
                        />
                      ) : (
                        "Non disponible"
                      )}
                    </td>
                    <td>{livraison.livreur_nom}</td>
                    <td>
                      <span className="badge bg-success">Effectuée</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Aucune livraison effectuée.
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
