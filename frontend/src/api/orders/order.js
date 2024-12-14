import api from "../api";

export const createOrder = async (username, cartItems, total) => {
    const payload = {
        userId: username,
        products: cartItems.map(item => ({
            productId: item.id,
            count: item.count,
        })),
        totalPrice: total,
    };

    try {
        const response = await api.post('/orders', payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { status, deliveryDate } = response.data;

        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const getAllOrders = async () => {
    try {
        const response = await api.get('/orders');
        return response.data;
    } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
    }
};

export const getOrdersByUserCompleted = async (userId) => {
    try {
        const response = await api.get(`/orders/user/${userId}/completed`);
        return response.data;
    } catch (error) {
        console.error('Error fetching completed orders for user:', error);
        throw error;
    }
};

export const getOrdersByUserInTransit = async (userId) => {
    try {
        const response = await api.get(`/orders/user/${userId}/in-transit`);
        return response.data;
    } catch (error) {
        console.error('Error fetching in-transit orders for user:', error);
        throw error;
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await api.post(`/orders/${orderId}/status`, { status }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};

export const getOrderDetails = async (orderId) => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
};
