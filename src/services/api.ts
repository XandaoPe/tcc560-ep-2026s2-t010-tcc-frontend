import axios from 'axios';

// Utiliza a variável de ambiente do Vite ou cai para o localhost por padrão
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/thermal';

const api = axios.create({
    baseURL: API_BASE_URL
});

export const triggerSimulation = async (scenarioType: string, zone?: string) => {
    const response = await api.post('/simulate', { scenarioType, zone });
    return response.data;
};

export const fetchEventsHistory = async () => {
    const response = await api.get('/events');
    return response.data;
};