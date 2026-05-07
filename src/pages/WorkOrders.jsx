import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { Plus } from 'lucide-react';

import WorkOrderTable from '../components/organisms/WorkOrderTable';
import WorkOrderAddModal from '../components/organisms/WorkOrderAddModal';
import WorkOrderCompleteModal from '../components/organisms/WorkOrderCompleteModal';

const WorkOrders = () => {
    const [workOrders, setWorkOrders] = useState([]);
    const [assets, setAssets] = useState([]);
    
    // Ambil data user dari Local Storage
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const isAdmin = user.role === 'ADMIN';
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [showCloseModal, setShowCloseModal] = useState(false);
    
    const [newWO, setNewWO] = useState({ assetId: '', issue: '', priority: 'MEDIUM' });
    const [closeWO, setCloseWO] = useState({ id: null, action: '' });

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [filterPriority, setFilterPriority] = useState('ALL');

    const loadData = async () => {
        try {
            const resWO = await api.get('/work-orders');
            const resAssets = await api.get('/assets');
            setWorkOrders(resWO.data);
            setAssets(resAssets.data);
        } catch (err) { console.error("Connection Error"); }
    };

    useEffect(() => { loadData(); }, []);

    // FUNGSI BARU: Teknisi Mengambil Tugas
    const handleTake = async (id) => {
        if (!window.confirm("Ambil dan kerjakan tugas ini sekarang?")) return;
        try {
            // Mengirim ID Teknisi ke Backend
            await api.put(`/work-orders/${id}/take`, { technicianId: user.id });
            loadData();
        } catch (err) {
            alert("Gagal mengambil tugas. Silakan coba lagi.");
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/work-orders', newWO);
            setShowAddModal(false); 
            setNewWO({ assetId: '', issue: '', priority: 'MEDIUM' }); 
            loadData();
        } catch (err) { alert("Gagal membuat laporan."); }
    };

    const handleComplete = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/work-orders/${closeWO.id}/complete`, { action: closeWO.action });
            setShowCloseModal(false); 
            setCloseWO({ id: null, action: '' }); 
            loadData();
        } catch (err) { alert("Gagal menyelesaikan tugas."); }
    };

    const filteredWorkOrders = workOrders.filter((wo) => {
        const matchSearch = 
            wo.assetName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            wo.issue?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = filterStatus === 'ALL' || wo.status === filterStatus;
        const matchPriority = filterPriority === 'ALL' || wo.priority === filterPriority;
        return matchSearch && matchStatus && matchPriority;
    });

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Tiket Perbaikan</h2>
                    <p className="text-slate-500 text-[13px]">Kelola laporan kerusakan dan penugasan teknisi.</p>
                </div>
                
                {/* Hanya Admin yang bisa buat laporan kerusakan */}
                {isAdmin && (
                    <div className="flex gap-3">
                        <button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-[13px] font-medium flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all active:scale-95">
                            <Plus size={16} /> Buat Laporan Baru
                        </button>
                    </div>
                )}
            </div>

            <WorkOrderTable 
                workOrders={filteredWorkOrders}
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                filterStatus={filterStatus} setFilterStatus={setFilterStatus}
                filterPriority={filterPriority} setFilterPriority={setFilterPriority}
                user={user} // Kirim data user ke tabel
                onTakeClick={handleTake} // Kirim fungsi ambil tugas
                onCompleteClick={(id) => { setCloseWO({ ...closeWO, id }); setShowCloseModal(true); }}
            />

            {showAddModal && isAdmin && (
                <WorkOrderAddModal 
                    assets={assets}
                    newWO={newWO} setNewWO={setNewWO}
                    onSave={handleCreate}
                    onClose={() => setShowAddModal(false)}
                />
            )}

            {showCloseModal && !isAdmin && (
                <WorkOrderCompleteModal 
                    closeWO={closeWO} setCloseWO={setCloseWO}
                    onComplete={handleComplete}
                    onClose={() => setShowCloseModal(false)}
                />
            )}
        </div>
    );
};

export default WorkOrders;