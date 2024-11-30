import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";

const Verification = ({ email, nom }) => {
  const [code, setCode] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleClose = () => {
    navigate("/connection"); 
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:9091/Utilisateurs/verification', {
        email,
        code,
      });
      console.log(response.data);
      // Gérer la réponse en cas de succès
      setMessage('Compte activé avec succès ! Vous pouvez maintenant vous connecter.');
      setError('');

      setTimeout(() => {
        navigate('/connection');
      }, 2000);
    } catch (err) {
      // Gérer les erreurs en cas de problème
      setError(
        err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.'
      );
      setMessage('');
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
        <button type="submit" className="btn  w-100" style={{ backgroundColor: '#D97706' }} onMouseEnter={(e) => (e.target.style.backgroundColor = '#b45309')} onMouseLeave={(e) => (e.target.style.backgroundColor = '#D97706')}>
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
