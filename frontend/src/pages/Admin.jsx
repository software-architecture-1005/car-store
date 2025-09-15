import React, { useState, useEffect } from 'react';
import VehicleForm from '../components/VehicleForm';
import VehicleList from '../components/VehicleList';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('add');
  const [refresh, setRefresh] = useState(false);

  const handleVehicleCreated = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h1>Panel de Administración</h1>
        
        <div className="admin-tabs">
          <button 
            className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            Agregar Vehículo
          </button>
          <button 
            className={`tab-button ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            Gestionar Vehículos
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'add' && (
            <div className="admin-section">
              <h2>Agregar Nuevo Vehículo</h2>
              <VehicleForm vehicleCreated={handleVehicleCreated} />
            </div>
          )}
          
          {activeTab === 'manage' && (
            <div className="admin-section">
              <h2>Vehículos Registrados</h2>
              <VehicleList key={refresh} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;