import React, { useState } from 'react';
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Reconnection = () => {
  const [email, setEmail] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [error, setError] = useState(''); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      
      const response = await axios.post('http://localhost:9091/Utilisateurs/reconnexion', { email });

      // Gérer la réponse en cas de succès
      console.log(response.data);
      setMessage('Un code de réinitialisation a été envoyé à votre e-mail.');
      navigate('/reinscription');
      setError(''); 
    } catch (err) {
      // Gérer les erreurs en cas de problème
      setError(
        err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.'
      );
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
