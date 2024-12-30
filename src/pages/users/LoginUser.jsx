import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";


axios.defaults.withCredentials = true;

const LoginUser = () => {

  const [email, setEmail] = useState('');
  const [mot_passe, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
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
      const response = await fetch('http://localhost:9091/Utilisateurs/csrf-token', {
        method: 'GET',
        credentials: 'include', // Inclut les informations de session (cookies)
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération du jeton CSRF : ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Réponse du jeton CSRF:', data);

      if (data.token) {
        return data.token.replace(/"/g, ''); // Renvoie le jeton CSRF récupéré
      }

      throw new Error('Jeton CSRF non trouvé dans la réponse.');
    } catch (err) {
      console.error('Erreur lors de la récupération du jeton CSRF :', err);
      throw err;
    }
  };

  // Soumettre le formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !mot_passe) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    try {
      // Récupérer le jeton CSRF
      const csrfToken = await fetchCsrfToken();

      // Ajouter les informations d'authentification Basic
      const username = 'user'; // Nom d'utilisateur Basic Auth
      const password = 'password123'; // Mot de passe Basic Auth
      const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

      // Effectuer la requête POST pour la connexion
      const response = await fetch('http://localhost:9091/Utilisateurs/connexion', {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'X-CSRF-TOKEN': csrfToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, mot_passe }),
        credentials: 'include', // Inclure les cookies dans la requête
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Connexion réussie:', data);
      
      // Sauvegarder les informations utilisateur dans le localStorage
      sessionStorage.setItem('utilisateurId', JSON.stringify(data.id));
      sessionStorage.setItem('utilisateurNom', JSON.stringify(data.nom));
      sessionStorage.setItem('utilisateurPrenom', JSON.stringify(data.prenom));

     
      navigate("/Acceuil"); 
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError('Une erreur est survenue.');
    }
  };

  return (
    <div className='cont'>
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '500px' }}>
      <div>
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft size={20} className="pointer"/>
        </button>
      </div>
        <h2 className="text-center mb-4">Connexion</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3 text-warning-emphasis">
            <label htmlFor="email" className="form-label">Email :</label>
            <input
              type="email"
              className="form-control border border-warning-subtle bg-warning-subtle"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Entrez votre email"
            />
          </div>

          <div className="mb-4 text-warning-emphasis">
            <label htmlFor="mot_passe" className="form-label">Mot de passe :</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control border border-warning-subtle bg-warning-subtle"
              id="mot_passe"
              name="mot_passe"
              value={mot_passe}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Entrez votre mot de passe"
            />
            <span
          onClick={handleTogglePassword}
          style={{
            position: "absolute",
            right: "35px",
            top: "54%",
            transform: "translateY(50%)",
            cursor: "pointer",
            color: "#ffc107",
          }}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
          </div>

        
          <button type="submit" className="btn  w-100" style={{ backgroundColor: '#D97706' }} onMouseEnter={(e) => (e.target.style.backgroundColor = '#b45309')} onMouseLeave={(e) => (e.target.style.backgroundColor = '#D97706')}>
            Se connecter
          </button>
        </form>

  
        {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}

       
        <div className="mt-4 text-center">
          <a href="/reconnection" className="d-block mb-2 text-decoration-none text-warning-emphasis">
            Mot de passe oublié ?
          </a>
          <a href="/inscription" className="d-block text-decoration-none text-warning-emphasis">
            S'inscrire ?
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};



export default LoginUser;