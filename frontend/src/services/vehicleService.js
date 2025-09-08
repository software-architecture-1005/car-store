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