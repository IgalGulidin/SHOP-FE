import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { setAuthToken } from "../api/client";

export default function AuthProvider({ children }) { 
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    useEffect(() => {
        setAuthToken(token);

        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    const logout = () => setToken(null);

    return (
        <AuthContext.Provider value={{ token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}