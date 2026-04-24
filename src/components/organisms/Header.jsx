import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    const getPageTitle = () => {
        if (location.pathname === '/') return 'Dashboard Overview';
        return location.pathname.replace('/', '').replace('-', ' ');
    };

    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 z-10 sticky top-0 shrink-0">
            <div>
                <h2 className="text-lg font-bold text-slate-800 capitalize leading-tight">
                    {getPageTitle()}
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">Welcome back, here's what's happening today.</p>
            </div>
            <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-green-50 text-green-600 text-[11px] font-semibold rounded-full border border-green-200 flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                    System Operational
                </span>
            </div>
        </header>
    );
};

export default Header;