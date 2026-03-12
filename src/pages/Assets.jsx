import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { Plus, Search, Filter, Box, Trash2, X } from 'lucide-react'; // Tambah Trash2

const Assets = () => {
    const [assets, setAssets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    // State Form
    const [formData, setFormData] = useState({
        name: '',
        serialNumber: '',
        location: '',
        status: 'RUNNING'
    });

    const loadData = async () => {
        try {
            const res = await api.get('/assets');
            setAssets(res.data);
        } catch (err) {
            console.error("Gagal ambil data aset");
        }
    };

    useEffect(() => { loadData(); }, []);

    // --- FUNGSI HAPUS (BARU) ---
    const handleDelete = async (id, name) => {
        // 1. Konfirmasi User (Biar gak kepencet)
        if (!window.confirm(`Yakin ingin menghapus mesin "${name}" secara permanen?`)) return;

        try {
            // 2. Panggil API Delete
            await api.delete(`/assets/${id}`);
            
            // 3. Jika sukses, refresh tabel
            alert("Data berhasil dihapus!");
            loadData();
        } catch (error) {
            // 4. Tangkap Error dari Backend (Misal: Ada riwayat servis)
            if (error.response && error.response.status === 400) {
                alert(error.response.data); // Tampilkan pesan: "GAGAL: Mesin punya riwayat..."
            } else {
                alert("Terjadi kesalahan saat menghapus.");
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await api.post('/assets', formData);
            setShowModal(false);
            setFormData({ name: '', serialNumber: '', location: '', status: 'RUNNING' });
            loadData();
        } catch (err) { alert("Gagal menyimpan data!"); }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Manajemen Aset</h2>
                    <p className="text-slate-500 text-sm">Daftar seluruh mesin dan peralatan pabrik.</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all active:scale-95">
                    <Plus size={18} /> Tambah Mesin Baru
                </button>
            </div>

            {/* Tabel Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                            <th className="p-5">Nama Aset</th>
                            <th className="p-5">Serial Number</th>
                            <th className="p-5">Lokasi</th>
                            <th className="p-5">Status</th>
                            <th className="p-5 text-right">Aksi</th> {/* Kolom Aksi Baru */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {assets.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="p-5 font-bold text-slate-700 flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-slate-100 text-slate-500"><Box size={18}/></div>
                                    {item.name}
                                </td>
                                <td className="p-5 text-slate-500 font-mono">{item.serialNumber}</td>
                                <td className="p-5 text-slate-600">{item.location}</td>
                                <td className="p-5">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                                        item.status === 'RUNNING' 
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                        : item.status === 'DOWN' 
                                        ? 'bg-rose-50 text-rose-600 border-rose-100' 
                                        : 'bg-amber-50 text-amber-600 border-amber-100'
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                            item.status === 'RUNNING' ? 'bg-emerald-500' : item.status === 'DOWN' ? 'bg-rose-500' : 'bg-amber-500'
                                        }`}></span>
                                        {item.status}
                                    </span>
                                </td>
                                {/* TOMBOL HAPUS */}
                                <td className="p-5 text-right">
                                    <button 
                                        onClick={() => handleDelete(item.id, item.name)}
                                        className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-all"
                                        title="Hapus Mesin">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {assets.length === 0 && (
                    <div className="p-10 text-center text-slate-400">Belum ada data aset.</div>
                )}
            </div>

            {/* MODAL TAMBAH ASET (Tetap Sama) */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in-up">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-800">Registrasi Aset Baru</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-rose-500 transition"><X size={20}/></button>
                        </div>
                        
                        <form onSubmit={handleSave} className="p-6 space-y-5">
                            {/* ... (Isi form sama seperti sebelumnya) ... */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Mesin</label>
                                <input className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Contoh: CNC Milling 01" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Serial Number</label>
                                <input className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="SN-2024-XXX" onChange={(e) => setFormData({...formData, serialNumber: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Lokasi Penempatan</label>
                                <input className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Contoh: Lantai 2 - Zona A" onChange={(e) => setFormData({...formData, location: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Status Awal</label>
                                <select className="w-full border border-slate-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white" onChange={(e) => setFormData({...formData, status: e.target.value})}>
                                    <option value="RUNNING">RUNNING (Siap Pakai)</option>
                                    <option value="MAINTENANCE">MAINTENANCE (Perawatan)</option>
                                    <option value="DOWN">DOWN (Rusak)</option>
                                </select>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 mt-2">SIMPAN DATA</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Assets;