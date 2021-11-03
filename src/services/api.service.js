import axios from 'axios';

export const ApiService = axios.create({
    baseURL: 'http://app.heatscore.co:8080/',
    headers: {
        'Content-Type': 'application/json',
        withCredentials: true,
    },
})