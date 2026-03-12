import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';
import Assets from './pages/Assets';
import Dashboard from './pages/Dashboard';    // <-- Import Dashboard
import WorkOrders from './pages/WorkOrders';  // <-- Import WorkOrders

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('user');
    return user ? children : <Navigate to="/login" />;
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
                    
                    {/* Rute baru Work Orders */}
                    <Route path="work-orders" element={<WorkOrders />} />
                    
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;