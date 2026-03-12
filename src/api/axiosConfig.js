import axios from 'axios';

const api = axios.create({
    // Pastikan portnya 8080 (Milik Java), bukan yang lain
    baseURL: 'http://localhost:8080/api', 
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;