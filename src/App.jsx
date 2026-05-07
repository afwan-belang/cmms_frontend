import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
// PATH IMPORT MAINLAYOUT BERUBAH KE FOLDER TEMPLATES
import MainLayout from './components/templates/MainLayout';
import Assets from './pages/Assets';
import Dashboard from './pages/Dashboard';
import WorkOrders from './pages/WorkOrders';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    // Harus ada TOKEN dan USER, baru boleh masuk
    return (token && user) ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                {/* Halaman yang butuh login */}
                <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                    
                    {/* Halaman Dashboard sebagai halaman utama (index) */}
                    <Route index element={<Dashboard />} />
                    
                    <Route path="assets" element={<Assets />} />
                    
                    <Route path="work-orders" element={<WorkOrders />} />
                    
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;