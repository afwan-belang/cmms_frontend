import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cmmsapp-production.up.railway.app/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

// --- REQUEST INTERCEPTOR ---
// Berjalan otomatis SEBELUM request dikirim ke backend
api.interceptors.request.use(
    (config) => {
        // Ambil token dari localStorage
        const token = localStorage.getItem('token');
        if (token) {
            // Jika token ada, selipkan ke header Authorization
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- RESPONSE INTERCEPTOR ---
// Berjalan otomatis SETELAH menerima response dari backend
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Jika backend menolak (Status 401 Unauthorized / Token Expired)
        if (error.response && error.response.status === 401) {
            alert('Sesi Anda telah habis atau tidak valid. Silakan login kembali.');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login'; // Paksa user kembali ke halaman login
        }
        return Promise.reject(error);
    }
);

export default api;