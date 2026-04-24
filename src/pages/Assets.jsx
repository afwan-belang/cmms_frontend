import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { Plus } from 'lucide-react';
import AssetTable from '../components/organisms/AssetTable';
import AssetFormModal from '../components/organisms/AssetFormModal';

const Assets = () => {
    const [assets, setAssets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    // Tarik data user dan cek role-nya
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const isAdmin = user.role === 'ADMIN';
    
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
        } catch (err) { console.error("Gagal ambil data aset"); }
    };

    useEffect(() => { loadData(); }, []);

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Yakin ingin menghapus mesin "${name}" secara permanen?`)) return;
        try {
            await api.delete(`/assets/${id}`);
            loadData();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data);
            } else if (error.response && error.response.status === 403) {
                alert("Akses Ditolak: Hanya Admin yang bisa menghapus data.");
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
        } catch (error) { 
            if (error.response && error.response.status === 403) {
                alert("Akses Ditolak: Hanya Admin yang bisa menambah data.");
            } else {
                alert("Gagal menyimpan data!"); 
            }
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Manajemen Aset</h2>
                    <p className="text-slate-500 text-[13px]">Daftar seluruh mesin dan peralatan pabrik.</p>
                </div>
                
                {/* Render Tombol Tambah HANYA jika ADMIN */}
                {isAdmin && (
                    <button 
                        onClick={() => setShowModal(true)} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-[13px] font-medium flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all active:scale-95">
                        <Plus size={16} /> Tambah Mesin Baru
                    </button>
                )}
            </div>

            {/* Parsing isAdmin ke Table */}
            <AssetTable assets={assets} onDelete={handleDelete} isAdmin={isAdmin} />

            {showModal && isAdmin && (
                <AssetFormModal 
                    formData={formData} 
                    setFormData={setFormData} 
                    onSave={handleSave} 
                    onClose={() => setShowModal(false)} 
                />
            )}
        </div>
    );
};

export default Assets;