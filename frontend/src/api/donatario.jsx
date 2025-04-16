import api from './api';

export const listarDonatariosAtivos = async () => {
    const response = await api.get('/api/v1/donatario')
    return response;
};

export const criarDonatario = async (donatario) => {
    const response = await api.post('/api/v1/donatario', donatario)
    return response;
}