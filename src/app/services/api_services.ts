import axios from "axios";
import { getSession } from "next-auth/react";
import { env } from 'next-runtime-env';

const NEXT_PUBLIC_BASE_URL = env('NEXT_PUBLIC_BASE_URL');

const axiosClient = axios.create({
    baseURL: `${NEXT_PUBLIC_BASE_URL}`,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor: attach Authorization header if token is available
axiosClient.interceptors.request.use(async (config) => {
    const session: any = await getSession();

    if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    
    return config;
});

let isRefreshing = false;

axiosClient.interceptors.response.use(
    (res) => res.data,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshRes = await fetch("/api/auth/refresh");
                if (!refreshRes.ok) return Promise.reject(error);

                const session: any = await getSession();
                if (session?.access_token) {
                    originalRequest.headers.Authorization = `Bearer ${session.access_token}`;
                }

                return axiosClient(originalRequest);
            } catch {
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
