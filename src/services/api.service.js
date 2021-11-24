import axios from 'axios';
import { AppStorage } from './app-storage.service';

export const ApiService = axios.create({
    baseURL: 'http://app.heatscore.co:8080/',
    headers: { 'Content-Type': 'application/json' },
})

ApiService.interceptors.request.use(
    async config => {
        try {
            const authToken = await AppStorage.getToken(null);
            if (authToken) {
                config.headers.Authorization = `Bearer ${authToken}`;
            }
            return config;
        } catch (error) {
            // console.warn(error);
            return config;
        }
    },
    err => Promise.reject(err)
);