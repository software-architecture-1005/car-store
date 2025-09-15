// src/components/VehicleList.jsx
import { useState, useEffect } from 'react';
import { getVehicles } from '../services/vehicleService';
import './VehicleList.css';

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVehicles()
      .then((data) => setVehicles(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Cargando vehículos...</p>;
  }

  if (vehicles.length === 0) {
    return <p>No se encontraron vehículos.</p>;
  }

  return (
    <div className="vehicles-grid">
      {vehicles.map((vehicle) => (
        <div className="vehicle-card" key={vehicle.id}>
          <img
            src={vehicle.image || '/images/default-car.jpg'}
            alt={vehicle.model}
            className="vehicle-image"
          />
          <div className="vehicle-info">
            <h3>{vehicle.model}</h3>
            <p>Año: {vehicle.year}</p>
            <p>Color: {vehicle.color}</p>
            <p>Precio: ${vehicle.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
