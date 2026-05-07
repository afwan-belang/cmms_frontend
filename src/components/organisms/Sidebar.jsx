import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Box, Wrench, LogOut } from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Guest', role: 'Viewer' };

const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Hapus token juga!
        navigate('/login');
    };

    const menus = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/assets', label: 'Data Aset', icon: Box },
        { path: '/work-orders', label: 'Work Orders', icon: Wrench },
    ];

    return (
        <aside className="w-64 bg-[#1E293B] text-slate-300 flex flex-col shadow-xl transition-all duration-300 z-20 shrink-0">
            <div className="h-16 flex items-center px-6 border-b border-slate-700/50">
                <div className="bg-blue-600 p-1.5 rounded-lg mr-2.5 shadow-md shadow-blue-500/20">
                    <Wrench className="text-white" size={16} />
                </div>
                <div>
                    <h1 className="text-base font-bold text-white tracking-wide">CMMS PRO</h1>
                    <p className="text-[9px] text-blue-400 font-medium tracking-wider">ENTERPRISE</p>
                </div>
            </div>

            <nav className="flex-1 p-5 space-y-1.5 overflow-y-auto">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Main Menu</p>
                {menus.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button key={item.path} onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                                isActive 
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40 translate-x-1' 
                                : 'hover:bg-slate-800 hover:text-white hover:translate-x-1'
                            }`}>
                            <item.icon size={18} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} /> 
                            <span className="font-medium text-[13px]">{item.label}</span>
                        </button>
                    )
                })}
            </nav>

            <div className="p-5 border-t border-slate-700/50 bg-[#0F172A]">
                <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-sm shrink-0">
                        {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-[13px] font-semibold text-white truncate w-28">{user.fullName}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
                        </p>
                    </div>
                </div>
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-1.5 bg-slate-800 text-slate-400 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all text-[11px] font-bold tracking-wide">
                    <LogOut size={14} /> SIGN OUT
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;