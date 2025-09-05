import React from 'react';
import './VehicleCard.css';

const VehicleCard = ({ vehicle, onViewDetails, onCompare }) => {
  const {
    id,
    image,
    brand,
    model,
    year,
    price,
    rating,
    specifications,
    location,
    isAvailable,
    isPromoted
  } = vehicle;

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
      stars.push(
        <span key={i} className="star filled">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">★</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">★</span>
      );
    }

    return stars;
  };

  return (
    <div className={`vehicle-card hover-lift ${isPromoted ? 'promoted' : ''}`}>
      {isPromoted && (
        <div className="promotion-badge">
          <span className="promotion-icon">⭐</span>
          <span className="promotion-text">Destacado</span>
        </div>
      )}
      
      <div className="card-image-container">
        <img 
          src={image} 
          alt={`${brand} ${model}`}
          className="card-image"
          loading="lazy"
        />
        <div className="card-overlay">
          <button 
            className="overlay-btn view-btn"
            onClick={() => onViewDetails(id)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            Ver Detalles
          </button>
          <button 
            className="overlay-btn compare-btn"
            onClick={() => onCompare(id)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 3H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H7V5h2v12zm8-14h-2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14h-2V5h2v12z"/>
            </svg>
            Comparar
          </button>
        </div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="vehicle-title">
            {year} {brand} {model}
          </h3>
          <div className="vehicle-rating">
            <div className="stars">
              {renderStars(rating)}
            </div>
            <span className="rating-value">{rating}</span>
          </div>
        </div>

        <div className="vehicle-specs">
          {specifications.map((spec, index) => (
            <div key={index} className="spec-item">
              <span className="spec-icon">{spec.icon}</span>
              <span className="spec-text">{spec.value}</span>
            </div>
          ))}
        </div>

        <div className="vehicle-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>{location}</span>
        </div>

        <div className="card-footer">
          <div className="price-container">
            <span className="price-label">Desde</span>
            <span className="price-value">{formatPrice(price)}</span>
            <span className="price-period">/mes</span>
          </div>
          
          <div className="availability">
            {isAvailable ? (
              <span className="available">Disponible</span>
            ) : (
              <span className="unavailable">No disponible</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
