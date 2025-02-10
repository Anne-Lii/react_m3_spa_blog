import React from 'react';
import Navigation from './Nav';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet /> {/* Child routes renderas här */}
      </main>
      <footer> &cpoy; 2025 Anne-Lii Hansen</footer>
    </div>
  );
};

export default Layout;
