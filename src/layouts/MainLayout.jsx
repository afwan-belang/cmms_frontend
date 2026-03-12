import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Box, Wrench, LogOut, User, Menu } from 'lucide-react';

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Guest', role: 'Viewer' };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const menus = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/assets', label: 'Data Aset', icon: Box },
        { path: '/work-orders', label: 'Work Orders', icon: Wrench },
    ];

    return (
        <div className="flex h-screen bg-[#F8FAFC]"> {/* Background sangat muda */}
            
            {/* SIDEBAR: Dark Elegant Theme */}
            <aside className="w-72 bg-[#1E293B] text-slate-300 flex flex-col shadow-2xl transition-all duration-300">
                {/* Logo Area */}
                <div className="h-20 flex items-center px-8 border-b border-slate-700/50">
                    <div className="bg-blue-600 p-2 rounded-lg mr-3 shadow-lg shadow-blue-500/20">
                        <Wrench className="text-white" size={20} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-wide">CMMS PRO</h1>
                        <p className="text-[10px] text-blue-400 font-medium tracking-wider">ENTERPRISE v2.0</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Main Menu</p>
                    {menus.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button key={item.path} onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                                    isActive 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 translate-x-1' 
                                    : 'hover:bg-slate-800 hover:text-white hover:translate-x-1'
                                }`}>
                                <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} /> 
                                <span className="font-medium text-sm">{item.label}</span>
                            </button>
                        )
                    })}
                </nav>

                {/* User Profile (Bottom) */}
                <div className="p-6 border-t border-slate-700/50 bg-[#0F172A]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                            {user.fullName.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-white truncate w-32">{user.fullName}</p>
                            <p className="text-xs text-slate-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
                            </p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-slate-800 text-slate-400 py-2.5 rounded-lg hover:bg-red-600 hover:text-white transition-all text-xs font-bold tracking-wide">
                        <LogOut size={14} /> SIGN OUT
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header / Topbar */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 capitalize">
                            {location.pathname === '/' ? 'Dashboard Overview' : location.pathname.replace('/', '').replace('-', ' ')}
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full border border-green-200 flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            System Operational
                        </span>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-8 scroll-smooth">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;