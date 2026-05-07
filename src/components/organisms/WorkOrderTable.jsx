import { Search, Filter, CheckCircle, PenTool } from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../atoms/Badge';

const WorkOrderTable = ({ 
    workOrders, 
    searchTerm, setSearchTerm, 
    filterStatus, setFilterStatus, 
    filterPriority, setFilterPriority,
    onCompleteClick,
    onTakeClick,
    user // <-- Menerima data user yang sedang login
}) => {
    const isAdmin = user.role === 'ADMIN';

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Table Header Filter */}
            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 bg-slate-50/50">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18}/>
                    <input 
                        type="text" 
                        placeholder="Cari tiket atau mesin..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-600">
                        <Filter size={14} className="text-slate-400"/>
                        <select 
                            value={filterStatus} 
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="bg-transparent focus:outline-none cursor-pointer font-medium"
                        >
                            <option value="ALL">Semua Status</option>
                            <option value="OPEN">Open (Aktif)</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                        <th className="p-4">Mesin / Aset</th>
                        <th className="p-4">Masalah</th>
                        <th className="p-4">Prioritas</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Teknisi / Solusi</th>
                        <th className="p-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {workOrders.map((wo) => (
                        <tr key={wo.id} className="hover:bg-blue-50/30 transition-colors group">
                            <td className="p-4">
                                <div className="font-bold text-slate-700 text-[13px]">{wo.assetName}</div>
                                <div className="text-[11px] text-slate-400 mt-0.5">ID: #{wo.id}</div>
                            </td>
                            <td className="p-4 max-w-xs">
                                <p className="text-slate-600 truncate text-[13px]">{wo.issue}</p>
                            </td>
                            <td className="p-4">
                                <PriorityBadge priority={wo.priority} />
                            </td>
                            <td className="p-4">
                                <StatusBadge status={wo.status} />
                            </td>
                            <td className="p-4">
                                {/* Tampilan Kolom Teknisi/Solusi berdasarkan Status */}
                                {wo.status === 'COMPLETED' ? (
                                    <div className="text-emerald-700 bg-emerald-50/50 p-2 rounded-lg text-[11px] border border-emerald-100">
                                        <span className="font-bold block mb-0.5">✅ Oleh: {wo.technicianName}</span>
                                        {wo.actionTaken}
                                    </div>
                                ) : wo.status === 'IN_PROGRESS' ? (
                                    <span className="text-blue-600 font-medium text-[12px]">🛠️ Dikerjakan: {wo.technicianName}</span>
                                ) : (
                                    <span className="text-slate-400 italic text-[12px]">Menunggu diambil...</span>
                                )}
                            </td>
                            <td className="p-4 text-right">
                                {/* AKSI 1: Teknisi Mengambil Tugas (Hanya muncul jika OPEN dan BUKAN Admin) */}
                                {wo.status === 'OPEN' && !isAdmin && (
                                    <button 
                                        onClick={() => onTakeClick(wo.id)}
                                        className="text-blue-600 bg-white border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm flex items-center gap-1.5 ml-auto">
                                        <PenTool size={14} /> Ambil Tugas
                                    </button>
                                )}

                                {/* AKSI 2: Teknisi Menyelesaikan Tugas (Hanya muncul jika IN_PROGRESS) */}
                                {/* Catatan: Di dunia nyata, kita juga mengecek apakah wo.technicianName == user.fullName agar teknisi lain tidak bisa menyelesaikan tugas temannya */}
                                {wo.status === 'IN_PROGRESS' && !isAdmin && (
                                    <button 
                                        onClick={() => onCompleteClick(wo.id)}
                                        className="text-emerald-600 bg-white border border-emerald-200 hover:bg-emerald-50 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm flex items-center gap-1.5 ml-auto">
                                        <CheckCircle size={14} /> Selesaikan
                                    </button>
                                )}
                                
                                {/* Jika Admin, beri tahu statusnya saja tanpa aksi, atau biarkan kosong */}
                                {isAdmin && wo.status !== 'COMPLETED' && (
                                    <span className="text-slate-400 text-[11px] italic">Monitoring</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {workOrders.length === 0 && (
                <div className="flex flex-col items-center justify-center p-10 text-slate-400">
                    <div className="bg-slate-50 p-3 rounded-full mb-2"><Search size={24} className="text-slate-300"/></div>
                    <p className="text-[13px]">Tidak ada laporan yang sesuai.</p>
                </div>
            )}
        </div>
    );
};

export default WorkOrderTable;