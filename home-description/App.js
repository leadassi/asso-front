import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Imports des pages
import Home from "./pages/products/Home";
import ProductDetail from "./pages/products/ProductDetail";
import Cart from "./pages/orders/Cart";
import AboutUs from "./pages/products/AboutUs";
import Profile from "./pages/users/Profile";
import QRCodeScanner from "./pages/delivries/QRCodeScanner";
import MapWithItinerary from "./pages/Itineraires/Carte";
import Acceuil from "./pages/Acceuil/Acceuil";
import Cosmetics from "./pages/Acceuil/Cosmetics";
import Clothing from "./pages/Acceuil/Dresses";
import Aliments from "./pages/Acceuil/Aliments";
import Description from "./pages/Description/Description";

function App() {
  // État pour le panier
  const [cartItems, setCartItems] = useState([]);

  // Fonction pour ajouter un produit au panier
  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Fonction pour retirer un produit du panier
  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* Routes pour les produits */}
        <Route
          path="/product/:id"
          element={<ProductDetail onAddToCart={handleAddToCart} />}
        />
        <Route path="/cosmetics" element={<Cosmetics />} />
        <Route path="/Clothing" element={<Clothing />} />
        <Route path="/aliments" element={<Aliments />} />
        <Route path="/description" element={<Description />} />

        {/* Route pour le panier */}
        <Route
          path="/cart"
          element={
            <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
          }
        />

        {/* Routes pour les autres fonctionnalités */}
        <Route path="/àproposdenous" element={<AboutUs />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/scanner" element={<QRCodeScanner />} />
        <Route path="/map" element={<MapWithItinerary />} />

        {/* Route pour l'accueil avec une galerie */}
        <Route path="/Acceuil" element={<Acceuil />} />
      </Routes>
    </Router>
  );
}

export default App;
