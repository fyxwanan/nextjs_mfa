import axios from "axios";
import { getLocalStorage, setLocalStorage } from "@/app/lib/storage/localStorage";

const useAxios = () => {
    const refreshToken = getLocalStorage("refresh_token");
    const axiosInstance = axios.create({
        baseURL: "http://localhost:3000",
        headers: {
            "Content-Type": "application/json",
        },
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const response = await axios.post("http://localhost:3000/api/auth/refresh", {
                    refreshToken,
                });
                const { accessToken } = response.data;
                setLocalStorage("access_token", accessToken);
                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            }
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.request.use(
        (config) => {
            const accessToken = getLocalStorage("access_token");
            config.headers["Authorization"] = `Bearer ${accessToken}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosInstance;
}

export default useAxios;