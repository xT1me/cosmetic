import api from "../api";

export const createOrder = async (username, cartItems, total) => {
    const payload = {
        userId: username,
        products: cartItems,
        totalPrice: total,
    };

    try {
        const response = await api.post('/orders', payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};
