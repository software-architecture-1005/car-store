import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axiosGlobalInstance from '../api/axiosGlobalInstance';
import './CartPage.css';

const CartPage = ({ onViewDetails }) => {
  console.log('CartPage component rendering');
  const { isAuthenticated, user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('CartPage useEffect - isAuthenticated:', isAuthenticated);
    console.log('CartPage useEffect - user:', user);
    if (isAuthenticated) {
      fetchCartItems();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      console.log('=== FETCHING CART ITEMS ===');
      const response = await axiosGlobalInstance.get('/cart/');
      console.log('Cart response:', response.data);
      
      if (response.data && response.data.length > 0) {
        const cart = response.data[0];
        console.log('Cart object:', cart);
        console.log('Cart items:', cart.items);
        setCartItems(cart.items || []);
      } else {
        console.log('No cart data found');
        setCartItems([]);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('No se pudo cargar el carrito. Por favor, inicia sesión.');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      console.log('Removing item from cart:', itemId);
      // Primero obtener el cart_id
      const cartResponse = await axiosGlobalInstance.get('/cart/');
      if (cartResponse.data && cartResponse.data.length > 0) {
        const cartId = cartResponse.data[0].id;
        // Usar el endpoint correcto para remover item
        await axiosGlobalInstance.post(`/cart/${cartId}/remove_item/`, { item_id: itemId });
        // Actualizar la lista local
        setCartItems(cartItems.filter(item => item.id !== itemId));
      }
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h1>Carrito de Compras</h1>
          <div className="error-message">
            No se pudo cargar el carrito. Por favor, inicia sesión.
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h1>Carrito de Compras</h1>
          <div className="loading">Cargando carrito...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Carrito de Compras</h1>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Tu carrito está vacío</h2>
            <p>Agrega algunos vehículos para comenzar tu compra.</p>
          </div>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img 
                    src={item.vehicle.image || '/images/default-car.jpg'} 
                    alt={item.vehicle.model}
                  />
                </div>
                <div className="item-details">
                  <h3>{item.vehicle.year} {item.vehicle.make.name} {item.vehicle.model}</h3>
                  <p>Categoría: {item.vehicle.category.name}</p>
                  <p>Color: {item.vehicle.color}</p>
                  <p className="price">${item.vehicle.price.toLocaleString()}</p>
                </div>
                <div className="item-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => onViewDetails && onViewDetails(item.vehicle.id)}
                  >
                    Ver Detalles
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            
            <div className="cart-summary">
              <h3>Resumen</h3>
              <p>Total de vehículos: {cartItems.length}</p>
              <p>Precio total: ${cartItems.reduce((sum, item) => sum + item.vehicle.price, 0).toLocaleString()}</p>
              <button className="btn-primary btn-checkout">
                Proceder al Pago
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;