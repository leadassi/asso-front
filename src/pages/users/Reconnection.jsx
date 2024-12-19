import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Reconnection = () => {
  const [email, setEmail] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [error, setError] = useState(''); 

  const navigate = useNavigate();

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
  
    try {


      // Récupérer le jeton CSRF
      const csrfToken = await fetchCsrfToken();

      // Ajouter les informations d'authentification Basic
      const username = 'user'; // Nom d'utilisateur Basic Auth
      const password = 'password123'; // Mot de passe Basic Auth
      const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

      const response = await fetch(`http://localhost:9091/Utilisateurs/reconnexion?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
          'X-CSRF-TOKEN': csrfToken,
        },
        credentials: 'include',
      });
  
      if (!response.ok) {
        // Si le statut HTTP indique une erreur
        const errorData = await response.json(); // Extraire les détails de l'erreur
        throw new Error(errorData.message || 'Une erreur est survenue. Veuillez réessayer.');
      }
  
      const data = await response.json(); // Extraire les données de la réponse
      console.log(data);
      setMessage('Un code de réinitialisation a été envoyé à votre e-mail.');
      navigate('/reinscription');
      setError(''); 
    } catch (err) {
      // Gérer les erreurs en cas de problème
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
      setMessage(''); 
    }
  };
  

  return (
    <div className="cont">
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '500px' }}>
    <div className="container">
    <div>
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft size={20} className="pointer"/>
        </button>
      </div>
      <h2 className='text-center'>Mot de passe oublié</h2>
      <br/>
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
        <button type="submit" className="btn  w-100" style={{ backgroundColor: '#D97706' }} onMouseEnter={(e) => (e.target.style.backgroundColor = '#b45309')} onMouseLeave={(e) => (e.target.style.backgroundColor = '#D97706')}>
          Soumettre
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

export default Reconnection;
