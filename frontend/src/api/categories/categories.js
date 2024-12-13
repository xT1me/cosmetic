import api from "../api";

export const createCategory = async (name, image) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
        const response = await api.post('/categories', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const getCategoryImage = async (path) => {
    try {
        const response = await api.get(`/files/${path}`, {
            responseType: 'blob',
        });

        return URL.createObjectURL(response.data);
    } catch (error) {
        console.error('Error fetching file:', error);
        throw error;
    }
};