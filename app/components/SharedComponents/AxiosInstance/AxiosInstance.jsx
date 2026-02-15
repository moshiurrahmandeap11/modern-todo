// services/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://todo-server-xvp6.onrender.com/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});



export default axiosInstance;