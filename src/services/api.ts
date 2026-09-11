import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/thermal'
});

export const triggerSimulation = async (scenarioType: string, zone?: string) => {
    const response = await api.post('/simulate', { scenarioType, zone });
    return response.data;
};

export const fetchEventsHistory = async () => {
    const response = await api.get('/events');
    return response.data;
};