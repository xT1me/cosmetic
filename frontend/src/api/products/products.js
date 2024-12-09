import api from "../api";

export const getProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductsByCategory = async (categoryId) => {
    try {
        const response = await api.get(`/products/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
};


export const createProduct = async (productData) => {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('quantity', productData.quantity);
    formData.append('category', productData.category);
    formData.append('image', productData.image);

    try {
        const response = await api.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};