import { api } from "./client";

export const itemsApi = {
    getAll: () => api.get("/items").then((response) => response.data),
    search: (searchQuery) => api.get("/items/search", { params: { query: searchQuery } }).then((response) => response.data),
};