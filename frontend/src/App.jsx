import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Differentiator from './components/Differentiator';
// vbenitezz
import VehicleForm from './components/VehicleForm';
import VehicleList from './components/VehicleList';
// vbenitezz
import SearchResults from './pages/SearchResults';
import VehicleDetails from './pages/VehicleDetails';
import VehicleComparison from './pages/VehicleComparison';
import Features from './pages/Features';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSearch = (searchData) => {
    console.log('Searching for:', searchData);
    setCurrentPage('search');
  };

  const handleViewDetails = (vehicleId) => {
    setSelectedVehicle(vehicleId);
    setCurrentPage('details');
  };

  const handleBackToSearch = () => {
    setCurrentPage('search');
    setSelectedVehicle(null);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedVehicle(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'search':
        return <SearchResults onViewDetails={handleViewDetails} />;
      case 'details':
        return <VehicleDetails vehicleId={selectedVehicle} onBack={handleBackToSearch} />;
      case 'comparison':
        return <VehicleComparison onBack={handleBackToHome} />;
      case 'features':
        return <Features />;
      case 'registrar':
        return (
          <div className="registrar">
              <VehicleForm vehicleCreated={() => setRefresh(!refresh)} />
              {/* <VehicleList refresh={refresh} /> */}
          </div>
        );
      case 'listar':
        return (
          <div className="listar">
            <VehicleList />
          </div>
        );
      case 'home':
      default:
        return (
          <>
            <Hero onSearch={handleSearch} />
            <Differentiator />
          </>
        );
    }
  };

  return (
    <div className="App">
      <Header 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      {renderPage()}
    </div>
  );
}

export default App;
