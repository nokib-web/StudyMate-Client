import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://study-mate-server-kvw8.onrender.com', 
    headers: {
        'Content-Type': 'application/json',
    },  

});

const useAxios = () => {

    return axiosInstance;
}
export default useAxios;