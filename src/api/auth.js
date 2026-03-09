import { api } from "./client";

export const authApi = {
    login: async (email, password) => {
        const response = await api.post("/api/auth/login", { email, password });
        return response.data;
    },

    signup: async (payload) => {
        const response = await api.post("/api/auth/signup", payload);
        return response.data;
    },
};