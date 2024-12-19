import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logoappli.jpg';
import '../index.css'
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <nav className="nav-links">
        <div><p className='fa fa-home' onClick={()=>navigate('/')} ></p></div>
        <div><p className='fa fa-shopping-cart' onClick={()=>navigate('/cart')}></p></div>
        <div><Link to="/profil">Profile</Link></div>
      </nav>
    </header>
  );
};

export default Header;
