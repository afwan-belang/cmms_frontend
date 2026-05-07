import { Outlet } from 'react-router-dom';
import Sidebar from '../organisms/Sidebar';
import Header from '../organisms/Header';

const MainLayout = () => {
    return (
        <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <Header />
                <div className="flex-1 overflow-auto p-6 scroll-smooth">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;