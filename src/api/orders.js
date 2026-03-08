import { api } from "./client";

export const ordersApi = {
    list: () => api.get("/api/orders").then((response) => response.data),
    pending: () => api.get("/api/orders/pending").then((response) => response.data),
    changeQty: (itemId, quantityChange) =>
        api.post(`/api/orders/pending/items/${itemId}`, { quantityChange }).then((response) => response.data),
    pay: () => api.post("/api/orders/pending/pay").then((response) => response.data)
};