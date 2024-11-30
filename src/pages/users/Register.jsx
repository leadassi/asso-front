import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {

    const navigate = useNavigate();


      const quartiersParVille = {
        Maroua: ["Domayo", "Pitoaré", "Hardé", "Djarengol"],
        Garoua: ["Roumde Adjia", "Plateau", "Djidéo", "Yelwa"],
        Adamaoua: ["Ngaoundéré 1", "Ngaoundéré 2", "Dang"],
        Yaoundé: ["Bastos", "Mokolo", "Biyem-Assi", "Mvog-Ada"],
        Douala: ["Bonapriso", "Bonaberi", "Akwa", "Deido"],
        Bafoussam: ["Tamdja", "Banengo", "Djeleng", "Bamendzi"],
        Buea: ["Molyko", "Bonduma", "Small Soppo", "Great Soppo"],
        Bamenda: ["Nkwen", "Mile 2", "Mankon", "Mile 4"],
        Bertoua: ["Nkolbikon", "Bertoua Nord", "Tindamba"],
        Ebolowa: ["Nko'ovos", "Minko'o", "Ngoulemakong"],
      };

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    sexe: "",
    email: "",
    mot_passe: "",
    numerotelephone: "",
    pays: "",
    ville: "",
    quartier: "",
    BP: "",
  });

  const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "ville") {
        setFormData((prevData) => ({
          ...prevData,
          quartier: "", // Réinitialiser le quartier
        }));
      
  }
};

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await axios.post("http://localhost:9091/Utilisateurs/inscription", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.status === 200 || response.status === 201) {
          console.log("Inscription réussie :", response.data);
          setMessage("Inscription réussie !");
          navigate("/verification"); 
        } else {
          console.error("Erreur lors de l'inscription :", response.data);
          setMessage(response.data.message || "Une erreur est survenue.");
        }
      } catch (error) {
        console.error("Erreur réseau ou serveur :", error.response ? error.response.data : error.message);
        setMessage(error.response?.data?.message || "Erreur réseau ou serveur.");
    } finally {
        setLoading(false);
    }
    };

  

  return (
    <div className="cont" style={{marginTop:"150px", marginBottom:"150px"}}>
    <div className="container d-flex justify-content-center align-items-center vh-100" >
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '600px' }}>
      <div>
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft size={20} className="pointer"/>
        </button>
      </div>
      <fieldset className="container special">
        <h2 className="h2" style={{marginTop:"50px"}}>INSCRIPTION</h2>
        <br/>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-3 text-warning-emphasis">
            <label htmlFor="nomInput">Nom</label>
            <input
              type="text"
              name="nom"
              className="form-control border border-warning-subtle bg-warning-subtle"
              id="nomInput"
              placeholder="Saisir le nom"
              value={formData.nom}
              onChange={handleInputChange}
              required
            />
            <small className="form-text text-muted text-tertiary-emphasis"><i>Merci d'entrer un nom dont la taille variant entre 3 et 25.</i></small>
          </div>

          <div className="form-group mt-3 text-warning-emphasis">
            <label htmlFor="prenomInput">Prénom</label>
            <input
              type="text"
              name="prenom"
              className="form-control border border-warning-subtle bg-warning-subtle"
              id="prenomInput"
              placeholder="Saisir le prénom"
              value={formData.prenom}
              onChange={handleInputChange}
              required
            />
            <small className="form-text text-muted text-tertiary-emphasis"><i>Merci d'entrer un prénom dont la taille variant entre 3 et 25.</i></small>
          </div>

          <div className="form-group mt-3 text-warning-emphasis">
            <label>Sexe</label>
            <div>
              <input
                type="radio"
                name="sexe"
                value="masculin"
                id="masculin"
                onChange={handleInputChange}
                required
              />&nbsp;&nbsp;
              <label htmlFor="masculin">Masculin</label>
            &emsp; &emsp;
              <input
                type="radio"
                name="sexe"
                value="feminin"
                id="feminin"
                onChange={handleInputChange}
                required
              />&nbsp;&nbsp;
              <label htmlFor="feminin">Féminin</label>
            </div>
          </div>

          <div className="form-group mt-3 text-warning-emphasis">
            <label htmlFor="mailInput">Email</label>
            <input
              type="email"
              name="email"
              className="form-control border border-warning-subtle bg-warning-subtle"
              id="mailInput"
              placeholder="Saisir l'adresse email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <small className="form-text text-muted text-tertiary-emphasis"><i>Merci d'entrer un e-mail valide.</i></small>
          </div>

          <div className="form-group mt-3 text-warning-emphasis">
            <label htmlFor="passwordInput">Mot de passe</label>
            <input
              type="password"
              name="mot_passe"
              className="form-control border border-warning-subtle bg-warning-subtle"
              id="passwordInput"
              placeholder="Mot de passe"
              value={formData.mot_passe}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group mt-3 text-warning-emphasis">
            <label htmlFor="numeroInput">Numéro de téléphone</label>
            <div className="input-group">
  
          <div className="input-group-prepend">
            <span className="input-group-text border border-warning-subtle bg-warning-subtle">+237</span>
          </div>
            <input
              type="tel"
              name="numerotelephone"
              className="form-control border border-warning-subtle bg-warning-subtle"
              id="numeroInput"
              placeholder="Numéro de téléphone"
              value={formData.numerotelephone}
              onChange={handleInputChange}
              required
            />
          </div>
          </div>
          <br/>
          <div className="form-group mt-2 text-warning-emphasis">
            <label htmlFor="pays-selection">Choisissez votre pays:</label>
            <select
              name="pays"
              id="pays-selection"
              className="form-control border border-warning-subtle bg-warning-subtle"
              value={formData.pays}
              onChange={handleInputChange}
              required
            >
              <option value="">--Choisissez une option--</option>
              <option value="CM">Cameroun</option>
            </select>
          </div>
          <br/>
          <div className="form-group mt-1 text-warning-emphasis">
          <label htmlFor="ville-selection">Ville</label>
          <select
            name="ville"
            id="ville-selection"
            className="form-control border border-warning-subtle bg-warning-subtle"
            value={formData.ville}
            onChange={handleInputChange}
            required
          >
            <option value="">--Choisissez une option--</option>
            {Object.keys(quartiersParVille).map((ville) => (
              <option key={ville} value={ville}>
                {ville}
              </option>
            ))}
          </select>
        </div>

        
        <div className="form-group mt-3 text-warning-emphasis">
          <label htmlFor="quartier-selection">Quartier</label>
          {formData.ville ? (
            <select
              name="quartier"
              id="quartier-selection"
              className="form-control border border-warning-subtle bg-warning-subtle"
              value={formData.quartier}
              onChange={handleInputChange}
              required
            >
              <option value="">--Choisissez une option--</option>
              {quartiersParVille[formData.ville]?.map((quartier) => (
                <option key={quartier} value={quartier}>
                  {quartier}
                </option>
              ))}
            </select>
          ) : (
            <select className="form-control border border-warning-subtle bg-light" disabled>
              <option value="">Veuillez d'abord choisir une ville</option>
            </select>
          )}
        </div>

          <div className="form-group mt-3 text-warning-emphasis">
            <label htmlFor="BPInput">Boîte Postale</label>
            <input
              type="text"
              name="BP"
              className="form-control border border-warning-subtle bg-warning-subtle"
              id="BPInput"
              placeholder="BP"
              value={formData.BP}
              onChange={handleInputChange}
              required
            />
          </div>
          <br/>
          <button type="submit" className="btn  w-100" style={{ backgroundColor: '#D97706' }} onMouseEnter={(e) => (e.target.style.backgroundColor = '#b45309')} onMouseLeave={(e) => (e.target.style.backgroundColor = '#D97706')} disabled={loading}>
                        {loading ? "Inscription..." : "S'inscrire"}
                    </button>
        </form>

        {message && <div className="mt-3 alert alert-info">{message}</div>}

      </fieldset>

      </div>
    </div>
    </div>
  );
};

export default Register;
