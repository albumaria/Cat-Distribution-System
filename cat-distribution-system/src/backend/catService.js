import axios from 'axios';

const API_URL = 'http://localhost:8080/cats';

export const fetchCats = async (sortBy, ascending, minAge, maxAge) => {
    try {
        let url = API_URL;

        const params = [];
        if (sortBy) {
            params.push(`sortBy=${sortBy}`);
        }
        if (ascending !== undefined) {
            params.push(`ascending=${ascending}`);
        }
        if (minAge !== undefined && maxAge !== undefined) {
            params.push(`minAge=${minAge}&maxAge=${maxAge}`);
        }

        if (params.length > 0) {
            url += `?${params.join("&")}`;
        }

        const response = await axios.get(url);
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