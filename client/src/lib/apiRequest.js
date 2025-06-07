import axios from "axios";

const apiRequest = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

apiRequest.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiRequest;