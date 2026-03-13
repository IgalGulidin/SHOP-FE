import { api } from "./client";

export const favoritesApi = {
    list: async () => {
        const response = await api.get("/favorites");
        return response.data;
    },

    add: async (itemId) => {
        const response = await api.post(`/favorites/${itemId}`);
        return response.data;
    },

    remove: async (itemId) => {
        const response = await api.delete(`/favorites/${itemId}`);
        return response.data;
    },
}