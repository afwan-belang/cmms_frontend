import { Box, Trash2 } from 'lucide-react';
import { StatusBadge } from '../atoms/Badge';

// Menerima props isAdmin
const AssetTable = ({ assets, onDelete, isAdmin }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                        <th className="p-5">Nama Aset</th>
                        <th className="p-5">Serial Number</th>
                        <th className="p-5">Lokasi</th>
                        <th className="p-5">Status</th>
                        {/* Render Header Aksi HANYA jika ADMIN */}
                        {isAdmin && <th className="p-5 text-right">Aksi</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {assets.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="p-5 font-bold text-slate-700 flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-slate-100 text-slate-500"><Box size={18}/></div>
                                {item.name}
                            </td>
                            <td className="p-5 text-slate-500 font-mono text-[13px]">{item.serialNumber}</td>
                            <td className="p-5 text-slate-600 text-[13px]">{item.location}</td>
                            <td className="p-5">
                                <StatusBadge status={item.status} />
                            </td>
                            
                            {/* Render Tombol Hapus HANYA jika ADMIN */}
                            {isAdmin && (
                                <td className="p-5 text-right">
                                    <button 
                                        onClick={() => onDelete(item.id, item.name)}
                                        className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-all"
                                        title="Hapus Mesin">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {assets.length === 0 && (
                <div className="p-10 text-center text-slate-400 text-[13px]">Belum ada data aset.</div>
            )}
        </div>
    );
};

export default AssetTable;