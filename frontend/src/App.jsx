import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Differentiator from './components/Differentiator';
import SearchResults from './pages/SearchResults';
import VehicleDetails from './pages/VehicleDetails/VehicleDetails';
import VehicleComparison from './pages/VehicleComparison';
import Features from './pages/Features';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CartPage from './pages/CartPage';
import Admin from './pages/Admin';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ComparisonProvider } from './contexts/ComparisonContext';
import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchFilters, setSearchFilters] = useState(null);
  const { isAuthenticated, user } = useAuth();

  const handleSearch = (searchData) => {
    console.log('Hero search data received:', searchData);
    setSearchFilters(searchData);
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
        return <SearchResults onViewDetails={handleViewDetails} initialFilters={searchFilters} />;
      case 'details':
        return <VehicleDetails vehicleId={selectedVehicle} onBack={handleBackToSearch} />;
      case 'comparison':
        return <VehicleComparison onBack={handleBackToHome} />;
      case 'features':
        return <Features />;
      case 'signup':
        return <Signup onNavigate={setCurrentPage} />;
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'admin':
        return <Admin />;
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

function App() {
  return (
    <AuthProvider>
      <ComparisonProvider>
        <AppContent />
      </ComparisonProvider>
    </AuthProvider>
  );
}

export default App;
