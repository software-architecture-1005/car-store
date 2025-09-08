import React, { useState } from 'react';
import './SearchFilters.css';

const SearchFilters = ({ onFilterChange, filters }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const clearFilters = () => {
    // Reset all filters
    Object.keys(filters).forEach(key => {
      onFilterChange(key, '');
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== '' && value !== null && value !== undefined
  ).length;

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

        {/* Location */}
        <div className="filter-group">
          <label className="filter-label">Ubicación</label>
          <select
            className="filter-select"
            value={filters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="">Todas las ubicaciones</option>
            <option value="bogota">Bogotá (156)</option>
            <option value="medellin">Medellín (89)</option>
            <option value="cali">Cali (67)</option>
            <option value="barranquilla">Barranquilla (34)</option>
            <option value="cartagena">Cartagena (23)</option>
          </select>
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
            {[
              'Toyota', 'Honda', 'Nissan', 'Mazda', 'Hyundai', 'Kia', 
              'Chevrolet', 'Ford', 'Renault', 'Volkswagen'
            ].map(brand => (
              <label key={brand} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.brands?.includes(brand) || false}
                  onChange={(e) => {
                    const currentBrands = filters.brands || [];
                    const newBrands = e.target.checked
                      ? [...currentBrands, brand]
                      : currentBrands.filter(b => b !== brand);
                    handleFilterChange('brands', newBrands);
                  }}
                />
                <span className="checkbox-label">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Body Style */}
        <div className="filter-group">
          <label className="filter-label">Tipo de Vehículo</label>
          <div className="icon-filter-group">
            {[
              { value: 'sedan', label: 'Sedán', icon: '🚗' },
              { value: 'suv', label: 'SUV', icon: '🚙' },
              { value: 'hatchback', label: 'Hatchback', icon: '🚐' },
              { value: 'coupe', label: 'Coupé', icon: '🏎️' },
              { value: 'pickup', label: 'Pickup', icon: '🛻' }
            ].map(style => (
              <button
                key={style.value}
                className={`icon-filter-btn ${filters.bodyStyle === style.value ? 'active' : ''}`}
                onClick={() => handleFilterChange('bodyStyle', 
                  filters.bodyStyle === style.value ? '' : style.value
                )}
              >
                <span className="icon-filter-icon">{style.icon}</span>
                <span className="icon-filter-label">{style.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Transmission */}
        <div className="filter-group">
          <label className="filter-label">Transmisión</label>
          <div className="radio-group">
            {[
              { value: 'automatic', label: 'Automática' },
              { value: 'manual', label: 'Manual' },
              { value: 'cvt', label: 'CVT' }
            ].map(transmission => (
              <label key={transmission.value} className="radio-item">
                <input
                  type="radio"
                  name="transmission"
                  value={transmission.value}
                  checked={filters.transmission === transmission.value}
                  onChange={(e) => handleFilterChange('transmission', e.target.value)}
                />
                <span className="radio-label">{transmission.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fuel Type */}
        <div className="filter-group">
          <label className="filter-label">Combustible</label>
          <div className="checkbox-group">
            {[
              'Gasolina', 'Diésel', 'Híbrido', 'Eléctrico', 'Gas Natural'
            ].map(fuel => (
              <label key={fuel} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.fuelTypes?.includes(fuel) || false}
                  onChange={(e) => {
                    const currentFuelTypes = filters.fuelTypes || [];
                    const newFuelTypes = e.target.checked
                      ? [...currentFuelTypes, fuel]
                      : currentFuelTypes.filter(f => f !== fuel);
                    handleFilterChange('fuelTypes', newFuelTypes);
                  }}
                />
                <span className="checkbox-label">{fuel}</span>
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
          <div className="color-palette">
            {[
              { name: 'Blanco', value: 'white', color: '#FFFFFF' },
              { name: 'Negro', value: 'black', color: '#000000' },
              { name: 'Gris', value: 'gray', color: '#808080' },
              { name: 'Rojo', value: 'red', color: '#FF0000' },
              { name: 'Azul', value: 'blue', color: '#0000FF' },
              { name: 'Verde', value: 'green', color: '#008000' },
              { name: 'Plateado', value: 'silver', color: '#C0C0C0' }
            ].map(color => (
              <button
                key={color.value}
                className={`color-btn ${filters.colors?.includes(color.value) ? 'active' : ''}`}
                style={{ backgroundColor: color.color }}
                onClick={() => {
                  const currentColors = filters.colors || [];
                  const newColors = currentColors.includes(color.value)
                    ? currentColors.filter(c => c !== color.value)
                    : [...currentColors, color.value];
                  handleFilterChange('colors', newColors);
                }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
