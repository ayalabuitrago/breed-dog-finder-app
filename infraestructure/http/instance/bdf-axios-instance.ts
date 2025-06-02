import axios, { AxiosError, AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.EXPO_PUBLIC_API_KEY
    },
    timeout: 20000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(new Error(error))
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            const { status, data } = error.response;
            const message = (data as any)?.message ?? 'Error desconocido';

            if (status >= 400 && status < 500) {
                console.warn('Error del cliente: ', message);
                return Promise.reject(new Error(message));
            }
            else if (status >= 500) {
                console.error('Error del servidor: ', message)
                return Promise.reject(new Error('Error del servidor. Inténtalo más tarde'));
            }
        }

        if (error.code === 'ECONNABORTED') {
            return Promise.reject(new Error('Tiempo de espera agotado. Verifica tu conexión a internet'))
        }

        return Promise.reject(new Error('Error inesperado'))
    }
)

export default axiosInstance