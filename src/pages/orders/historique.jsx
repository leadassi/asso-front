import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';



const Historique = () => {
  const [commandes, setCommandes] = useState([]);
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

    const fetchCommandes = async () => {
      try {
        const response = await fetch(`http://192.168.88.161:8081/commande/utilisateur/${utilisateurId}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erreur ${response.status} : ${errorText}`);
        }

        const data = await response.json();
        setCommandes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommandes();
  }, []);

  return (
    <div className="container" style={{ marginTop: "10%" }}>
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '90%', marginTop:'50px' }}>
      <button className=" mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft /> 
      </button>

      <h2 className="mb-4">Historique des commandes</h2>
      <p className="text-muted" style={{color:"#666"}}>
        Vous trouverez ici vos commandes passées depuis la création de votre compte.
      </p>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Commande</th>
              <th>Date</th>
              <th>Prix Total</th>
              <th>Montant Livraison</th>
              <th>Paiement</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {commandes.length > 0 ? (
              commandes.map((commande) => (
                <tr key={commande.id}>
                  <td>{commande.id}</td>
                  <td>{new Date(commande.date).toLocaleDateString()}</td>
                  <td>{commande.prixTotal.toFixed(2)} FCFA</td>
                  <td>{commande.montantLivraison.toFixed(2)} frcs</td>
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
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                {loading ? <p>Chargement des commandes...</p> : <p>Aucune commande disponible.</p>}
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


export default Historique;
