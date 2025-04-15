import api from './api';

export const buscarPessoaPorNome = async (nome, cpf) => {
    const response = await api.get('/api/v1/pessoa/buscar',
        { params: { nome, cpf } });
    return response;
}

export const criar = async (pessoa) => {
    const response = await api.post('/api/v1/pessoa', pessoa);
    return response;
}