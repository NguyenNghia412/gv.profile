import axios from "axios";
import { getSession } from "next-auth/react";
import { env } from 'next-runtime-env';

const NEXT_PUBLIC_BASE_URL = env('NEXT_PUBLIC_BASE_URL');
console.log("API base URL:", NEXT_PUBLIC_BASE_URL);

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
    
    // Log full URL for debugging
    const fullUrl = config.baseURL ? `${config.baseURL}${config.url}` : config.url;
    // eslint-disable-next-line no-console
    console.log('[axios] Request:', {
        method: config.method?.toUpperCase(),
        url: fullUrl,
        hasToken: !!session?.access_token,
    });
    
    return config;
});

axiosClient.interceptors.response.use((res) => res.data);

export default axiosClient;
