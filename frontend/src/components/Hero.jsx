import React, { useState } from 'react';
import './Hero.css';

const Hero = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    brand: '',
    model: '',
    budget: ''
  });

  const handleSearchChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchData);
    }
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="hero-pattern"></div>
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span>TU DECISIÓN MÁS INTELIGENTE</span>
          </div>
          
          <h1 className="hero-title text-glow">
            TU AUTO IDEAL
          </h1>
          
          <p className="hero-subtitle">
            Deja de buscar en mil sitios. Compara, analiza y elige el vehículo perfecto para ti con datos reales y opiniones de expertos.
          </p>
          
          <form className="hero-search glass-effect" onSubmit={handleSearch}>
            <div className="search-fields">
              <div className="search-field">
                <label className="field-label">MARCA</label>
                <div className="input-container">
                  <select 
                    value={searchData.brand} 
                    onChange={(e) => handleSearchChange('brand', e.target.value)}
                    className="search-select"
                  >
                    <option value="">Selecciona marca</option>
                    <option value="toyota">Toyota</option>
                    <option value="honda">Honda</option>
                    <option value="nissan">Nissan</option>
                    <option value="mazda">Mazda</option>
                    <option value="hyundai">Hyundai</option>
                    <option value="kia">Kia</option>
                    <option value="chevrolet">Chevrolet</option>
                    <option value="ford">Ford</option>
                  </select>
                  <svg className="dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </div>
              </div>
              
              <div className="search-field">
                <label className="field-label">MODELO</label>
                <div className="input-container">
                  <input 
                    type="text" 
                    placeholder="Ej: Corolla, Civic, Sentra"
                    value={searchData.model}
                    onChange={(e) => handleSearchChange('model', e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
              
              <div className="search-field">
                <label className="field-label">PRESUPUESTO</label>
                <div className="input-container">
                  <select 
                    value={searchData.budget} 
                    onChange={(e) => handleSearchChange('budget', e.target.value)}
                    className="search-select"
                  >
                    <option value="">Rango de precio</option>
                    <option value="0-50">$0 - $50M</option>
                    <option value="50-100">$50M - $100M</option>
                    <option value="100-150">$100M - $150M</option>
                    <option value="150-200">$150M - $200M</option>
                    <option value="200+">$200M+</option>
                  </select>
                  <svg className="dropdown-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <button type="submit" className="btn-primary search-button btn-enhanced hover-glow">
              <span>ENCONTRAR</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
