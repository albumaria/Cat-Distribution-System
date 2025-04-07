import axios from 'axios';

const FILE_API_URL = 'http://localhost:8080/files';

export const downloadCatImage = async (catId, catName) => {
    try {
        const response = await axios.get(`${FILE_API_URL}/download/cat-image/${catId}`, {
            responseType: 'blob'
        });

        const contentDisposition = response.headers['content-disposition'];
        const contentType = response.headers['content-type'];

        let filename = `${catName.toLowerCase()}-image`;

        if (contentDisposition) {
            const match = contentDisposition.match(/filename="?([^"]+)"?/);
            if (match && match[1]) {
                filename = match[1];
            }
        } else {
            const ext = contentType?.split('/')[1] ?? 'bin';
            filename += `.${ext}`;
        }

        const blob = new Blob([response.data], { type: contentType });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        console.error("Error downloading cat image:", error);
        throw error;
    }
};

export const downloadCatApp = async () => {
    try {
        const response = await axios.get(`${FILE_API_URL}/download/cat-app`, {
            responseType: 'blob'
        });

        const contentDisposition = response.headers['content-disposition'];
        const contentType = response.headers['content-type'];

        let filename = 'cat-quiz.exe';

        if (contentDisposition) {
            const match = contentDisposition.match(/filename="?([^"]+)"?/);
            if (match && match[1]) {
                filename = match[1];
            }
        }

        const blob = new Blob([response.data], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        console.error("Error downloading cat app:", error);
        throw error;
    }
};