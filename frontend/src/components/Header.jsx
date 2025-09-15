import React from 'react';
import './Header.css';
import logoImage from '../assets/Logo-automatch-sin-fondo.png';

const Header = ({ currentPage, onNavigate, isAuthenticated, user }) => {
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
          <img 
            src={logoImage} 
            alt="AutoMatch Logo" 
            className="logo-image"
          />
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
            Catálogo
          </button>

          <button 
            className={`nav-link ${currentPage === 'comparison' ? 'active' : ''}`}
            onClick={() => handleNavigation('comparison')}
          >
            Comparar
          </button>
          <button 
            className={`nav-link ${currentPage === 'features' ? 'active' : ''}`}
            onClick={() => handleNavigation('features')}
          >
            Características
          </button>
          <button 
            className="nav-link"
            onClick={() => handleNavigation('cart')}
          >
            Carrito
          </button>

          {isAuthenticated ? (
            <>
              <button 
                className={`nav-link ${currentPage === 'admin' ? 'active' : ''}`} 
                onClick={() => handleNavigation('admin')}
              >
                Admin
              </button>
              <button 
                className="nav-link" 
                onClick={() => {
                  // Aquí implementarías la función de logout
                  localStorage.removeItem('accessToken');
                  localStorage.removeItem('refreshToken');
                  window.location.reload();
                }}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <button 
                className={`nav-link ${currentPage === 'signup' ? 'active' : ''}`} 
                onClick={() => handleNavigation('signup')}
              >
                Registrarse
              </button>

              <button
                className={`nav-link ${currentPage === 'login' ? 'active' : ''}`} 
                onClick={() => handleNavigation('login')}
              >
                Iniciar Sesión
              </button>
            </>
          )}
        </nav>

      </div>
    </header>
  );
};

export default Header;
