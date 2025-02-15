import api from './api';

export const getBreeds = async () => {
  const response = await api.get('/api/v1/breed');
  return response.data;
};

export const alimentBreed = async () => {
  const response = await api.get('/api/v1/breed/aliment');
  return response;
}

export const getBreedById = async (id) => {
  const response = await api.get(`/api/v1/breed/${id}`);
  return response.data;
}

export const createBreed = async (breed) => {
  const response = await api.post('/api/v1/breed', breed);
  return response.data;
}

export const updateBreed = async (breedId,breed) => {
  const response = await api.put(`/api/v1/breed/${breedId}`, breed);
  return response.data;
}