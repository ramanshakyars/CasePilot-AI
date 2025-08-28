

import axios from 'axios';


const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || '', // Configure via .env
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Request interceptor to attach tokens or headers
apiClient.interceptors.request.use(
    (config) => {
        // Example: Attach token if available
        // const token = localStorage.getItem('authToken');
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: Response interceptor for global error handling or transformations
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors, e.g., 401 Unauthorized
        return Promise.reject(error);
    }
);

const httpService = {
    get: (url, config = {}) => apiClient.get(url, config),

    post: (url, data, config = {}) => apiClient.post(url, data, config),

    put: (url, data, config = {}) => apiClient.put(url, data, config),

    patch: (url, data, config = {}) => apiClient.patch(url, data, config),

    delete: (url, dataOrConfig = {}) => {
        
        const config = dataOrConfig.data ? dataOrConfig : { data: dataOrConfig };
        return apiClient.delete(url, config);
    },
};

export default httpService;
