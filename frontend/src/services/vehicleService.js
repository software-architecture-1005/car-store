import api from '../api/axiosGlobalInstance';

export const getVehicles = (params = {}) =>
    api.get('/vehicles/', { params }).then((res) => res.data.results);

export const getVehicle = (id) =>
    api.get(`/vehicles/${id}/`).then((res) => res.data);

export const createVehicle = (vehicle_data) =>
    api.post('/vehicles/', vehicle_data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res) => res.data);

export const updateVehicle = (id, vehicle_data) =>
    api.put(`/vehicles/${id}/`, vehicle_data).then((res) => res.data);

export const partialUpdateVehicle = (id, vehicle_data) =>
    api.patch(`/vehicles/${id}/`, vehicle_data).then((res) => res.data);

export const deleteVehicle = (id) =>
    api.delete(`/vehicles/${id}/`).then((res) => res.data);

// Búsquedas inteligentes
export const searchVehicles = (searchParams = {}) => {
    // Crear URLSearchParams para manejar correctamente los arrays
    const params = new URLSearchParams();
    
    Object.keys(searchParams).forEach(key => {
        const value = searchParams[key];
        if (Array.isArray(value)) {
            // Para arrays, agregar cada elemento como parámetro separado
            value.forEach(item => {
                params.append(key, item);
            });
        } else if (value !== null && value !== undefined && value !== '') {
            params.append(key, value);
        }
    });
    
    console.log('URL params:', params.toString());
    return api.get(`/vehicles/search/?${params.toString()}`).then((res) => res.data);
};

export const getSearchSuggestions = (query) =>
    api.get('/vehicles/suggestions/', { params: { q: query } }).then((res) => res.data);

export const getVehiclesByMake = (makeId) =>
    api.get(`/vehicles/by_make/?make_id=${makeId}`).then((res) => res.data);

export const getVehiclesByCategory = (categoryId) =>
    api.get(`/vehicles/by_category/?category_id=${categoryId}`).then((res) => res.data);