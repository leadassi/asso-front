import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../App.js";

const Reregister = () => {
  const [email, setEmail] = useState(''); 
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState(''); 
  const [code, setCode] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [error, setError] = useState(''); 

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/connection"); 
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !nouveauMotDePasse || !code) {
      setError('Tous les champs sont obligatoires.');
      return;
    }
  
    try {

      const csrfToken = await fetchCsrfToken();

      // Ajouter les informations d'authentification Basic
      const username = 'user'; // Nom d'utilisateur Basic Auth
      const password = 'password123'; // Mot de passe Basic Auth
      const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

      const response = await fetch('http://localhost:9091/Utilisateurs/reinscription', {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'X-CSRF-TOKEN': csrfToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          nouveauMotDePasse,
          code,
        }),
        credentials: "include",
      });
  
      if (!response.ok) {
        // Si la réponse HTTP indique une erreur
        const errorData = await response.json(); // Récupérer les détails de l'erreur
        throw new Error(errorData.message || 'Une erreur est survenue. Veuillez réessayer.');
      }
  
      const data = await response.json(); // Récupérer les données de la réponse
      console.log(data);
      setMessage('Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.');
      navigate('/connection');
      setError('');
    } catch (err) {
      // Gérer les erreurs en cas de problème
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
      setMessage('');
    }
  };
  
  return (
    <div className="cont">
    <div className=" container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '500px' }}>
    <div className="container">
    <button onClick={handleClose} style={{position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    cursor: "pointer",}}>
        <FaTimes size={20} />
      </button>

      <h2 className='text-center'>Réinitialisation du mot de passe</h2>
      <br/>
      <p className='text text-muted text-tertiary'>Bonjour cher utilisateur,</p>
      <p className='text text-muted text-tertiary-emphasis'>
        Veuillez consulter votre boîte e-mail pour récupérer le code de vérification.
      </p>
      <p className='text text-muted text-tertiary'>Cordialement,</p>
      <p className='text text-muted text-tertiary'>Asso.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group text-warning-emphasis">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            className="form-control border border-warning-subtle bg-warning-subtle"
            id="email"
            name="email"
            placeholder='entrer votre email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br/>
        <div className="form-group text-warning-emphasis">
          <label htmlFor="nouveauMotDePasse">Nouveau mot de passe :</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control border border-warning-subtle bg-warning-subtle"
            id="nouveauMotDePasse"
            name="nouveauMotDePasse"
            placeholder='entrer un nouveau mot de passe'
            value={nouveauMotDePasse}
            onChange={(e) => setNouveauMotDePasse(e.target.value)}
            required
          />
          <span
          onClick={handleTogglePassword}
          style={{
            position: "absolute",
            right: "42px",
            top: "65%",
            transform: "translateY(50%)",
            cursor: "pointer",
            color: "#ffc107",
          }}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
        </div>
        <br/>
        <div className="form-group text-warning-emphasis">
          <label htmlFor="code">Code de réinitialisation :</label>
          <input
            type="text"
            className="form-control border border-warning-subtle bg-warning-subtle"
            id="code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <br/>
        <button type="submit" className="btn  w-100" style={{ backgroundColor: '#D97706' }} onMouseEnter={(e) => (e.target.style.backgroundColor = '#b45309')} onMouseLeave={(e) => (e.target.style.backgroundColor = '#D97706')}>
          Réinitialiser
        </button>
      </form>
      
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
    </div>
    </div>
    </div>
  );
};

export default Reregister;
