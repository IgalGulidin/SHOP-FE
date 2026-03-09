import { api } from "./client";

export const itemsApi = {
    getAll: () => api.get("/api/items").then((response) => response.data),
    search: (searchQuery) => api.get("/api/items/search", { params: { query: searchQuery } }).then((response) => response.data),
};