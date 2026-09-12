import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/thermal';

const api = axios.create({
    baseURL: API_BASE_URL
});

export const triggerSimulation = async (scenarioType: string, zone?: string) => {
    const response = await api.post('/simulate', { scenarioType, zone });
    return response.data;
};

export const fetchEventsHistory = async (filters?: { search?: string; zone?: string; severity?: string; eventCode?: string; timeRange?: string }) => {
    const params = new URLSearchParams();
    if (filters) {
        if (filters.search) params.append('search', filters.search);
        if (filters.zone) params.append('zone', filters.zone);
        if (filters.severity) params.append('severity', filters.severity);
        if (filters.eventCode) params.append('eventCode', filters.eventCode);
        if (filters.timeRange) params.append('timeRange', filters.timeRange);
    }
    const response = await api.get(`/events?${params.toString()}`);
    return response.data;
};