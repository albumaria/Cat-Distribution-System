import axiosInstance from './AxiosInstance';

const API_URL = '/users';


export const loginUserBackend = async (username, password) => {
    try {
        const response = await axiosInstance.post('/auth/login', { 
            username, 
            password 
        });
        
        if (response.data.token && response.data.user) {
            return {
                token: response.data.token,
                user: response.data.user
            };
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const fetchUsersBackend = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const addUserBackend = async (userData) => {
    try {
        console.log('addUserBackend: Sending user data:', userData);
        const response = await axiosInstance.post('/auth/register', userData);
        console.log('addUserBackend: response:', response);
        return response.data;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};

export const getUserBackend = async (username) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/user/${username}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

export const getMonitoredUsersBackend = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/monitored-users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching monitored users:", error);
        throw error;
    }
};