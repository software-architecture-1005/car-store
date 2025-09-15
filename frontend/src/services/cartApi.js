import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/car-store/api/v1',
});

// === IMPORTANTE: Manejo de la Autenticación ===
// Tu API requiere que el usuario esté autenticado. Necesitamos interceptar
// cada petición para añadir el token de autorización.
apiClient.interceptors.request.use(
  (config) => {
    // Obtenemos el token (asumimos que lo guardas en localStorage después del login)
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // O `Token ${token}` dependiendo de tu backend
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Función para obtener el contenido del carrito
export const getCart = async () => {
  try {
    // Hacemos la petición al endpoint que creamos (ej. /api/cart/)
    const response = await apiClient.get('/cart/'); // Usando la ruta singular
    return response.data[0]; // La API de DRF a menudo devuelve una lista, tomamos el primer (y único) objeto.
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// Función para eliminar un item del carrito
export const removeItemFromCart = async (itemId) => {
  try {
    // Hacemos POST a la acción personalizada
    const response = await apiClient.post(`/cart/remove_item/`, { item_id: itemId });
    return response.data;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};