import axios from 'axios';

const API_URL = "http://localhost:8000/api";

export const login = async (username, password,) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password,
        });
        const { access_token, role } = response.data;

        // Simpan token dan role di localStorage
        localStorage.setItem("token", access_token);
        localStorage.setItem("role", role);

        return true;
    } catch (error) {
        console.error("Login failed:", error.response.data);
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};

export const getRole = () => {
    return localStorage.getItem("role");
};
