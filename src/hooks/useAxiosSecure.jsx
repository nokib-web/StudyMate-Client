import axios from "axios";
import useAuth from "./useAuth";

const instance = axios.create({
    baseURL: 'http://localhost:3000',
   
});


const useAxiosSecure = () => {
    const {user}= useAuth();

    instance.interceptors.request.use((config) => {

      console.log("Request sent with secure axios", config);
      config.headers.Authorization = `Bearer ${user?.accessToken}`;

      console.log("Updated config with Authorization header:", config);


        return config;
    });

    return instance;
}
export default useAxiosSecure;