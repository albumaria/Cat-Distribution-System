import axios from 'axios';
import {addOperationLogBackend} from "./BackendOperationLogManagement";

const API_URL = "http://localhost:8080/mischief"

export const fetchMischiefRecordsBackend = async (catId, descriptionFilter, sortBy, ascending, wasCaught) => {
    try {
        const url = `${API_URL}/filter-sort`

        const params = new URLSearchParams();
        if (catId) {
            params.append("catId", catId);
        }

        if (descriptionFilter) {
            params.append("descriptionFilter", descriptionFilter);
        }

        if (sortBy) {
            params.append("sortBy", sortBy);
        }

        if (ascending !== undefined && ascending !== null) {
            params.append("ascending", ascending);
        }

        if (wasCaught !== undefined && wasCaught !== null) {
            params.append("wasCaught", wasCaught);
        }

        const response = await axios.get(`http://localhost:8080/mischief/filter-sort?${params.toString()}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching records:", error);
        throw error;
    }
};

export const addMischiefRecordBackend = async (catId, mischiefRecordData) => {
    try {
        const response = await axios.post(`http://localhost:8080/mischief/${catId}`, mischiefRecordData);
        let operationLog = { action: "Add", entity: "MischiefRecord", performdate: null}
        await addOperationLogBackend(operationLog);
        return response.data;
    }
    catch(error) {
        console.error("Error adding mischief record:", error);
        throw error;
    }
};

export const deleteMischiefRecordBackend = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        let operationLog = { action: "Delete", entity: "MischiefRecord", performdate: null}
        await addOperationLogBackend(operationLog);
        return response.data;
    } catch (error) {
        console.error("Error deleting mischief record:", error);
        throw error;
    }
};


export const updateMischiefRecordBackend = async (mischiefRecordData) => {
    try {
        const recordId = mischiefRecordData.id;
        if (!recordId) {
            throw new Error("Mischief record ID is required for updates");
        }

        const response = await axios.patch(`${API_URL}/${recordId}`, mischiefRecordData);
        let operationLog = { action: "Update", entity: "MischiefRecord", performdate: null}
        await addOperationLogBackend(operationLog);
        return response.data;
    } catch (error) {
        console.error("Error updating mischief record:", error);
        throw error;
    }
};