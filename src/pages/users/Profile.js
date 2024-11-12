import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div>
      <h2>Mon profil</h2>
      <p><Link to="/Scanner">page de scan</Link></p>
      
    </div>
  );
}

export default Profile;