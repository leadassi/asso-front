import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";

const Verification = () => {
  const [code, setCode] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = sessionStorage.getItem('email'); 

  if (!email) {
    return <p>Aucun email trouvé. Retournez à la page d'inscription.</p>;
  }

  const handleClose = () => {
    navigate("/connection"); 
  };


  const fetchCsrfToken = async () => {
    try {
      const username = 'user'; // Remplacez par votre nom d'utilisateur
      const password = 'password123'; // Remplacez par votre mot de passe
      const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
  
      const response = await fetch('http://localhost:9091/Utilisateurs/csrf-token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader, // Inclure l'authentification basique
        },
        credentials: 'include', // Inclure les cookies (sessions)
      });
  
      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération du jeton CSRF : ${response.statusText}`);
      }
  
      const data = await response.json();
      if (data.token) {
        return data.token.replace(/"/g, ''); // Renvoie le token CSRF
      }
      throw new Error('Jeton CSRF non trouvé dans la réponse.');
    } catch (error) {
      console.error('Erreur lors de la récupération du jeton CSRF :', error);
      throw error;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true); // Indicateur de chargement
  
      const csrfToken = await fetchCsrfToken();
  
      const username = 'user'; // Nom d'utilisateur pour l'authentification basique
      const password = 'password123'; // Mot de passe pour l'authentification basique
      const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
      
      // Requête de vérification avec les paramètres dans les en-têtes
      
      const response = await fetch(`http://localhost:9091/Utilisateurs/verification?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken, // Token CSRF
          Authorization: authHeader, // Authentification basique
          
        },
        credentials: 'include', // Inclure les cookies (sessions)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Compte activé avec succès :', data);
  
        // Message de succès
        setMessage('Compte activé avec succès ! Vous pouvez maintenant vous connecter.');
        setError('');
        sessionStorage.removeItem("utilisateur");
        // Rediriger après un court délai
        setTimeout(() => {
          navigate('/connection');
        }, 2000);
      } else {
        // Gestion des erreurs côté serveur
        const errorData = await response.json();
        console.error('Erreur lors de la vérification :', errorData);
        setError(errorData.message || 'Une erreur est survenue. Veuillez réessayer.');
        setMessage('');
      }
    } catch (error) {
      console.error('Erreur réseau ou serveur :', error);
      setError('Erreur réseau ou serveur. Veuillez réessayer.');
      setMessage('');
    } finally {
      setLoading(false); // Fin de l'indicateur de chargement
    }
  };
  

  return (
    <div className='cont'>
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '500px' }}>
    <div className="container">
    <div><button onClick={handleClose} style={{position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    cursor: "pointer",}}>
        <FaTimes size={20} />
      </button></div>
      <h1 className='text-center'>Vérification</h1>
      <br/>
      <p className='text text-muted text-tertiary'>Bonjour cher utilisateur,</p>
      <p className='text text-muted text-tertiary-emphasis'>
        Veuillez consulter votre boîte e-mail pour récupérer le code de vérification.
      </p>
      <p className='text text-muted text-tertiary'>Cordialement,</p>
      <p className='text text-muted text-tertiary'>Asso.</p>

      <form onSubmit={handleSubmit}>
        {/* Champ caché pour inclure l'email */}
        <input type="hidden" name="email" value={email} />
        <div className="form-group text-warning-emphasis">
          <label htmlFor="code">Code de vérification :</label>
          <input
            type="text"
            id="code"
            name="code"
            className="form-control border border-warning-subtle bg-warning-subtle"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <br/>
        <button type="submit" className="btn  w-100" style={{ backgroundColor: '#D97706' }} onMouseEnter={(e) => (e.target.style.backgroundColor = '#b45309')} onMouseLeave={(e) => (e.target.style.backgroundColor = '#D97706')} disabled={loading}>
          Vérifier
        </button>
      </form>

      {/* Affichage des messages de succès ou d'erreur */}
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
    </div>
    </div>
    </div>
  );
};



export default Verification;
