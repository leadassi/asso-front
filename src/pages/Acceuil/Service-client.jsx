import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "../users/userprofile.css";

const ServiceClient = () => {
    const [email, setemail] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Réinitialise les erreurs
    setIsSubmitted(false)

    // Envoyer le formulaire via EmailJS
    emailjs
      .sendForm(                                                                                   
        "service_newdj2x", 
        "template_y2chjsx",  
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

  const handleReset = (e) => {
    e.preventDefault();
    setemail("");
    setMessage("");
    setIsSubmitted(false);
    setError("");// Réinitialise le champ message
  };

  return (
    <div className="content-grid" style={{marginTop:"5%", padding:"5%"}}>
      <div>
        <form ref={form} onSubmit={handleSubmit}>
          <h2 className="text-warning-emphasis">Service Client</h2>
           <div
            style={{
              color: "#664d03",
              fontSize: "30px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p className="typewriter-container">
              AVEZ VOUS RENCONTRÉ DES PRÉOCCUPATIONS LORS DE L'UTILISATION DE L'APPLICATION ?
            </p>
            <p className="typewriter-container" style={{ animationDelay: "5s" }}>
              SI OUI, DITES NOUS EN PLUS.
            </p>
          </div>

          

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
          value={email}
        onChange={(e) => setemail(e.target.value)}
        />

          <label className="text-warning-emphasis">Message :</label>
          <fieldset id="message">
            <textarea
              name="comments"
              className="bg-warning-subtle"
              rows="6"
              cols="70"
              style={{
                display: "block",
                width: "100%",
                marginBottom: "15px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
              }}
              placeholder="Écrivez votre message ici...."
              value={message}
              required
              onChange={(e) => setMessage(e.target.value)}
            />
          </fieldset>
          <br/>
        
            <button type="submit"
          className="btn  w-40" style={{ backgroundColor: '#D97706' }} onMouseEnter={(e) => (e.target.style.backgroundColor = '#b45309')} onMouseLeave={(e) => (e.target.style.backgroundColor = '#D97706')}> 
          {isSubmitted ? "Envoyé !" : "Envoyer"}
           </button>
            &emsp;&emsp;<button value="Recommencer"
              className="btn  w-37" style={{ backgroundColor: '#D97706' }} onMouseEnter={(e) => (e.target.style.backgroundColor = '#b45309')} onMouseLeave={(e) => (e.target.style.backgroundColor = '#D97706')}
              onClick={handleReset}
            >Recommencer </button>
          
        </form>
        {isSubmitted && <p style={{marginTop: "15px",color: "green",fontWeight: "bold" }}>Votre message a été envoyé avec succès. Votre préoccupation sera prise en compte.</p>}
        {error && <p style={{ marginTop: "15px",color: "red",fontWeight: "bold"}}>{error}</p>}
      </div>
    </div>
  );
};

export default ServiceClient;
