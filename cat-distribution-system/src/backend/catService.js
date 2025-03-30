import axios from 'axios';

const API_URL = 'http://localhost:8080/cats';

export const fetchCats = async (searchTerm, sortBy, direction, minAge, maxAge) => {
    try {
        const url = `${API_URL}/filter-sort`;

        const params = new URLSearchParams();

        if (searchTerm) {
            params.append('nameFilter', searchTerm);
        }

        if (sortBy) {
            params.append('sortBy', sortBy);
        }

        if (direction !== undefined) {
            params.append('ascending', direction);
        }

        if (minAge !== undefined) {
            params.append('minAge', minAge);
        }

        if (maxAge !== undefined) {
            params.append('maxAge', maxAge);
        }

        const response = await axios.get(`${url}?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cats:", error);
        throw error;
    }
};


export const addCat = async (catData) => {
    try {
        const response = await axios.post(API_URL, catData);
        return response.data;
    } catch (error) {
        console.error("Error adding cat:", error);
        throw error;
    }
};


export const deleteCat = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting cat:", error);
        throw error;
    }
};


export const updateCat = async (id, catData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, catData);
        return response.data;
    } catch (error) {
        console.error("Error updating cat:", error);
        throw error;
    }
};