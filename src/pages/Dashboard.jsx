import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { Box, Wrench, CheckCircle, Activity, ArrowUpRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass, trend }) => (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 hover:-translate-y-1 transition-all duration-300 group">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
            </div>
            {trend && (
                <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    +{trend}% <ArrowUpRight size={12} className="ml-1"/>
                </span>
            )}
        </div>
        <div>
            <h3 className="text-4xl font-extrabold text-slate-800 mb-1">{value}</h3>
            <p className="text-slate-500 text-sm font-medium">{title}</p>
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({ totalAssets: 0, runningAssets: 0, openTickets: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/dashboard/stats');
                setStats(res.data);
            } catch (err) { console.error("Error fetching stats"); }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Hero Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-10 text-white shadow-xl shadow-blue-900/20">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">Industrial Monitoring Center</h2>
                    <p className="text-blue-100 max-w-xl text-lg">Pantau kinerja seluruh mesin pabrik secara real-time. Deteksi masalah lebih cepat, tingkatkan produktivitas.</p>
                </div>
                {/* Dekorasi Background */}
                <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-12"></div>
                <div className="absolute right-20 bottom-0 h-64 w-64 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard 
                    title="Total Aset Terdaftar" 
                    value={stats.totalAssets} 
                    icon={Box} 
                    colorClass="bg-blue-600" 
                    trend="12"
                />
                <StatCard 
                    title="Mesin Beroperasi Normal" 
                    value={stats.runningAssets} 
                    icon={Activity} 
                    colorClass="bg-emerald-500" 
                />
                <StatCard 
                    title="Tiket Perbaikan (Open)" 
                    value={stats.openTickets} 
                    icon={Wrench} 
                    colorClass="bg-rose-500" 
                />
            </div>

            {/* Status Alert */}
            <div className={`rounded-2xl border p-6 flex items-start gap-4 shadow-sm ${stats.openTickets > 0 ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'}`}>
                <div className={`p-3 rounded-full ${stats.openTickets > 0 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {stats.openTickets > 0 ? <Wrench size={24}/> : <CheckCircle size={24}/>}
                </div>
                <div>
                    <h4 className={`text-lg font-bold mb-1 ${stats.openTickets > 0 ? 'text-rose-800' : 'text-emerald-800'}`}>
                        {stats.openTickets > 0 ? "Tindakan Diperlukan" : "Sistem Optimal"}
                    </h4>
                    <p className={`text-sm ${stats.openTickets > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {stats.openTickets > 0 
                            ? `Terdapat ${stats.openTickets} mesin yang membutuhkan perbaikan segera. Mohon cek halaman Work Orders.` 
                            : "Seluruh mesin berjalan dengan baik. Tidak ada insiden yang dilaporkan."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;