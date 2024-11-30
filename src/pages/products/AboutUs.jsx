import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import team from "./team.webp";
import images from "./images.jpeg";



function AboutUs() {
  return (
    <div>
      <div className='titre' style={{textAlign:'center'}}>
      <h1 className='text-warning-emphasis'>ASSO</h1>
      <h6 style={{color:'darkgray'}}>Vente des vetements, cosmétiques et aliments</h6>
      </div>
      <div className="container my-5">
      <div className="row align-items-center mb-4">
        
        <div className="col-md-6">
          <img
            src={team}
            style={{ borderRadius: "50%"}}
            alt="Exemple 1"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6" style={{textAlign:'center'}}>
          <h2>Notre Equipe</h2>
          <p>
            Cette application a été fondée par un groupe de cinq développeurs 
          </p>
        </div>
      </div>

      <div className="row align-items-center mb-4">
        
        <div className="col-md-6 order-md-2">
          <img
            src={images}
            alt="Exemple 2"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6 order-md-1" style={{textAlign:'center'}}>
          <h2>Notre Mission</h2>
          <p>
            Vous etes toujours hésitant sur l'achat d'un produit car la qualité n'est pas au rendez-vous? Les produits que vous voulez sont ils rarement disponibles dans les supermarchés? Les files 
            d'attente sont extrèmement longues?
          </p>
          <p>Nous mettons à votre disposition, Asso.
          </p>
        </div>
      </div>

      <div className="row align-items-center mb-4">
        
        <div className="col-md-6">
          <img
            src={images}
            alt="Exemple 3"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6" style={{textAlign:'center'}}>
          <h2>Notre devoir</h2>
          <p>
          Vous etes toujours hésitant sur l'achat d'un produit car la qualité n'est pas au rendez-vous? Les produits que vous voulez sont ils rarement disponibles dans les supermarchés? Les files 
          d'attente sont extrèmement longues?
          </p>
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
