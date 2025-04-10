import api from './api';

export const buscarPessoaPorNome = async (nome, cpf) => {
    const response = await api.get('/api/v1/pessoa/buscar',
        { params: { nome, cpf } });
    return response;
}