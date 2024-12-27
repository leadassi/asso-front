import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {

  const [cartItems, setCartItems] = useState([]);

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil sans le MainLayout */}
        <Route path="/Acceuil" element={<Acceuil />} />
        <Route path="/cosmetics" element={<Cosmetics />} />
        <Route path="/Clothing" element={<Clothing />} />
        <Route path="/aliments" element={<Aliments />} />
        {/* Regroupement des routes avec MainLayout */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} />
                <Route path="/àproposdenous" element={<AboutUs />} />
                <Route path="/profil" element={<Profile />} />
                <Route path="/connection" element={<LoginUser />} />
                <Route path="/inscription" element={<Register />} />
                <Route path="/reconnection" element={<Reconnection />} />
                <Route path="/reinscription" element={<Reregister />} />
                <Route path="/verification" element={<Verification email="utilisateur@example.com" nom="Utilisateur" />} />
                <Route path="/form_fournisseur" element={<LoginSupplier />} />
                <Route path="/historique" element={<Historique/>} />
                <Route path="/description" element={<Description />} />
                <Route path="/scanner" element={<QRCodeScanner />} />
                <Route path="/map" element={<MapWithItinerary />} />
                <Route path="/jes" element={<Api />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/Adresse" element={<Details />} />
                <Route path="/Services" element={<Services />} />
                <Route path="/mesfavoris" element={<MesFavoris />} />
                <Route path="/choisir" element={<Page />} />
                <Route path="/service-client" element={<ServiceClient />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
