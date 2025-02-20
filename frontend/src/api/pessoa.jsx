import api from './api';

export const loginPessoa = async (email, senha) => {
    const body = { email, senha };
    const response = await api.post('/api/v1/login', body, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response;
};
