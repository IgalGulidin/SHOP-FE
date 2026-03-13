import { api } from "./client";

export const ordersApi = {
    list: async () => {
        const response = await api.get("/api/orders");
        return response.data;
    },

    pending: async () => {
        const response = await api.get("/api/orders/pending");
        return response.data;
    },

    getById: async (orderId) => {
        const response = await api.get(`/api/orders/${orderId}`);
        return response.data;
    },

    changeQty: async (itemId, quantityChange) => {
        const response = await api.post(`/api/orders/pending/items/${itemId}`, {
            quantityChange,
        });
        return response.data;
    },

    pay: async () => {
        const response = await api.post("/api/orders/pending/pay");
        return response.data;
    },
};