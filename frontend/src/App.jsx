import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Differentiator from './components/Differentiator';
import SearchResults from './pages/SearchResults';
import VehicleDetails from './pages/VehicleDetails';
import VehicleComparison from './pages/VehicleComparison';
import Features from './pages/Features';
import CartPage from './pages/CartPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

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
      case 'cart':
        return <CartPage onViewDetails={handleViewDetails} />;
      case 'search':
        return <SearchResults onViewDetails={handleViewDetails} />;
      case 'details':
        return <VehicleDetails vehicleId={selectedVehicle} onBack={handleBackToSearch} />;
      case 'comparison':
        return <VehicleComparison onBack={handleBackToHome} />;
      case 'features':
        return <Features />;
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
