import React from 'react';
import Header from './Header';
import Footer from './Footer';

function MainLayout({ children, hideHeader = false }) {
  return (
    <div>
      {!hideHeader && <Header />}
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
