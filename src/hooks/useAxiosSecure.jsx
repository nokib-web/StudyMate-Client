import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL: 'https://study-mate-server-kvw8.onrender.com',

});


const useAxiosSecure = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        // Add a request interceptor
        const requestInterceptor = instance.interceptors.request.use((config) => {
            const token = user.accessToken;
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            console.log("User access token:", token);
            return config;
        });

        // Response interceptor
        const responseInterceptor = instance.interceptors.response.use(res => {
            return res;
        },
            err => {
                const status = err.status || err.response?.status;
                if (status === 401 || status === 403) {
                    // Handle unauthorized or forbidden responses
                    console.log("Unauthorized access - logging out user.");
                    // You can add logout logic here
                    logout().then(() => {
                        navigate("/login");
                    })
                }
            }

        )




        // Eject the interceptor when the component unmounts or user changes
        return () => {
            instance.interceptors.request.eject(requestInterceptor);
            instance.interceptors.response.eject(responseInterceptor);
        };

    }, [user, logout, navigate]);

    return instance;
}
export default useAxiosSecure;