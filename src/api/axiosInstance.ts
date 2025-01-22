import axios from 'axios';
import { useMsal } from '@azure/msal-react';
import { AuthenticationResult } from '@azure/msal-browser';

// Create a custom Axios instance  
const api = axios.create();

// Define an async function to get the token  
const getToken = async (): Promise<string | null> => {
    const { instance, accounts } = useMsal();
    const request = {
        scopes: ['https://tstest1.crm.dynamics.com/.default'],
        account: accounts[0],
    };

    try {
        const tokenResponse: AuthenticationResult = await instance.acquireTokenSilent(request);
        return tokenResponse.accessToken;
    } catch (error) {
        console.error("Token acquisition failed", error);
        return null;
    }
};

// Add a request interceptor  
api.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;