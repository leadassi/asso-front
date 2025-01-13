import React, { useEffect, useState } from "react";
import "./Livraisons.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Livraisons = () => {
  const navigate = useNavigate();
  const [livraisons, setLivraisons] = useState([]);
  const [status, setStatus] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  useEffect(() => {
    const fetchLivraisons = async () => {
      const idUtilisateur =  sessionStorage.getItem('utilisateurId');
      const idCommande = sessionStorage.getItem('idCommande');

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/Livraisonservices/livraisons/${idUtilisateur}/${idCommande}/`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des livraisons");
        }
        const data = await response.json();
        console.log(data);

        if (Array.isArray(data)) {
          setLivraisons(data);
          const initialStatus = {};
          data.forEach((livraison) => {
            initialStatus[livraison.id_commande] = "Encours";
          });
          setStatus(initialStatus);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des livraisons :", error);
      }
    };

    fetchLivraisons();
  }, []);

  // Fonction pour marquer une livraison comme effectuée
  const handleMarkAsDelivered = async (livraison) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/Livraisonservices/livraison_effectuee/",
        {
          method: "POST",
          headers: {
         "Content-Type": "application/json",
          },
          body: JSON.stringify({
            matricule: livraison.livreur?.matricule,
            id_client: 2,
            id_commande: livraison.id_commande,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la livraison");
      }

      const result = await response.json();
      console.log(result);

      // Mettre à jour l'état du statut après une livraison réussie
      setStatus((prevStatus) => ({
        ...prevStatus,
        [livraison.id_commande]: "Terminé",
      }));

      alert("Livraison marquée comme effectuée !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la livraison :", error);
      alert("Une erreur est survenue lors de la mise à jour.");
    }
  };

  return (
    <div className="container" style={{ marginTop: "10%" }}>
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "2000%", marginTop: "50px", marginBottom: "40px" }}>
        <button className="mb-3" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
          <FaArrowLeft />
        </button>

        <div className="table-responsive">
          <h1 className="page-title">Suivi de vos Livraisons</h1>

          {livraisons.length === 0 ? (
            <p>Aucune livraison disponible pour le moment.</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Image Livreur</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Produits</th>
                  <th>Destination</th>
                  <th>Coût</th>
                  <th>ID Commande</th>
                  <th>Date</th>
                  <th>QR Code</th>
                  <th>Statut/Marqué</th>
                </tr>
              </thead>
              <tbody>
                {livraisons.map((livraison) => (
                  <tr key={livraison.id_commande}>
                    <td>
                      <div className="livreur-info">
                        <img
                          src={livraison?.livreur?.image_url || "https://i.pinimg.com/736x/33/87/02/33870246ed45cd25d76b5224b4bd49df.jpg"}
                          alt={`${livraison?.livreur?.nom || "Livreur"} ${livraison?.livreur?.prenom || ""}`}
                          className="livreur-image animate-image"
                          onClick={() => handleImageClick(livraison?.livreur?.image_url || "https://i.pinimg.com/736x/33/87/02/33870246ed45cd25d76b5224b4bd49df.jpg")}
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "70%",
                            objectFit: "cover",
                            border: "2px solid #ccc",
                          }}
                        />
                      </div>
                    </td>
                    <td>{livraison?.livreur?.nom || "N/A"}</td>
                    <td>{livraison?.livreur?.prenom || "N/A"}</td>
                    <td>{livraison?.liste_produit || "N/A"}</td>
                    <td>{livraison?.destination || "N/A"}</td>
                    <td>{livraison?.cout ? `${livraison.cout} FCFA` : "N/A"}</td>
                    <td>{livraison?.id_commande || "N/A"}</td>
                    <td>{livraison?.date || "N/A"}</td>
                    <td>
                      {livraison?.qr_code ? (
                        <a
                          href={livraison.qr_code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="qr-code-link"
                        >
                          Voir le QR Code
                        </a>
                      ) : (
                        "Non disponible"
                      )}
                    </td>
                    <td>
                      <span className={`status-label ${status[livraison.id_commande] === "Terminé" ? "status-terminé" : "status-encours"}`}>
                        {status[livraison.id_commande]}
                      </span>
                      {status[livraison.id_commande] === "Encours" && (
                        <button
                          className="livré-button"
                          onClick={() => handleMarkAsDelivered(livraison)}
                        >
                          Livré
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {showModal && (
            <div className="modal" onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-button" onClick={closeModal}>
        
                </span>
                <img src={modalImage} alt="Livreur" className="modal-image" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Livraisons;
