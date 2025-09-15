import React, { useState, useEffect } from 'react';
import { getCart, removeItemFromCart } from '../services/cartApi';
import './CartPage.css'; // Crearemos este archivo para los estilos

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para cargar los datos del carrito cuando el componente se monta
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        const cartData = await getCart();
        setCart(cartData);
        setError(null);
      } catch (err) {
        setError('No se pudo cargar el carrito. Por favor, inicia sesión.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []); // El array vacío asegura que se ejecute solo una vez

  // Función para manejar la eliminación de un item
  const handleRemoveItem = async (itemId) => {
    try {
      await removeItemFromCart(itemId);
      // Actualizamos el estado local para reflejar el cambio sin recargar la página
      setCart(prevCart => ({
        ...prevCart,
        // Filtramos el item eliminado de la lista
        items: prevCart.items.filter(item => item.id !== itemId),
        // Opcional: Re-calculamos el total localmente o esperamos la nueva info de la API
      }));
      // Idealmente, la API debería devolver el carrito actualizado para re-sincronizar el total
      const updatedCart = await getCart();
      setCart(updatedCart);

    } catch (err) {
      setError('Error al eliminar el artículo.');
    }
  };

  // --- Renderizado Condicional ---
  if (loading) {
    return <p className="cart-message">Cargando tu carrito...</p>;
  }

  if (error) {
    return <p className="cart-message error">{error}</p>;
  }

  if (!cart || cart.items.length === 0) {
    return <p className="cart-message">Tu carrito está vacío.</p>;
  }

  // --- Renderizado Principal ---
  return (
    <div className="cart-container">
      <h2>🛒 Tu Carrito de Compras</h2>
      <ul className="cart-items-list">
        {cart.items.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="item-info">
              <span className="item-model">{item.vehicle.make.name} {item.vehicle.model}</span>
              <span className="item-price">${new Intl.NumberFormat('es-CO').format(item.vehicle.price)}</span>
            </div>
            <button 
              onClick={() => handleRemoveItem(item.id)} 
              className="remove-button"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <h3>Total: ${new Intl.NumberFormat('es-CO').format(cart.total_price)}</h3>
      </div>
    </div>
  );
};

export default CartPage;