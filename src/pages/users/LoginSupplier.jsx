import React, { useRef, useState } from "react";
import logo from "./logoappli.jpg"; 
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


const LoginSupplier = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const form = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    

    // Envoyer le formulaire via EmailJS
    emailjs
      .sendForm(
        "service_newdj2x", 
        "template_ra9h2dc",  
        form.current, 
        "tR9ai4_DXaNA4mN9P"
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setIsSubmitted(true);
        },
        (error) => {
          console.error("Erreur lors de l'envoi :", error.text);
          setError("Une erreur est survenue lors de l'envoi.");
        }
      );
  };

  return (
    <div className="cont">
    <div className="container mt-6 d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '500px' }}>
    <div style={{ margin: "50px auto", maxWidth: "500px" }}>
    <div>
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft size={20} className="pointer"/>
        </button>
      </div>

      
      <div style={{display: "flex", justifyContent: "center", marginBottom: "20px", mixBlendMode: 'multiply' }}>
        <img
          src={logo}
          alt="Logo"
          style={{width: "130px", height: "130px", objectFit: "contain"}}
        />
      </div>
      <h2 className="text text-center">Vous souhaitez vendre ?</h2>
      <br/>
      <form ref={form} id="contact-form" onSubmit={handleSubmit}>
        <label className="text-warning-emphasis">Nom:</label>
        <input
          type="text"
          name="user_name"
          placeholder="Entrez votre nom"
          className="bg-warning-subtle"
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: "15px",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
          }}
        />

        <label className="text-warning-emphasis">Email :</label>
        <input
          type="email"
          name="user_email"
          placeholder="Entrez votre email"
          className="bg-warning-subtle"
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: "15px",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
          }}
        />

        <label className="text-warning-emphasis">Message:</label>
        <textarea
          name="message"
          className="bg-warning-subtle"
          placeholder="Votre message ici..."
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: "15px",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            resize: "none",
          }}
        />

        <p style={{fontSize: "12px",color: "#666",marginBottom: "15px"}}>
            En soumettant ce formulaire, vos données seront
            traitées, et vous serez recontactez par mail ultérieurement si votre dossier est favorable.
          </p>

        <button
          type="submit"
          className="btn  w-100" style={{ backgroundColor: '#D97706' }} onMouseEnter={(e) => (e.target.style.backgroundColor = '#b45309')} onMouseLeave={(e) => (e.target.style.backgroundColor = '#D97706')}
        >
          Soumettre
        </button>

      </form>
      {isSubmitted && <p style={{marginTop: "15px",color: "green",fontWeight: "bold" }}>Votre message a été envoyé avec succès.</p>}
        {error && <p style={{ marginTop: "15px",color: "red",fontWeight: "bold"}}>{error}</p>}
    </div>
    </div>
    </div>
    </div>
  );

};

export default LoginSupplier;
