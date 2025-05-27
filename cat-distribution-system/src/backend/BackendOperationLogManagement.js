import axiosInstance from './AxiosInstance';
import {getUser} from "../utils/UserSession";

const API_URL = '/operationLogs';

export const fetchOperationLogsBackend = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching operation logs:", error);
        throw error;
    }
};

export const addOperationLogBackend = async (operationData) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/${getUser().id}`, operationData);
        return response.data;
    } catch (error) {
        console.error("Error adding operation log:", error);
        throw error;
    }
}