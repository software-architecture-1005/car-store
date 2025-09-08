import React, { useState, useEffect } from 'react';
import SearchFilters from '../components/SearchFilters';
import VehicleCard from '../components/VehicleCard';
import './SearchResults.css';

const SearchResults = ({ onViewDetails }) => {
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    priceMin: '',
    priceMax: '',
    brands: [],
    bodyStyle: '',
    transmission: '',
    fuelTypes: [],
    yearFrom: '',
    yearTo: '',
    colors: []
  });

  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [sortBy, setSortBy] = useState('bestMatch');
  const [loading, setLoading] = useState(true);

  // Mock data - En una aplicación real, esto vendría de una API
  useEffect(() => {
    const mockVehicles = [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2023,
        price: 85000000,
        rating: 4.7,
        specifications: [
          { icon: '⚡', value: 'Híbrido' },
          { icon: '🔄', value: 'CVT' },
          { icon: '👥', value: '5 pasajeros' }
        ],
        location: 'Bogotá, Colombia',
        isAvailable: true,
        isPromoted: false
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1549317331-15d33c1eef14?w=400&h=300&fit=crop',
        brand: 'Honda',
        model: 'Civic',
        year: 2023,
        price: 92000000,
        rating: 4.8,
        specifications: [
          { icon: '⛽', value: 'Gasolina' },
          { icon: '🔄', value: 'Automática' },
          { icon: '👥', value: '5 pasajeros' }
        ],
        location: 'Medellín, Colombia',
        isAvailable: true,
        isPromoted: true
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
        brand: 'Nissan',
        model: 'Sentra',
        year: 2022,
        price: 78000000,
        rating: 4.5,
        specifications: [
          { icon: '⛽', value: 'Gasolina' },
          { icon: '🔄', value: 'CVT' },
          { icon: '👥', value: '5 pasajeros' }
        ],
        location: 'Cali, Colombia',
        isAvailable: true,
        isPromoted: false
      },
      {
        id: 4,
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
        brand: 'Mazda',
        model: 'CX-5',
        year: 2023,
        price: 125000000,
        rating: 4.9,
        specifications: [
          { icon: '⛽', value: 'Gasolina' },
          { icon: '🔄', value: 'Automática' },
          { icon: '👥', value: '7 pasajeros' }
        ],
        location: 'Bogotá, Colombia',
        isAvailable: true,
        isPromoted: false
      },
      {
        id: 5,
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop',
        brand: 'Hyundai',
        model: 'Tucson',
        year: 2023,
        price: 110000000,
        rating: 4.6,
        specifications: [
          { icon: '⛽', value: 'Gasolina' },
          { icon: '🔄', value: 'Automática' },
          { icon: '👥', value: '5 pasajeros' }
        ],
        location: 'Barranquilla, Colombia',
        isAvailable: false,
        isPromoted: false
      },
      {
        id: 6,
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop',
        brand: 'Kia',
        model: 'Sportage',
        year: 2023,
        price: 98000000,
        rating: 4.4,
        specifications: [
          { icon: '⛽', value: 'Gasolina' },
          { icon: '🔄', value: 'Automática' },
          { icon: '👥', value: '5 pasajeros' }
        ],
        location: 'Cartagena, Colombia',
        isAvailable: true,
        isPromoted: false
      }
    ];

    setVehicles(mockVehicles);
    setFilteredVehicles(mockVehicles);
    setLoading(false);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  const handleViewDetails = (vehicleId) => {
    if (onViewDetails) {
      onViewDetails(vehicleId);
    }
  };

  const handleCompare = (vehicleId) => {
    console.log('Add to comparison:', vehicleId);
    // Agregar a la comparación
  };

  // Filtrar vehículos basado en los filtros aplicados
  useEffect(() => {
    let filtered = [...vehicles];

    // Filtro de búsqueda
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(vehicle =>
        vehicle.brand.toLowerCase().includes(searchTerm) ||
        vehicle.model.toLowerCase().includes(searchTerm) ||
        `${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(searchTerm)
      );
    }

    // Filtro de ubicación
    if (filters.location) {
      filtered = filtered.filter(vehicle =>
        vehicle.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filtro de precio
    if (filters.priceMin) {
      filtered = filtered.filter(vehicle => vehicle.price >= parseInt(filters.priceMin) * 1000000);
    }
    if (filters.priceMax) {
      filtered = filtered.filter(vehicle => vehicle.price <= parseInt(filters.priceMax) * 1000000);
    }

    // Filtro de marcas
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(vehicle =>
        filters.brands.includes(vehicle.brand)
      );
    }

    // Filtro de año
    if (filters.yearFrom) {
      filtered = filtered.filter(vehicle => vehicle.year >= parseInt(filters.yearFrom));
    }
    if (filters.yearTo) {
      filtered = filtered.filter(vehicle => vehicle.year <= parseInt(filters.yearTo));
    }

    setFilteredVehicles(filtered);
  }, [filters, vehicles]);

  // Ordenar vehículos
  useEffect(() => {
    let sorted = [...filteredVehicles];

    switch (sortBy) {
      case 'priceLow':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'yearNew':
        sorted.sort((a, b) => b.year - a.year);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default: // bestMatch
        // Mantener orden original
        break;
    }

    setFilteredVehicles(sorted);
  }, [sortBy, filteredVehicles]);

  if (loading) {
    return (
      <div className="search-results-loading">
        <div className="loading-spinner"></div>
        <p>Cargando vehículos...</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="search-results-container">
        {/* Sidebar con filtros */}
        <aside className="search-sidebar">
          <SearchFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>

        {/* Contenido principal */}
        <main className="search-main">
          {/* Header de resultados */}
          <div className="results-header">
            <div className="results-info">
              <h2 className="results-title">
                Mostrando {filteredVehicles.length} vehículos
              </h2>
              <p className="results-subtitle">
                Encuentra el vehículo perfecto para ti
              </p>
            </div>
            
            <div className="results-controls">
              <div className="sort-control">
                <label htmlFor="sort-select">Ordenar por:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="sort-select"
                >
                  <option value="bestMatch">Mejor coincidencia</option>
                  <option value="priceLow">Precio: Menor a mayor</option>
                  <option value="priceHigh">Precio: Mayor a menor</option>
                  <option value="yearNew">Año: Más reciente</option>
                  <option value="rating">Calificación</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid de vehículos */}
          <div className="vehicles-grid">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onViewDetails={handleViewDetails}
                  onCompare={handleCompare}
                />
              ))
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🚗</div>
                <h3>No se encontraron vehículos</h3>
                <p>Intenta ajustar tus filtros de búsqueda</p>
                <button 
                  className="btn-primary"
                  onClick={() => setFilters({
                    search: '',
                    location: '',
                    priceMin: '',
                    priceMax: '',
                    brands: [],
                    bodyStyle: '',
                    transmission: '',
                    fuelTypes: [],
                    yearFrom: '',
                    yearTo: '',
                    colors: []
                  })}
                >
                  Limpiar Filtros
                </button>
              </div>
            )}
          </div>

          {/* Paginación */}
          {filteredVehicles.length > 0 && (
            <div className="pagination">
              <button className="pagination-btn" disabled>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
                Anterior
              </button>
              
              <div className="pagination-numbers">
                <button className="pagination-number active">1</button>
                <button className="pagination-number">2</button>
                <button className="pagination-number">3</button>
                <span className="pagination-dots">...</span>
                <button className="pagination-number">10</button>
              </div>
              
              <button className="pagination-btn">
                Siguiente
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchResults;
