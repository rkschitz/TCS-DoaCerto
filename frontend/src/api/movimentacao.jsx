import api from './api';

export const buscarMovimentacoes = async () => {
    const response = await api.get('/api/v1/movimentacao')
    return response;
};