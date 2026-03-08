import { api } from "./client";

export const favoritesApi = {
    list: () => api.get("/api/favorites").then((response) => response.data),
    add: (itemId) => api.post(`/api/favorites/${itemId}`),
    remove: (itemId) => api.delete(`/api/favorites/${itemId}`),
};