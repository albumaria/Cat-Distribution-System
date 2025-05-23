import axios from 'axios';
import {getUser} from "../utils/UserSession";
import {addOperationLogBackend} from "./BackendOperationLogManagement";

const API_URL = 'https://catdistribution-backend-eqfuhfbffzcuandb.polandcentral-01.azurewebsites.net/cats';

export const checkBackendStatus = async () => {
    try {
        await axios.get(`${API_URL}`);
        return true;
    } catch {
        return false;
    }
};

export const fetchCatsBackend = async (searchTerm, sortBy, direction, minAge, maxAge, user) => {
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
        if (user && user.id) {
            params.append('user', user.id);
        }

        const response = await axios.get(`${url}?${params.toString()}`);
        return response.data;

    } catch (error) {
        console.error("Error fetching cats:", error);
        throw error;
    }
};

export const addCatBackend = async (catData) => {
    try {
        const response = await axios.post(`${API_URL}/${getUser().id}`, catData);
        let operationLog = { action: "Add", entity: "Cat", performdate: null}
        await addOperationLogBackend(operationLog);
        return response.data;
    } catch (error) {
        console.error("Error adding cat:", error);
        throw error;
    }
};

export const deleteCatBackend = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        let operationLog = { action: "Delete", entity: "Cat", performdate: null}
        await addOperationLogBackend(operationLog);
        return response.data;
    } catch (error) {
        console.error("Error deleting cat:", error);
        throw error;
    }
};


export const updateCatBackend = async (id, catData) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}`, catData);
        let operationLog = { action: "Update", entity: "Cat", performdate: null}
        await addOperationLogBackend(operationLog);
        return response.data;
    } catch (error) {
        console.error("Error updating cat:", error);
        throw error;
    }
};