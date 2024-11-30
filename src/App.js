import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/products/Home';
import ProductDetail from './pages/products/ProductDetail';
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

function App() {
  const orders = [
    { id: 1, description: 'Commande 1', date: '2024-11-28' },
    { id: 2, description: 'Commande 2', date: '2024-11-27' },
    { id: 3, description: 'Commande 3', date: '2024-11-26' },
    // Ajoutez plus de commandes ici
  ];

  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} />
          <Route path="/àproposdenous" element={<AboutUs />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/connection" element={<LoginUser />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/reconnection" element={<Reconnection />} />
          <Route path="/reinscription" element={<Reregister />} />
          <Route path="/verification" element={<Verification email="utilisateur@example.com" nom="Utilisateur" />}/>
          <Route path="/form_fournisseur" element={<LoginSupplier />} />
          <Route path="/historique" element={<Historique orders={orders} />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;