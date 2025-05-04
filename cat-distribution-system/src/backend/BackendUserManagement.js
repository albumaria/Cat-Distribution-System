import axios from 'axios';

const API_URL = 'http://localhost:8080/users';

export const fetchUsersBackend = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;

    } catch (error) {
        console.error("Error fetching cats:", error);
        throw error;
    }
};

export const addUserBackend = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    }
    catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
}

export const getUserBackend = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/user/${username}`);
        return response.data;
    }
    catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};

export const getMonitoredUsersBackend = async () => {
    try {
        const response = await axios.get(`${API_URL}/monitored-users`);
        return response.data;
    }
    catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};