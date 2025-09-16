import React, { useState, useEffect } from 'react';
import VehicleAnalysis from '../components/VehicleAnalysis';
import { getVehicles } from '../services/vehicleService';
import './Features.css';

const Features = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);
        const data = await getVehicles();
        const transformedVehicles = data.map(vehicle => ({
          id: vehicle.id,
          image: vehicle.image_url || (vehicle.image ? `http://localhost:8000${vehicle.image}` : '/images/default-car.jpg'),
          brand: vehicle.make_name || vehicle.make?.name || 'Sin marca',
          model: vehicle.model,
          year: vehicle.year,
          price: parseFloat(vehicle.price),
          color: vehicle.color,
          category: vehicle.category_name || vehicle.category?.name || 'Sin categoría',
          rating: 4.5,
          specifications: {
            engine: 'Motor estándar',
            power: 'Potencia estándar',
            transmission: 'Automática',
            fuelType: 'Gasolina',
            seats: 5,
            doors: 4
          },
          features: [
            'Sistema de seguridad estándar',
            'Conectividad básica',
            'Comodidad para pasajeros',
            'Eficiencia de combustible'
          ]
        }));
        setVehicles(transformedVehicles);
        if (transformedVehicles.length > 0) {
          setSelectedVehicle(transformedVehicles[0]);
        }
      } catch (error) {
        console.error('Error cargando vehículos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="features-page">
        <div className="features-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Cargando vehículos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="features-page">
      <div className="features-container">
        {/* Header Section */}
        <div className="features-header">
          <div className="features-badge">
            <span>CARACTERÍSTICAS AVANZADAS</span>
          </div>
          <h1 className="features-title text-glow">
            Análisis Inteligente de Vehículos
          </h1>
          <p className="features-subtitle">
            Descubre las características más avanzadas de AutoMatch. Nuestra plataforma utiliza 
            inteligencia artificial y análisis de datos para brindarte la información más precisa 
            sobre cada vehículo.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-card hover-lift">
            <div className="feature-icon">🔍</div>
            <h3 className="feature-title">Búsqueda Inteligente</h3>
            <p className="feature-description">
              Filtros avanzados que se adaptan a tus necesidades específicas, 
              utilizando algoritmos de machine learning para encontrar el vehículo perfecto.
            </p>
          </div>

          <div className="feature-card hover-lift">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Análisis de Datos</h3>
            <p className="feature-description">
              Evaluación completa de rendimiento, seguridad, confort y tecnología 
              basada en datos reales y reseñas de expertos.
            </p>
          </div>

          <div className="feature-card hover-lift">
            <div className="feature-icon">⚖️</div>
            <h3 className="feature-title">Comparación Avanzada</h3>
            <p className="feature-description">
              Compara hasta 3 vehículos lado a lado con métricas detalladas 
              y visualizaciones interactivas.
            </p>
          </div>

          <div className="feature-card hover-lift">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">Recomendaciones Personalizadas</h3>
            <p className="feature-description">
              Sugerencias inteligentes basadas en tu perfil de conductor, 
              presupuesto y preferencias específicas.
            </p>
          </div>

          <div className="feature-card hover-lift">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Datos Confiables</h3>
            <p className="feature-description">
              Información verificada directamente de concesionarios oficiales 
              y fuentes confiables del sector automotriz.
            </p>
          </div>

          <div className="feature-card hover-lift">
            <div className="feature-icon">📱</div>
            <h3 className="feature-title">Interfaz Intuitiva</h3>
            <p className="feature-description">
              Diseño moderno y fácil de usar que hace que encontrar tu vehículo 
              ideal sea una experiencia placentera.
            </p>
          </div>
        </div>

        {/* Vehicle Analysis Section */}
        <div className="analysis-section">
          <VehicleAnalysis vehicles={vehicles} selectedVehicle={selectedVehicle} onSelectVehicle={setSelectedVehicle} />
        </div>

        {/* CTA Section */}
        <div className="features-cta">
          <div className="cta-content">
            <h2 className="cta-title">¿Listo para Encontrar tu Vehículo Ideal?</h2>
            <p className="cta-subtitle">
              Explora nuestra plataforma y descubre por qué miles de usuarios confían en AutoMatch
            </p>
            <div className="cta-buttons">
              <button className="btn-primary btn-enhanced hover-glow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                Comenzar Búsqueda
              </button>
              <button className="btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 3H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H7V5h2v12zm8-14h-2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14h-2V5h2v12z"/>
                </svg>
                Comparar Vehículos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
