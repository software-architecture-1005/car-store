import React, { useState } from 'react';
import './SearchFilters.css';

const SearchFilters = ({ onFilterChange, filters, makes = [], categories = [], onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const clearFilters = () => {
    // Reset all filters
    const resetFilters = {
      search: '',
      priceMin: '',
      priceMax: '',
      brands: [],
      yearFrom: '',
      yearTo: '',
      color: '',
      category: ''
    };
    
    Object.keys(resetFilters).forEach(key => {
      onFilterChange(key, resetFilters[key]);
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== '' && value !== null && value !== undefined;
  }).length;

  return (
    <div className={`search-filters ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="filters-header">
        <h3 className="filters-title">
          Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </h3>
        <button 
          className="clear-filters-btn"
          onClick={clearFilters}
          disabled={activeFiltersCount === 0}
        >
          Limpiar Filtros
        </button>
        <button 
          className="toggle-filters-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      <div className="filters-content">
        {/* Search */}
        <div className="filter-group">
          <label className="filter-label">Buscar</label>
          <input
            type="text"
            placeholder="Buscar vehículo..."
            className="filter-input"
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>


        {/* Price Range */}
        <div className="filter-group">
          <label className="filter-label">Rango de Precio</label>
          <div className="price-range">
            <input
              type="number"
              placeholder="Mín"
              className="price-input"
              value={filters.priceMin || ''}
              onChange={(e) => handleFilterChange('priceMin', e.target.value)}
            />
            <span className="price-separator">-</span>
            <input
              type="number"
              placeholder="Máx"
              className="price-input"
              value={filters.priceMax || ''}
              onChange={(e) => handleFilterChange('priceMax', e.target.value)}
            />
          </div>
        </div>

        {/* Brand */}
        <div className="filter-group">
          <label className="filter-label">Marca</label>
          <div className="checkbox-group">
            {makes.map(make => (
              <label key={make.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.brands?.includes(make.name) || false}
                  onChange={(e) => {
                    const currentBrands = filters.brands || [];
                    const newBrands = e.target.checked
                      ? [...currentBrands, make.name]
                      : currentBrands.filter(b => b !== make.name);
                    handleFilterChange('brands', newBrands);
                  }}
                />
                <span className="checkbox-label">{make.name}</span>
              </label>
            ))}
          </div>
        </div>


        {/* Year Range */}
        <div className="filter-group">
          <label className="filter-label">Año</label>
          <div className="year-range">
            <input
              type="number"
              placeholder="Desde"
              className="year-input"
              value={filters.yearFrom || ''}
              onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
            />
            <span className="year-separator">-</span>
            <input
              type="number"
              placeholder="Hasta"
              className="year-input"
              value={filters.yearTo || ''}
              onChange={(e) => handleFilterChange('yearTo', e.target.value)}
            />
          </div>
        </div>

        {/* Color */}
        <div className="filter-group">
          <label className="filter-label">Color</label>
          <select
            className="filter-select"
            value={filters.color || ''}
            onChange={(e) => handleFilterChange('color', e.target.value)}
          >
            <option value="">Todos los colores</option>
            <option value="Blanco">Blanco</option>
            <option value="Negro">Negro</option>
            <option value="Gris">Gris</option>
            <option value="Rojo">Rojo</option>
            <option value="Azul">Azul</option>
            <option value="Verde">Verde</option>
            <option value="Plateado">Plateado</option>
          </select>
        </div>

        {/* Category */}
        <div className="filter-group">
          <label className="filter-label">Categoría</label>
          <select
            className="filter-select"
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de búsqueda */}
        <div className="search-button-container">
          <button 
            className="search-button"
            onClick={() => {
              console.log('Search button clicked in SearchFilters');
              if (onSearch) {
                onSearch();
              } else {
                console.error('onSearch function not provided');
              }
            }}
          >
            🔍 Buscar Vehículos
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
