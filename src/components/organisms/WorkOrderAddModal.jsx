import { X, AlertOctagon } from 'lucide-react';

const WorkOrderAddModal = ({ assets, newWO, setNewWO, onSave, onClose }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in-up">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Lapor Kerusakan Baru</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-rose-500 transition"><X size={20}/></button>
                </div>
                <form onSubmit={onSave} className="p-6 space-y-5">
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
    );
};

export default WorkOrderAddModal;