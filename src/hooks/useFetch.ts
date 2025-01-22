import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import { useMsal } from '@azure/msal-react';
import { SilentRequest } from '@azure/msal-browser';

const useFetch = () => {
    const { instance, accounts } = useMsal();

    // Create an instance of axios  
    const axiosInstance = axios.create();

    // Set the interceptor  
    axiosInstance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            if (accounts && accounts.length > 0) {
                const request: SilentRequest = {
                    scopes: ["https://tstest1.crm.dynamics.com/.default"],
                    account: accounts[0]
                };

                try {
                    const tokenResponse = await instance.acquireTokenSilent(request);
                    const token = tokenResponse.accessToken;

                    // Attach token to headers  
                    if (config.headers) {
                        config.headers.Authorization = `Bearer ${token}`;
                    } else {
                        config.headers = { Authorization: `Bearer ${token}` } as AxiosRequestHeaders;
                    }
                } catch (error) {
                    console.error("Token acquisition failed: ", error);
                }
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useFetch;