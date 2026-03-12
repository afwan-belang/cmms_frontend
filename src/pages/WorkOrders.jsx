import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { Plus, CheckCircle, AlertOctagon, X, Search, Filter } from 'lucide-react';

const WorkOrders = () => {
    const [workOrders, setWorkOrders] = useState([]);
    const [assets, setAssets] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showCloseModal, setShowCloseModal] = useState(false);
    const [newWO, setNewWO] = useState({ assetId: '', issue: '', priority: 'MEDIUM' });
    const [closeWO, setCloseWO] = useState({ id: null, action: '' });

    const loadData = async () => {
        try {
            const resWO = await api.get('/work-orders');
            const resAssets = await api.get('/assets');
            setWorkOrders(resWO.data);
            setAssets(resAssets.data);
        } catch (err) { console.error("Connection Error"); }
    };

    useEffect(() => { loadData(); }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        await api.post('/work-orders', newWO);
        setShowAddModal(false); setNewWO({ assetId: '', issue: '', priority: 'MEDIUM' }); loadData();
    };

    const handleComplete = async (e) => {
        e.preventDefault();
        await api.put(`/work-orders/${closeWO.id}/complete`, { action: closeWO.action });
        setShowCloseModal(false); setCloseWO({ id: null, action: '' }); loadData();
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header Action */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Tiket Perbaikan</h2>
                    <p className="text-slate-500 text-sm">Kelola laporan kerusakan dan penugasan teknisi.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all active:scale-95">
                        <Plus size={18} /> Buat Laporan Baru
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Table Header Filter (Opsional Visual) */}
                <div className="p-4 border-b border-slate-100 flex gap-4 bg-slate-50/50">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18}/>
                        <input type="text" placeholder="Cari tiket atau mesin..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"/>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                        <Filter size={16}/> Filter
                    </button>
                </div>

                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                            <th className="p-5">Mesin / Aset</th>
                            <th className="p-5">Masalah</th>
                            <th className="p-5">Prioritas</th>
                            <th className="p-5">Status</th>
                            <th className="p-5">Teknisi / Solusi</th>
                            <th className="p-5 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {workOrders.map((wo) => (
                            <tr key={wo.id} className="hover:bg-blue-50/30 transition-colors group">
                                <td className="p-5">
                                    <div className="font-bold text-slate-700">{wo.assetName}</div>
                                    <div className="text-xs text-slate-400 mt-1">ID: #{wo.id}</div>
                                </td>
                                <td className="p-5 max-w-xs">
                                    <p className="text-slate-600 truncate">{wo.issue}</p>
                                </td>
                                <td className="p-5">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                        wo.priority === 'HIGH' 
                                        ? 'bg-rose-50 text-rose-600 border-rose-100' 
                                        : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                    }`}>
                                        {wo.priority}
                                    </span>
                                </td>
                                <td className="p-5">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                                        wo.status === 'OPEN' 
                                        ? 'bg-amber-50 text-amber-600 border-amber-100' 
                                        : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${wo.status === 'OPEN' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                                        {wo.status}
                                    </span>
                                </td>
                                <td className="p-5">
                                    {wo.status === 'COMPLETED' ? (
                                        <div className="text-emerald-700 bg-emerald-50/50 p-2 rounded-lg text-xs border border-emerald-100">
                                            <span className="font-bold block mb-1">✅ Selesai:</span>
                                            {wo.actionTaken}
                                        </div>
                                    ) : (
                                        <span className="text-slate-400 italic text-xs">Menunggu penanganan...</span>
                                    )}
                                </td>
                                <td className="p-5 text-right">
                                    {wo.status === 'OPEN' && (
                                        <button 
                                            onClick={() => { setCloseWO({ ...closeWO, id: wo.id }); setShowCloseModal(true); }}
                                            className="text-emerald-600 bg-white border border-emerald-200 hover:bg-emerald-50 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2 ml-auto">
                                            <CheckCircle size={14} /> Selesaikan
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {workOrders.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                        <div className="bg-slate-50 p-4 rounded-full mb-3"><CheckCircle size={32} className="text-slate-300"/></div>
                        <p>Tidak ada laporan aktif saat ini.</p>
                    </div>
                )}
            </div>

            {/* MODAL 1: TAMBAH (Glassmorphism Effect) */}
            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in-up">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-800">Lapor Kerusakan Baru</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-rose-500 transition"><X size={20}/></button>
                        </div>
                        <form onSubmit={handleCreate} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Pilih Mesin Bermasalah</label>
                                <select className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" required 
                                    onChange={(e) => setNewWO({...newWO, assetId: e.target.value})}>
                                    <option value="">-- Pilih Aset --</option>
                                    {assets.map(a => <option key={a.id} value={a.id}>{a.name} — {a.location}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Masalah</label>
                                <textarea className="w-full border border-slate-300 bg-slate-50 p-3 rounded-xl h-28 focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Jelaskan detail kerusakan..." required
                                    onChange={(e) => setNewWO({...newWO, issue: e.target.value})}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Tingkat Prioritas</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className={`cursor-pointer border p-3 rounded-xl flex items-center justify-center gap-2 transition ${newWO.priority === 'MEDIUM' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-slate-200'}`}>
                                        <input type="radio" name="priority" value="MEDIUM" className="hidden" onChange={(e) => setNewWO({...newWO, priority: e.target.value})} />
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div> MEDIUM
                                    </label>
                                    <label className={`cursor-pointer border p-3 rounded-xl flex items-center justify-center gap-2 transition ${newWO.priority === 'HIGH' ? 'bg-rose-50 border-rose-500 text-rose-700' : 'border-slate-200'}`}>
                                        <input type="radio" name="priority" value="HIGH" className="hidden" onChange={(e) => setNewWO({...newWO, priority: e.target.value})} />
                                        <AlertOctagon size={16}/> HIGH (Urgent)
                                    </label>
                                </div>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 mt-2">
                                KIRIM LAPORAN
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 2: SELESAIKAN (Clean Design) */}
            {showCloseModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-8 text-center animate-fade-in-up">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Selesaikan Perbaikan?</h3>
                        <p className="text-slate-500 mb-6">Pastikan mesin sudah berjalan normal sebelum menutup tiket ini.</p>
                        
                        <form onSubmit={handleComplete} className="text-left space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Laporan Tindakan Perbaikan</label>
                                <textarea className="w-full border border-slate-300 p-3 rounded-xl h-24 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Contoh: Mengganti sparepart, membersihkan filter..." required
                                    onChange={(e) => setCloseWO({...closeWO, action: e.target.value})}></textarea>
                            </div>
                            <div className="flex gap-3 mt-4">
                                <button type="button" onClick={() => setShowCloseModal(false)} className="flex-1 bg-white border border-slate-300 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 transition">Batal</button>
                                <button type="submit" className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-500/30 transition">Konfirmasi Selesai</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkOrders;