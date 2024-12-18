import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Description.css";

const Description = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { imageSrc, name, price, rating, description } = location.state || {};

  if (!imageSrc || !name || !price || !rating || !description) {
    return (
      <div className="error-page">
        <p>Error: Missing product data</p>
        <button className="go-back-button" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="description-page">
      {/* Header Section */}
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Retour
        </button>
        <h1 className="page-title">Description du produit</h1>
      </div>

      <div className="container">
        {/* Block 1: Image */}
        <div className="image-block">
          <img src={imageSrc} alt={name} className="product-image" />
        </div>

        {/* Block 2: Details */}
        <div className="details-block">
          <div className="details-header">
            <h3 className="product-name">{name}</h3>
            <div className="product-info">
              <span className="product-price">{price} FCFA</span>
              <span className="product-rating">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fa-heart ${i < rating ? "fas" : "far"}`}></i>
                ))}
              </span>
            </div>
          </div>
          <div className="product-description">
            <p>{description}</p>
          </div>
        </div>

        {/* Block 3: Button */}
        <div className="button-block">
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Description;
