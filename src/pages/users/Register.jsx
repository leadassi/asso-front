import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
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

  const [showPassword, setShowPassword] = useState(false);

  // Fonction pour afficher temporairement le mot de passe
  const handleTogglePassword = () => {
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 1000); // 1 seconde pour afficher le mot de passe
  };

  const fetchCsrfToken = async () => {
    try {
      const response = await fetch("http://localhost:9091/Utilisateurs/csrf-token", {
        method: "GET",
        credentials: "include", // Inclut les cookies (sessions)
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération du jeton CSRF : ${response.statusText}`);
      }
  
      const data = await response.json();
      if (data.token) {
        return data.token.replace(/"/g, ''); // Renvoie uniquement la valeur du token CSRF
      }
      throw new Error("Jeton CSRF non trouvé dans la réponse.");
    } catch (error) {
      console.error("Erreur lors de la récupération du jeton CSRF :", error);
      throw error;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Récupérer le jeton CSRF
      const csrfToken = await fetchCsrfToken();
  
      // Ajouter l'en-tête Authorization avec Basic Auth
      const username = 'user'; // Nom d'utilisateur Basic Auth
      const password = 'password123'; // Mot de passe Basic Auth
      const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
  
      // Effectuer la requête POST avec le jeton CSRF et Basic Auth
      const response = await fetch("http://localhost:9091/Utilisateurs/inscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Inclure le token CSRF
          Authorization: authHeader, // Ajouter Basic Auth
        },
        body: JSON.stringify(formData),
        credentials: "include", // Inclure les cookies (sessions)
      });
  
      if (response.ok) {
        const responseText = await response.text(); // Récupère la réponse brute
      const data = responseText ? JSON.parse(responseText) : null; // Parse seulement si non vide

      console.log("Inscription réussie :", data);

      // Message de succès et redirection
      setMessage("Inscription réussie !");
      sessionStorage.setItem("utilisateur", JSON.stringify(data.utilisateur));
      sessionStorage.setItem("email",formData.email);

      navigate("/verification"); // Rediriger vers une page de vérification
    } else {
      const responseText = await response.text();
        //const errorData = await response.json();
        const errorData = responseText ? JSON.parse(responseText) : { message: "Une erreur est survenue." };
        console.log(formData.BP)
        console.error("Erreur lors de l'inscription :", errorData);
  
        // Afficher un message d'erreur propre sans `window.alert`
        setMessage(errorData.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur réseau ou serveur :", error.message);
      
      // Afficher une erreur propre sans `window.alert`
      setMessage("Erreur réseau ou serveur.");
    } finally {
      setLoading(false);
    }
  };
  

  

  return (
    <div className="cont">
    <div className="container d-flex justify-content-center align-items-center " style={{marginTop:"30%"}}>
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '600px' }}>
      <div>
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft size={20} className="pointer"/>
        </button>
      </div>
      <fieldset className="container special">
        <h2 className="h2 text-dark mb-4" style={{marginTop:"50px"}}>INSCRIPTION</h2>
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
            <div className="d-flex align-items-center form-check form-check-inline">
              <input 
                type="radio"
                name="sexe"
                value="masculin"
                id="masculin"
                onChange={handleInputChange}
                required
              />
              <label htmlFor="masculin">Masculin</label>
            
              <input
                type="radio"
                name="sexe"
                value="feminin"
                id="feminin"
                onChange={handleInputChange}
                required
              />
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

          
          <div className="form-group mt-3 text-warning-emphasis" style={{ position: "relative" }}>
        <label htmlFor="passwordInput">Mot de passe</label>
        <input
          type={showPassword ? "text" : "password"}
          name="mot_passe"
          className="form-control border border-warning-subtle bg-warning-subtle"
          id="passwordInput"
          placeholder="Mot de passe"
          value={formData.mot_passe}
          onChange={handleInputChange}
          required
        />
        <span
          onClick={handleTogglePassword}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(50%)",
            cursor: "pointer",
            color: "#ffc107",
          }}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
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
