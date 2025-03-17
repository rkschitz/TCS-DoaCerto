import api from './api';

export const listMeasurementUnits = async () => {
    const response = await api.get('/api/v1/measurementUnit/');
    return response;
};

export const updateMeasurementUnit = async (id, measurementUnit) => {
    const response = await api.put(`/api/v1/measurementUnit/${id}`, measurementUnit);
    return response;
}

export const insertMeasurementUnit = async (measurementUnit) => {
    const response = await api.post('/api/v1/measurementUnit/', measurementUnit);
    return response;
}

export const deleteMeasurementUnit = async (id) => {
    const response = await api.delete(`/api/v1/measurementUnit/${id}`);
    return response;
}

