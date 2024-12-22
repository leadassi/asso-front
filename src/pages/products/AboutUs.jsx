import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import team from "./team.webp";
import images from "./img2.avif";
import img from "./img.jpeg"



function AboutUs() {
  return (
    <div>
      <div className='titre mt-20' style={{textAlign:'center'}}>
      <h1 className='text-warning-emphasis' style={{fontSize:'4rem', fontWeight:"bold"}}>ASSO</h1>
      <h6 style={{color:'darkgray'}}>Vente des vetements, cosmétiques et aliments</h6>
      </div>
      <div className="container my-5">
      <div className="row align-items-center mb-4">
        
        <div className="col-md-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" style={{position:'absolute',zIndex:'-1'}}>
  <circle cx="200" cy="150" r="150" fill="rgba(253, 241, 184, 1.0)" />
  <circle cx="400" cy="300" r="200" fill="rgba(255, 255, 224, 1.0)" />
  <circle cx="600" cy="450" r="120" fill="rgba(216, 216, 216, 1.0)" />
</svg>

          <img
            src={team}
            style={{ borderRadius: "50%", mixBlendMode: 'multiply' }}
            alt="image1"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6" style={{textAlign:'center'}}>
          <h2>Notre Equipe</h2>
          <p>Notre application de e-commerce est le fruit du travail passionné de cinq talentueux développeurs. En combinant expertise technique, créativité et une attention méticuleuse aux détails, nous avons conçu une plateforme moderne, fluide et intuitive.
Notre dévouement à offrir une expérience utilisateur exceptionnelle se reflète dans chaque fonctionnalité, qu'il s'agisse de la navigation simplifiée, du processus de paiement sécurisé ou de la personnalisation des offres. Ensemble, nous partageons une vision commune : transformer vos achats en ligne en une expérience agréable et mémorable.
Nous sommes fiers de notre travail et ravis de le partager avec vous ! 
          </p>
        </div>
      </div>

      <div className="row align-items-center mb-4">
        
      <div className="col-md-6 order-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <img
    src={img}
    style={{
      borderRadius: "50%",
      mixBlendMode: "multiply",
      maxWidth: "100%",
      height: "auto",
    }}
    alt="image2"
    className="img-fluid rounded"
  />
</div>

        <div className="col-md-6 order-md-1" style={{textAlign:'center'}}>
          <h2>Notre Mission</h2>
          <p>
            Vous etes toujours hésitant sur l'achat d'un produit car la qualité n'est pas au rendez-vous? Les produits que vous voulez sont ils rarement disponibles dans les supermarchés? Les files 
            d'attente sont extrèmement longues? Votre condition physique vous empeche tout déplacement? Vous voulez effectuer vos achats en un temps record?
          </p>
          <p>Nous mettons à votre disposition, Asso.
          </p>
          <p>Faites vos achats avec plaisir, et satisfaction.
          </p>
        </div>
      </div>

      <div className="row align-items-center mb-4">
        
        <div className="col-md-6">
          <img
            src={images}
            style={{ borderRadius: "50%", mixBlendMode: 'multiply' }}
            alt="Exemple 3"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2 style={{textAlign:'center'}}>Notre devoir</h2>
          <p style={{textAlign:'center'}}>
          Notre application de e-commerce est un pont fiable entre les vendeurs et les clients, tout en mettant l'accent sur la commodité, la sécurité et l’innovation. Il se résume en :
          </p>
          <ul>
          <li>- Faciliter les transactions en ligne</li>
          <li>- Assurer une expérience utilisateur agréable</li>
          <li>- Garantir la sécurité</li>
          <li>- Fournir un service client efficace</li>
          <li>- Gérer l’inventaire et les commandes</li>
          <li>- Analyser les données</li>
          </ul>
          
        </div>
      </div>
      <br/>
      
      <div className="text-center my-5">
        <h3 className="font-weight-bold">"La technologie s'installe chez vous, gagnez sur toutes vos courses."</h3>
        <p className="text-muted">
          Une phrase courte qui prend tout son sens pour nos utilisateurs.
        </p>
      </div>
    </div>
    </div>
  );
}

export default AboutUs;
