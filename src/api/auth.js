import { api } from "./client";

export const authApi = {
    login: async (email, password) => {
        const response = await api.post("/auth/login", { email, password });
        return response.data;
    },

    signup: async (payload) => {
        const response = await api.post("/auth/signup", payload);
        return response.data;
    },
};