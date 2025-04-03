import api from './api';

export const listarDonatariosAtivos = async () => {
    const response = await api.get('/api/v1/donatario')
    return response;
};