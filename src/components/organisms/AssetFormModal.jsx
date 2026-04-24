import { X } from 'lucide-react';

const AssetFormModal = ({ formData, setFormData, onSave, onClose }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in-up">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Registrasi Aset Baru</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-rose-500 transition"><X size={20}/></button>
                </div>
                
                <form onSubmit={onSave} className="p-6 space-y-5">
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
                    <button type="submit" className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 mt-2">SIMPAN DATA</button>
                </form>
            </div>
        </div>
    );
};

export default AssetFormModal;