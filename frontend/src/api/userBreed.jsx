import api from './api';

export const favoriteBreed = async (userId, breedId,isCreated) => {
    const body = { userId, breedId, isCreated}
    const response = await api.post('/api/v1/userBreed', body, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response;
}

export const unfavoriteBreed = async (id) => {
    const response = await api.delete(`/api/v1/userBreed/unfavorite/${id}`);
    return response;
}

export const getAllUserBreeds = async () => {
    const response = await api.get(`/api/v1/userBreed`);
    return response.data;
}

export const createUserBreed = async (userId, breedId) => {
    const userBreed = { userId, breedId, isCreated: true };
    const response = await api.post('/api/v1/userBreed', userBreed);
    return response.data;
}