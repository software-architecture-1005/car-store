import React, { useState, useEffect } from 'react';
import './VehicleDetails.css';
import { getVehicle } from '../services/vehicleService';

const VehicleDetails = ({ vehicleId, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVehicle = async () => {
      if (!vehicleId) {
        setError('ID de vehículo no proporcionado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const vehicleData = await getVehicle(vehicleId);
        
        // Transformar datos del backend al formato esperado
        const transformedVehicle = {
          id: vehicleData.id,
          images: vehicleData.image ? [`http://localhost:8000${vehicleData.image}`] : ['/images/default-car.jpg'],
          brand: vehicleData.make_name || vehicleData.make?.name || 'Sin marca',
          model: vehicleData.model,
          year: vehicleData.year,
          price: parseFloat(vehicleData.price),
          rating: 4.5, // Rating por defecto
          location: 'Colombia',
          isAvailable: true,
          color: vehicleData.color,
          category: vehicleData.category_name || vehicleData.category?.name || 'Sin categoría',
          // Especificaciones por defecto (en el futuro se pueden obtener del backend)
          specifications: {
            engine: 'Motor estándar',
            power: 'Potencia estándar',
            torque: 'Torque estándar',
            transmission: 'Automática',
            fuelType: 'Gasolina',
            fuelConsumption: 'Consumo estándar',
            acceleration: 'Aceleración estándar',
            topSpeed: 'Velocidad máxima estándar',
            seats: 5,
            doors: 4,
            cargo: 'Maletero estándar',
            drivetrain: 'Tracción estándar',
            weight: 'Peso estándar',
            length: 'Longitud estándar',
            width: 'Ancho estándar',
            height: 'Alto estándar'
          },
          expertRatings: {
            overall: 4.5,
            safety: 8.5,
            comfort: 8.5,
            technology: 8.5,
            performance: 8.5,
            reliability: 8.5,
            value: 8.5
          },
          expertReviews: [
            {
              source: 'AutoMatch Review',
              rating: 4.5,
              quote: 'Un vehículo confiable con buenas características para el mercado colombiano.',
              author: 'Equipo AutoMatch',
              date: new Date().toISOString().split('T')[0]
            }
          ],
          idealFor: ['Ciudad', 'Familiar', 'Confiabilidad'],
          features: [
            'Sistema de seguridad estándar',
            'Conectividad básica',
            'Comodidad para pasajeros',
            'Eficiencia de combustible',
            'Mantenimiento accesible'
          ],
          dealerships: [
            {
              name: 'Concesionario Principal',
              address: 'Colombia',
              phone: 'Contactar para más información',
              distance: 'Consultar ubicación',
              stock: 1
            }
          ]
        };

        setVehicle(transformedVehicle);
      } catch (err) {
        console.error('Error cargando vehículo:', err);
        setError('Error al cargar los detalles del vehículo');
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, [vehicleId]);

  if (loading) {
    return (
      <div className="vehicle-details">
        <div className="vehicle-details-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Cargando detalles del vehículo...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="vehicle-details">
        <div className="vehicle-details-container">
          <div className="error-message">
            <h2>Error</h2>
            <p>{error || 'Vehículo no encontrado'}</p>
            {onBack && (
              <button className="btn-primary" onClick={onBack}>
                Volver a la búsqueda
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

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

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: '📊' },
    { id: 'specs', label: 'Especificaciones', icon: '⚙️' },
    { id: 'reviews', label: 'Reseñas', icon: '⭐' },
    { id: 'dealers', label: 'Concesionarios', icon: '🏢' }
  ];

  return (
    <div className="vehicle-details">
      <div className="vehicle-details-container">
        {/* Back Button */}
        {onBack && (
          <div className="back-button-container">
            <button className="back-button" onClick={onBack}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
              Volver a la búsqueda
            </button>
          </div>
        )}
        {/* Header con imagen principal */}
        <div className="vehicle-header">
          <div className="vehicle-image-gallery">
            <div className="main-image">
              <img src={vehicle.images[0]} alt={`${vehicle.brand} ${vehicle.model}`} />
              <div className="image-overlay">
                <button className="gallery-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                  Ver todas las fotos
                </button>
              </div>
            </div>
            <div className="thumbnail-images">
              {vehicle.images.slice(1).map((image, index) => (
                <img key={index} src={image} alt={`Vista ${index + 2}`} />
              ))}
            </div>
          </div>

          <div className="vehicle-info">
            <div className="vehicle-badge">
              <span className="badge-text">Híbrido</span>
            </div>
            
            <h1 className="vehicle-title">
              {vehicle.year} {vehicle.brand} {vehicle.model}
            </h1>
            
            <div className="vehicle-subtitle">
              <span className="transmission">{vehicle.specifications.transmission}</span>
              <span className="separator">•</span>
              <span className="fuel-type">{vehicle.specifications.fuelType}</span>
            </div>

            <div className="vehicle-rating">
              <div className="rating-stars">
                {renderStars(vehicle.rating)}
              </div>
              <span className="rating-value">{vehicle.rating}</span>
              <span className="rating-label">Calificación promedio</span>
            </div>

            <div className="vehicle-location">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>{vehicle.location}</span>
            </div>

            <div className="price-section">
              <div className="price-main">
                <span className="price-value">{formatPrice(vehicle.price)}</span>
              </div>
              <div className="price-details">
                <span className="price-label">Precio del vehículo</span>
                <span className="price-note">*Precio de contado</span>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-primary cta-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 3H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H7V5h2v12zm8-14h-2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14h-2V5h2v12z"/>
                </svg>
                Añadir a Comparador
              </button>
              <button className="btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Guardar
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Visual */}
        <div className="dashboard-section">
          <h2 className="section-title">Dashboard Visual</h2>
          <div className="dashboard-grid">
            <div className="dashboard-card performance">
              <div className="card-icon">⚡</div>
              <div className="card-content">
                <h3>Motor y Rendimiento</h3>
                <div className="specs-grid">
                  <div className="spec-item">
                    <span className="spec-label">Potencia</span>
                    <span className="spec-value">{vehicle.specifications.power}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Torque</span>
                    <span className="spec-value">{vehicle.specifications.torque}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Consumo</span>
                    <span className="spec-value">{vehicle.specifications.fuelConsumption}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-card ratings">
              <div className="card-icon">⭐</div>
              <div className="card-content">
                <h3>Puntuación de Expertos</h3>
                <div className="ratings-grid">
                  {Object.entries(vehicle.expertRatings).map(([key, value]) => (
                    <div key={key} className="rating-item">
                      <span className="rating-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <div className="rating-bar">
                        <div 
                          className="rating-fill" 
                          style={{ width: `${(value / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="rating-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dashboard-card ideal-for">
              <div className="card-icon">🎯</div>
              <div className="card-content">
                <h3>Ideal para</h3>
                <div className="tags">
                  {vehicle.idealFor.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de información */}
        <div className="tabs-section">
          <div className="tabs-header">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-content">
                <div className="features-grid">
                  <h3>Características Principales</h3>
                  <div className="features-list">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <span className="feature-icon">✓</span>
                        <span className="feature-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="specs-content">
                <h3>Especificaciones Técnicas</h3>
                <div className="specs-table">
                  {Object.entries(vehicle.specifications).map(([key, value]) => (
                    <div key={key} className="spec-row">
                      <span className="spec-key">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <h3>Reseñas de Expertos</h3>
                <div className="reviews-list">
                  {vehicle.expertReviews.map((review, index) => (
                    <div key={index} className="review-card">
                      <div className="review-header">
                        <div className="review-source">
                          <h4>{review.source}</h4>
                          <div className="review-rating">
                            {renderStars(review.rating)}
                            <span className="rating-value">{review.rating}</span>
                          </div>
                        </div>
                        <div className="review-meta">
                          <span className="review-author">{review.author}</span>
                          <span className="review-date">{new Date(review.date).toLocaleDateString('es-CO')}</span>
                        </div>
                      </div>
                      <blockquote className="review-quote">
                        "{review.quote}"
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'dealers' && (
              <div className="dealers-content">
                <h3>Concesionarios Disponibles</h3>
                <div className="dealers-list">
                  {vehicle.dealerships.map((dealer, index) => (
                    <div key={index} className="dealer-card">
                      <div className="dealer-info">
                        <h4>{dealer.name}</h4>
                        <p className="dealer-address">{dealer.address}</p>
                        <p className="dealer-phone">{dealer.phone}</p>
                        <div className="dealer-meta">
                          <span className="dealer-distance">{dealer.distance}</span>
                          <span className="dealer-stock">{dealer.stock} unidades</span>
                        </div>
                      </div>
                      <button className="btn-primary dealer-contact">
                        Contactar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
