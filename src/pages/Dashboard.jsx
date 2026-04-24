import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { Box, Wrench, CheckCircle, Activity } from 'lucide-react';
import StatCard from '../components/molecules/StatCard';

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
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Hero Banner (Dirampingkan) */}
            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white shadow-md">
                <div className="relative z-10">
                    <h2 className="text-xl font-bold mb-1.5">Industrial Monitoring Center</h2>
                    <p className="text-blue-100 max-w-lg text-[13px]">Pantau kinerja seluruh mesin pabrik secara real-time. Deteksi masalah lebih cepat, tingkatkan produktivitas.</p>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-12"></div>
                <div className="absolute right-10 bottom-0 h-48 w-48 bg-white/5 rounded-full blur-2xl"></div>
            </div>

            {/* Grid Stats (Gap diperkecil) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <StatCard title="Total Aset Terdaftar" value={stats.totalAssets} icon={Box} colorClass="bg-blue-600" trend="12" />
                <StatCard title="Mesin Beroperasi Normal" value={stats.runningAssets} icon={Activity} colorClass="bg-emerald-500" />
                <StatCard title="Tiket Perbaikan (Open)" value={stats.openTickets} icon={Wrench} colorClass="bg-rose-500" />
            </div>

            {/* Status Alert (Ukuran font dan padding dioptimalkan) */}
            <div className={`rounded-2xl border p-5 flex items-start gap-3.5 shadow-sm ${stats.openTickets > 0 ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'}`}>
                <div className={`p-2.5 rounded-full ${stats.openTickets > 0 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {stats.openTickets > 0 ? <Wrench size={20}/> : <CheckCircle size={20}/>}
                </div>
                <div>
                    <h4 className={`text-base font-bold mb-0.5 ${stats.openTickets > 0 ? 'text-rose-800' : 'text-emerald-800'}`}>
                        {stats.openTickets > 0 ? "Tindakan Diperlukan" : "Sistem Optimal"}
                    </h4>
                    <p className={`text-[13px] leading-relaxed ${stats.openTickets > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
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