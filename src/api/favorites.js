import { api } from "./client";

export const favoritesApi = {
    list: async () => {
        const response = await api.get("/api/favorites");
        return response.data;
    },

    add: async (itemId) => {
        const response = await api.post(`/api/favorites/${itemId}`);
        return response.data;
    },

    remove: async (itemId) => {
        const response = await api.delete(`/apu/favorites/${itemId}`);
        return response.data;
    },
}