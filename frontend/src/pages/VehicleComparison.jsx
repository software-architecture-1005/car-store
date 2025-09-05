import React, { useState } from 'react';
import './VehicleComparison.css';

const VehicleComparison = () => {
  const [comparisonVehicles, setComparisonVehicles] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop',
      brand: 'Toyota',
      model: 'Corolla Hybrid',
      year: 2023,
      price: 85000000,
      rating: 4.7,
      specifications: {
        engine: '1.8L Híbrido',
        power: '122 HP',
        torque: '142 Nm',
        transmission: 'CVT',
        fuelType: 'Híbrido',
        fuelConsumption: '4.1 L/100km',
        acceleration: '10.9s 0-100 km/h',
        topSpeed: '180 km/h',
        seats: 5,
        doors: 4,
        cargo: '470 L',
        drivetrain: 'FWD',
        weight: '1,420 kg',
        length: '4,630 mm',
        width: '1,780 mm',
        height: '1,435 mm'
      },
      expertRatings: {
        safety: 9.1,
        comfort: 8.8,
        technology: 9.5,
        performance: 8.2,
        reliability: 9.3,
        value: 8.9
      },
      features: [
        'Sistema de frenado regenerativo',
        'Modo EV para conducción eléctrica',
        'Sistema de infoentretenimiento Toyota Touch 2',
        'Cámara de reversa',
        'Sensores de estacionamiento',
        'Control de crucero adaptativo'
      ]
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1549317331-15d33c1eef14?w=300&h=200&fit=crop',
      brand: 'Honda',
      model: 'Civic',
      year: 2023,
      price: 92000000,
      rating: 4.8,
      specifications: {
        engine: '1.5L Turbo',
        power: '182 HP',
        torque: '240 Nm',
        transmission: 'CVT',
        fuelType: 'Gasolina',
        fuelConsumption: '6.2 L/100km',
        acceleration: '8.1s 0-100 km/h',
        topSpeed: '200 km/h',
        seats: 5,
        doors: 4,
        cargo: '420 L',
        drivetrain: 'FWD',
        weight: '1,350 kg',
        length: '4,675 mm',
        width: '1,800 mm',
        height: '1,415 mm'
      },
      expertRatings: {
        safety: 9.3,
        comfort: 9.1,
        technology: 9.2,
        performance: 9.5,
        reliability: 9.0,
        value: 8.7
      },
      features: [
        'Motor turbo VTEC',
        'Sistema de infoentretenimiento Honda Connect',
        'Cámara de reversa con guías dinámicas',
        'Sensores de estacionamiento delanteros y traseros',
        'Control de crucero adaptativo',
        'Asistente de mantenimiento de carril'
      ]
    },
    null // Slot vacío para el tercer vehículo
  ]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  const addVehicle = (vehicle) => {
    const emptySlotIndex = comparisonVehicles.findIndex(v => v === null);
    if (emptySlotIndex !== -1) {
      const newVehicles = [...comparisonVehicles];
      newVehicles[emptySlotIndex] = vehicle;
      setComparisonVehicles(newVehicles);
    }
  };

  const removeVehicle = (index) => {
    const newVehicles = [...comparisonVehicles];
    newVehicles[index] = null;
    setComparisonVehicles(newVehicles);
  };

  const clearComparison = () => {
    setComparisonVehicles([null, null, null]);
  };

  const activeVehicles = comparisonVehicles.filter(v => v !== null);
  const hasEmptySlots = comparisonVehicles.some(v => v === null);

  const comparisonSpecs = [
    { key: 'engine', label: 'Motor' },
    { key: 'power', label: 'Potencia' },
    { key: 'torque', label: 'Torque' },
    { key: 'transmission', label: 'Transmisión' },
    { key: 'fuelType', label: 'Combustible' },
    { key: 'fuelConsumption', label: 'Consumo' },
    { key: 'acceleration', label: 'Aceleración 0-100' },
    { key: 'topSpeed', label: 'Velocidad máxima' },
    { key: 'seats', label: 'Asientos' },
    { key: 'doors', label: 'Puertas' },
    { key: 'cargo', label: 'Maletero' },
    { key: 'drivetrain', label: 'Tracción' },
    { key: 'weight', label: 'Peso' },
    { key: 'length', label: 'Longitud' },
    { key: 'width', label: 'Ancho' },
    { key: 'height', label: 'Alto' }
  ];

  const ratingSpecs = [
    { key: 'safety', label: 'Seguridad' },
    { key: 'comfort', label: 'Confort' },
    { key: 'technology', label: 'Tecnología' },
    { key: 'performance', label: 'Rendimiento' },
    { key: 'reliability', label: 'Confiabilidad' },
    { key: 'value', label: 'Valor' }
  ];

  return (
    <div className="vehicle-comparison">
      <div className="comparison-container">
        {/* Header */}
        <div className="comparison-header">
          <div className="header-content">
            <h1 className="comparison-title">Comparación de Vehículos</h1>
            <p className="comparison-subtitle">
              Compara especificaciones, precios y características de hasta 3 vehículos
            </p>
          </div>
          <div className="header-actions">
            <button 
              className="btn-secondary"
              onClick={clearComparison}
              disabled={activeVehicles.length === 0}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
              Limpiar Todo
            </button>
          </div>
        </div>

        {/* Vehicle Cards */}
        <div className="vehicles-row">
          {comparisonVehicles.map((vehicle, index) => (
            <div key={index} className={`vehicle-column ${vehicle ? 'has-vehicle' : 'empty-slot'}`}>
              {vehicle ? (
                <>
                  <div className="vehicle-card">
                    <button 
                      className="remove-vehicle"
                      onClick={() => removeVehicle(index)}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    </button>
                    
                    <div className="vehicle-image">
                      <img src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} />
                    </div>
                    
                    <div className="vehicle-info">
                      <h3 className="vehicle-name">
                        {vehicle.year} {vehicle.brand} {vehicle.model}
                      </h3>
                      
                      <div className="vehicle-rating">
                        <div className="stars">
                          {renderStars(vehicle.rating)}
                        </div>
                        <span className="rating-value">{vehicle.rating}</span>
                      </div>
                      
                      <div className="vehicle-price">
                        <span className="price-value">{formatPrice(vehicle.price)}</span>
                        <span className="price-period">/mes</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-slot-card">
                  <div className="empty-slot-content">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                    <p>Agregar vehículo</p>
                    <button className="btn-primary add-vehicle-btn">
                      Buscar Vehículos
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {activeVehicles.length > 0 && (
          <div className="comparison-content">
            {/* Specifications Table */}
            <div className="comparison-section">
              <h2 className="section-title">Especificaciones Técnicas</h2>
              <div className="comparison-table">
                <div className="table-header">
                  <div className="spec-label-column">Especificación</div>
                  {activeVehicles.map((vehicle, index) => (
                    <div key={index} className="vehicle-column-header">
                      {vehicle.year} {vehicle.brand} {vehicle.model}
                    </div>
                  ))}
                </div>
                
                <div className="table-body">
                  {comparisonSpecs.map(spec => (
                    <div key={spec.key} className="table-row">
                      <div className="spec-label">{spec.label}</div>
                      {activeVehicles.map((vehicle, index) => (
                        <div key={index} className="spec-value">
                          {vehicle.specifications[spec.key] || '-'}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Expert Ratings */}
            <div className="comparison-section">
              <h2 className="section-title">Calificaciones de Expertos</h2>
              <div className="ratings-comparison">
                {ratingSpecs.map(rating => (
                  <div key={rating.key} className="rating-row">
                    <div className="rating-label">{rating.label}</div>
                    <div className="rating-bars">
                      {activeVehicles.map((vehicle, index) => (
                        <div key={index} className="rating-bar-container">
                          <div className="rating-bar">
                            <div 
                              className="rating-fill"
                              style={{ width: `${(vehicle.expertRatings[rating.key] / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="rating-value">
                            {vehicle.expertRatings[rating.key]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Comparison */}
            <div className="comparison-section">
              <h2 className="section-title">Características</h2>
              <div className="features-comparison">
                <div className="features-grid">
                  {activeVehicles.map((vehicle, index) => (
                    <div key={index} className="vehicle-features">
                      <h4 className="features-title">
                        {vehicle.year} {vehicle.brand} {vehicle.model}
                      </h4>
                      <ul className="features-list">
                        {vehicle.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="feature-item">
                            <span className="feature-icon">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Comparison */}
            <div className="comparison-section">
              <h2 className="section-title">Comparación de Precios</h2>
              <div className="price-comparison">
                <div className="price-chart">
                  {activeVehicles.map((vehicle, index) => (
                    <div key={index} className="price-bar">
                      <div className="price-info">
                        <span className="vehicle-name">
                          {vehicle.year} {vehicle.brand} {vehicle.model}
                        </span>
                        <span className="price-value">
                          {formatPrice(vehicle.price)}
                        </span>
                      </div>
                      <div className="price-visual">
                        <div 
                          className="price-fill"
                          style={{ 
                            width: `${(vehicle.price / Math.max(...activeVehicles.map(v => v.price))) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {activeVehicles.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-content">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 3H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H7V5h2v12zm8-14h-2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14h-2V5h2v12z"/>
              </svg>
              <h3>No hay vehículos para comparar</h3>
              <p>Agrega vehículos desde la búsqueda para comenzar la comparación</p>
              <button className="btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                Buscar Vehículos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleComparison;
