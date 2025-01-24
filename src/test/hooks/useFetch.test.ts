import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios, { AxiosInstance } from 'axios';
import { renderHook } from '../../utils/test-utils';
import { useMsal } from '@azure/msal-react';
import useFetch from '../../hooks/useFetch';

// Mock the useMsal hook from @azure/msal-react  
vi.mock('@azure/msal-react', () => ({
    useMsal: vi.fn(),
}));

// Mock axios since we are using it in our hook  
vi.mock('axios', () => ({
    create: vi.fn(() => ({
        interceptors: {
            request: {
                use: vi.fn(),
            },
        },
    })),
}));

describe('useFetch', () => {
    let axiosInstance: AxiosInstance;
    let instanceMock: any;
    let accountsMock: any;
    let acquireTokenSilentMock: any;

    beforeEach(() => {
        acquireTokenSilentMock = vi.fn();

        instanceMock = {
            acquireTokenSilent: acquireTokenSilentMock,
        };

        accountsMock = [
            { username: 'testuser' },
        ];

        useMsal.mockReturnValue({
            instance: instanceMock,
            accounts: accountsMock,
        });

        axiosInstance = axios.create();

        // Mock the use of axios interceptors  
        axiosInstance.interceptors.request.use = vi.fn();
    });

    it('should return an axios instance', () => {
        const { result } = renderHook(() => useFetch());
        expect(result.current).toBe(axiosInstance);
    });
});