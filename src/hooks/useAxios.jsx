import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },

});

const useAxios = () => {

    return axiosInstance;
}
export default useAxios;