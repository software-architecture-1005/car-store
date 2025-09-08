import React from 'react';
import './Header.css';

const Header = ({ currentPage, onNavigate }) => {
  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div 
          className="logo" 
          onClick={() => handleNavigation('home')}
          style={{ cursor: 'pointer' }}
        >
          <div className="logo-icon">A</div>
          <span className="logo-text">AutoMatch</span>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavigation('home')}
          >
            Inicio
          </button>

          <button 
            className={`nav-link ${currentPage === 'search' ? 'active' : ''}`}
            onClick={() => handleNavigation('search')}
          >
            Vehículos
          </button>

          <button 
            className={`nav-link ${currentPage === 'comparison' ? 'active' : ''}`}
            onClick={() => handleNavigation('comparison')}
          >
            Comparar
          </button>
          <button 
            className="nav-link"
            onClick={() => handleNavigation('features')}
          >
            Características
          </button>

          <button className={`nav-link ${currentPage === 'registrar' ? 'active' : ''}`} onClick={() => handleNavigation('registrar')}>Registrar</button>

          <button className={`nav-link ${currentPage === 'listar' ? 'active' : ''}`} onClick={() => handleNavigation('listar')}>Listar</button>
        </nav>

      </div>
    </header>
  );
};

export default Header;
