import axios from 'axios';

const api=axios.create({
    baseURL: "https://shopkart-85u1.onrender.com",
    withCredentials:true
});

export default api;