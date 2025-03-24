import api from './api';

export const listAliments = async () => {
    const response = await api.get('/api/v1/aliment/');
    return response;
};

export const updateAliment = async (id, aliment) => {
    const response = await api.put(`/api/v1/aliment/${id}`, aliment);
    return response;
}

export const insertAliment = async (aliment) => {
    const response = await api.post('/api/v1/aliment/', aliment);
    return response;
}

export const deleteAliment = async (id) => {
    const response = await api.delete(`/api/v1/aliment/${id}`);
    return response;
}

