import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Cart from './pages/orders/Cart';
import AboutUs from './pages/products/AboutUs';
import Profile from './pages/users/Profile';
import LoginUser from './pages/users/LoginUser';
import Register from './pages/users/Register';
import Verification from './pages/users/Verification';
import Reconnection from './pages/users/Reconnection';
import Reregister from './pages/users/Reregister';
import LoginSupplier from './pages/users/LoginSupplier';
import Historique from './pages/orders/historique';
import QRCodeScanner from "./pages/delivries/QRCodeScanner";
import MapWithItinerary from "./pages/Itineraires/Carte";
import Acceuil from "./pages/Acceuil/Acceuil";
import Cosmetics from "./pages/Acceuil/Cosmetics";
import Clothing from "./pages/Acceuil/Dresses";
import Aliments from "./pages/Acceuil/Aliments";
import Description from "./pages/Description/Description";
import Api from "./pages/Acceuil/categories/App.jsx";
import FAQ from "./pages/Acceuil/FAQ.jsx";
import Details from './pages/Itineraires/Details.jsx';
import Services from './pages/Acceuil/categories/Livraison.jsx';
import MesFavoris from './pages/Acceuil/Favories.jsx';
import ServiceClient from './pages/Acceuil/Service-client.jsx';
import Page from './pages/Itineraires/Choisir.jsx';
import DiscoverPage from "./pages/Acceuil/Nouvostés.jsx";
import Fruits from "./pages/Acceuil/categories/Fruits.jsx";
import QRCodeGenerator from "./pages/Generateur/QRCodeGenerator.jsx";
import QRCodeDisplay from './pages/Generateur/liste.jsx';
import ValidationCart from './pages/orders/ValidationCart.jsx';
import Accessoires from './pages/Acceuil/Acessoires.jsx';
import ASSO from './pages/Asso/Asso.jsx';
import NotificationSystem from './pages/Asso/NotificationSystem.js';
import Livraisons from './pages/Acceuil/Livraisons.jsx';
import Nouveaute from './pages/Acceuil/Nouvostés.jsx';
function App() {

  // Définir des produits par défaut
  /*const defaultProducts = [
    { id: 1, name: "Cosmetic Set", price: 25, quantity: 1, description: "A set of organic cosmetic products" },
    { id: 2, name: "Clothing - Dress", price: 50, quantity: 1, description: "A beautiful evening dress" },
    { id: 3, name: "Apple - Fruit", price: 1, quantity: 1, description: "Fresh and juicy apple" },
    { id: 4, name: "Chocolate Bar", price: 2, quantity: 1, description: "Delicious milk chocolate" }
  ];*/

  // Initialiser l'état avec des produits par défaut
  const [cartItems, setCartItems] = useState([]);

  // Fonction pour ajouter un produit au panier
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleAddQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleSubtractQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };


  // Fonction pour réduire la quantité d'un produit dans le panier
  const handleDecreaseQuantity = (productId) => {
    setCartItems(cartItems.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  return (
    <Router>
      <Routes>
        <Route path="/asso-front" element={<Navigate to="/Acceuil" replace />} />
        <Route path="/Acceuil" element={<Acceuil />} />
        <Route path="/cosmetics" element={<Cosmetics />} />
        <Route path="/Clothing" element={<Clothing />} />
        <Route path="/aliments" element={<Aliments />} />
        <Route path="/fruits" element={<Fruits />} />

        {/* Regroupement des routes avec MainLayout */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/cart" element={<Cart cartItems={cartItems} onAddQuantity={handleAddQuantity} onSubtractQuantity={handleSubtractQuantity} onRemoveFromCart={handleRemoveFromCart} onDecreaseQuantity={handleDecreaseQuantity} />} />
                <Route path="/description" element={<Description onAddToCart={handleAddToCart} />} />
                <Route path="/àproposdenous" element={<AboutUs />} />
                <Route path="/profil" element={<Profile />} />
                <Route path="/connection" element={<LoginUser />} />
                <Route path="/inscription" element={<Register />} />
                <Route path="/reconnection" element={<Reconnection />} />
                <Route path="/reinscription" element={<Reregister />} />
                <Route path="/verification" element={<Verification email="utilisateur@example.com" nom="Utilisateur" />} />
                <Route path="/form_fournisseur" element={<LoginSupplier />} />
                <Route path="/historique" element={<Historique />} />
                <Route path="/scanner" element={<QRCodeScanner />} />
                <Route path="/map" element={<MapWithItinerary />} />
                <Route path="/jes" element={<Api />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/Adresse" element={<Details />} />
                <Route path="/Services" element={<Services />} />
                <Route path="/mesfavoris" element={<MesFavoris />} />
                <Route path="/choisir" element={<Page />} />
                <Route path="/service-client" element={<ServiceClient />} />
                <Route path="/nouvostés " element={<DiscoverPage />} />
                <Route path="/generateur" element={<QRCodeGenerator />} />
                <Route path="/liste" element={<QRCodeDisplay />} />
                <Route path="/ValidationCart" element={<ValidationCart />} />
                <Route path="/accessoires" element={<Accessoires />} />
                <Route path="/asso" element={<ASSO />} />
                <Route path="/notification" element={<NotificationSystem />} />
                <Route path='/livraisons' element={<Livraisons />} />
                <Route path="/nouveaute" element={<Nouveaute />} />
                </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
