import React, { useState } from 'react';
import './VehicleAnalysis.css';

const VehicleAnalysis = ({ vehicle, onVehicleSelect }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicle);

  // Mock data para análisis de vehículos
  const vehiclesData = [
    {
      id: 1,
      name: 'Toyota Corolla Hybrid 2023',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop',
      analysis: {
        performance: {
          score: 8.5,
          acceleration: 7.2,
          topSpeed: 8.0,
          fuelEfficiency: 9.5,
          handling: 8.8
        },
        safety: {
          score: 9.2,
          crashTest: 9.5,
          safetyFeatures: 9.0,
          visibility: 8.8,
          braking: 9.1
        },
        comfort: {
          score: 8.7,
          rideQuality: 8.5,
          noiseLevel: 8.9,
          seatComfort: 8.6,
          climateControl: 8.8
        },
        technology: {
          score: 8.9,
          infotainment: 8.7,
          connectivity: 9.1,
          driverAssistance: 8.8,
          userInterface: 8.9
        },
        value: {
          score: 9.1,
          price: 8.5,
          reliability: 9.5,
          resaleValue: 9.0,
          maintenance: 9.3
        }
      },
      insights: [
        'Excelente eficiencia de combustible con tecnología híbrida',
        'Sistema de seguridad avanzado con múltiples airbags',
        'Tecnología de infoentretenimiento intuitiva',
        'Alto valor de reventa en el mercado colombiano',
        'Mantenimiento económico y confiable'
      ],
      recommendations: [
        'Ideal para uso urbano y viajes largos',
        'Perfecto para familias que buscan eficiencia',
        'Excelente opción para conductores primerizos',
        'Recomendado para profesionales que viajan frecuentemente'
      ]
    },
    {
      id: 2,
      name: 'Honda Civic 2023',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop',
      analysis: {
        performance: {
          score: 9.2,
          acceleration: 9.5,
          topSpeed: 9.0,
          fuelEfficiency: 8.0,
          handling: 9.3
        },
        safety: {
          score: 9.0,
          crashTest: 9.2,
          safetyFeatures: 8.8,
          visibility: 8.9,
          braking: 9.0
        },
        comfort: {
          score: 8.9,
          rideQuality: 8.8,
          noiseLevel: 8.7,
          seatComfort: 9.0,
          climateControl: 9.1
        },
        technology: {
          score: 9.0,
          infotainment: 9.2,
          connectivity: 8.9,
          driverAssistance: 8.9,
          userInterface: 9.0
        },
        value: {
          score: 8.8,
          price: 8.0,
          reliability: 9.2,
          resaleValue: 8.7,
          maintenance: 8.9
        }
      },
      insights: [
        'Motor turbo potente con excelente aceleración',
        'Diseño deportivo y aerodinámico',
        'Tecnología Honda Sensing de seguridad',
        'Interior espacioso y bien equipado',
        'Manejo ágil y divertido'
      ],
      recommendations: [
        'Perfecto para conductores que buscan emoción',
        'Ideal para jóvenes profesionales',
        'Excelente para carreteras de montaña',
        'Recomendado para entusiastas del automovilismo'
      ]
    },
    {
      id: 3,
      name: 'Nissan Sentra 2022',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop',
      analysis: {
        performance: {
          score: 7.8,
          acceleration: 7.5,
          topSpeed: 7.8,
          fuelEfficiency: 8.5,
          handling: 7.9
        },
        safety: {
          score: 8.5,
          crashTest: 8.7,
          safetyFeatures: 8.3,
          visibility: 8.4,
          braking: 8.6
        },
        comfort: {
          score: 8.2,
          rideQuality: 8.0,
          noiseLevel: 8.3,
          seatComfort: 8.1,
          climateControl: 8.4
        },
        technology: {
          score: 8.0,
          infotainment: 7.8,
          connectivity: 8.2,
          driverAssistance: 8.1,
          userInterface: 7.9
        },
        value: {
          score: 8.7,
          price: 9.0,
          reliability: 8.5,
          resaleValue: 8.3,
          maintenance: 8.9
        }
      },
      insights: [
        'Precio muy competitivo en su segmento',
        'Consumo de combustible eficiente',
        'Diseño moderno y atractivo',
        'Equipamiento básico pero completo',
        'Mantenimiento económico'
      ],
      recommendations: [
        'Ideal para presupuestos ajustados',
        'Perfecto para uso diario urbano',
        'Excelente primera opción de compra',
        'Recomendado para estudiantes y jóvenes'
      ]
    }
  ];

  const handleVehicleSelect = (vehicleData) => {
    setSelectedVehicle(vehicleData);
    if (onVehicleSelect) {
      onVehicleSelect(vehicleData);
    }
  };

  const renderScoreBar = (score, maxScore = 10) => {
    const percentage = (score / maxScore) * 100;
    return (
      <div className="score-bar">
        <div 
          className="score-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
        <span className="score-value">{score}</span>
      </div>
    );
  };

  const getScoreColor = (score) => {
    if (score >= 9) return '#4CAF50';
    if (score >= 8) return '#8BC34A';
    if (score >= 7) return '#FFC107';
    if (score >= 6) return '#FF9800';
    return '#F44336';
  };

  return (
    <div className="vehicle-analysis">
      <div className="analysis-container">
        {/* Header */}
        <div className="analysis-header">
          <h2 className="analysis-title">Análisis de Datos del Vehículo</h2>
          <p className="analysis-subtitle">
            Selecciona un vehículo para ver su análisis detallado y recomendaciones
          </p>
        </div>

        {/* Vehicle Selection */}
        <div className="vehicle-selection">
          <h3 className="selection-title">Selecciona un Vehículo</h3>
          <div className="vehicles-grid">
            {vehiclesData.map((vehicleData) => (
              <div 
                key={vehicleData.id}
                className={`vehicle-option ${selectedVehicle?.id === vehicleData.id ? 'selected' : ''}`}
                onClick={() => handleVehicleSelect(vehicleData)}
              >
                <div className="vehicle-image">
                  <img src={vehicleData.image} alt={vehicleData.name} />
                </div>
                <div className="vehicle-info">
                  <h4 className="vehicle-name">{vehicleData.name}</h4>
                  <div className="vehicle-score">
                    <span className="score-label">Puntuación General:</span>
                    <div className="overall-score">
                      {Object.values(vehicleData.analysis).reduce((acc, category) => acc + category.score, 0) / Object.keys(vehicleData.analysis).length}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Results */}
        {selectedVehicle && (
          <div className="analysis-results">
            <div className="selected-vehicle-header">
              <div className="selected-vehicle-info">
                <img src={selectedVehicle.image} alt={selectedVehicle.name} />
                <div className="vehicle-details">
                  <h3>{selectedVehicle.name}</h3>
                  <div className="overall-rating">
                    <span className="rating-label">Puntuación General:</span>
                    <div className="rating-score">
                      {(Object.values(selectedVehicle.analysis).reduce((acc, category) => acc + category.score, 0) / Object.keys(selectedVehicle.analysis).length).toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Categories */}
            <div className="analysis-categories">
              {Object.entries(selectedVehicle.analysis).map(([category, data]) => (
                <div key={category} className="analysis-category">
                  <div className="category-header">
                    <h4 className="category-title">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h4>
                    <div className="category-score">
                      {data.score}
                    </div>
                  </div>
                  
                  <div className="category-details">
                    {Object.entries(data).filter(([key]) => key !== 'score').map(([metric, value]) => (
                      <div key={metric} className="metric-row">
                        <span className="metric-label">
                          {metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                        <div className="metric-bar">
                          {renderScoreBar(value)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Insights and Recommendations */}
            <div className="insights-section">
              <div className="insights-grid">
                <div className="insights-card">
                  <h4 className="card-title">Insights Clave</h4>
                  <ul className="insights-list">
                    {selectedVehicle.insights.map((insight, index) => (
                      <li key={index} className="insight-item">
                        <span className="insight-icon">💡</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="recommendations-card">
                  <h4 className="card-title">Recomendaciones</h4>
                  <ul className="recommendations-list">
                    {selectedVehicle.recommendations.map((recommendation, index) => (
                      <li key={index} className="recommendation-item">
                        <span className="recommendation-icon">✅</span>
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="analysis-actions">
              <button className="btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 3H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H7V5h2v12zm8-14h-2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14h-2V5h2v12z"/>
                </svg>
                Comparar Vehículo
              </button>
              <button className="btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Guardar Análisis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleAnalysis;
