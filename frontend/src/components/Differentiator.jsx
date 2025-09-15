import React from 'react';
import './Differentiator.css';

const Differentiator = () => {
  const steps = [
    {
      number: '01',
      title: 'BÚSQUEDA GUIADA',
      description: 'No solo listamos autos, guiamos tu búsqueda con datos estructurados y sugerencias personalizadas.',
      icon: '🔍'
    },
    {
      number: '02',
      title: 'COMPARACIÓN A FONDO',
      description: 'Compara especificaciones clave, ideal para usuarios que quieren tomar decisiones informadas.',
      icon: '⚖️'
    },
    {
      number: '03',
      title: 'DASHBOARD VISUAL',
      description: 'Accede a un resumen de precios, características y valoraciones para cada vehículo.',
      icon: '📊'
    }
  ];

  return (
    <section className="differentiator">
      <div className="differentiator-container">
        <div className="differentiator-header">
          <div className="differentiator-badge">
            <span>DIFERENCIADOR FRENTE A COMPETIDORES</span>
          </div>
          <h2 className="differentiator-title text-glow">Cómo Funciona</h2>
          <p className="differentiator-subtitle">
            Nuestra plataforma revoluciona la forma de encontrar tu vehículo ideal con tecnología avanzada y datos precisos.
          </p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step hover-lift">
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="step-connector">
                  <div className="connector-line"></div>
                  <div className="connector-dot"></div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Differentiator;
