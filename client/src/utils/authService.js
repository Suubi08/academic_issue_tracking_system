import axios from "axios";

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) return null;

    try {
        const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh: refreshToken });
        localStorage.setItem("accessToken", response.data.access);
        return response.data.access;
    } catch (error) {
        console.error("Failed to refresh token", error);
        return null;
    }
};