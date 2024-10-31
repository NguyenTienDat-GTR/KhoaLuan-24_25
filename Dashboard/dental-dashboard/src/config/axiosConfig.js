import dotenv from "dotenv";
import axios from "axios";
import { REACT_APP_IP_ADDRESS, REACT_APP_PORT } from "../env";

const BASE_URL = `http://${REACT_APP_IP_ADDRESS}:${REACT_APP_PORT}`;

const axiosInstance = axios.create({ baseURL: BASE_URL });

axios.interceptors.response.use(
    (response) => response,
    (error) =>
        Promise.reject((error.response && error.response) || "Something went wrong")
);

export default axiosInstance;