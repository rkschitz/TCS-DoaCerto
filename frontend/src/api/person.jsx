import api from './api';

export const personLogin = async (email, password) => {
    const body = { email, password };
    const response = await api.post('/api/v1/login', body, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response;
};

export const registerPerson = async (data) => {
    const response = await api.post('/api/v1/register', data, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response;
};

export const listPersons = async () => {
    const response = await api.get('/api/v1/person/');
    return response;
};
