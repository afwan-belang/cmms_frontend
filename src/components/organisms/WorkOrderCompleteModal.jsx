import { CheckCircle } from 'lucide-react';

const WorkOrderCompleteModal = ({ closeWO, setCloseWO, onComplete, onClose }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-8 text-center animate-fade-in-up">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Selesaikan Perbaikan?</h3>
                <p className="text-slate-500 mb-6">Pastikan mesin sudah berjalan normal sebelum menutup tiket ini.</p>
                
                <form onSubmit={onComplete} className="text-left space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Laporan Tindakan Perbaikan</label>
                        <textarea className="w-full border border-slate-300 p-3 rounded-xl h-24 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Contoh: Mengganti sparepart, membersihkan filter..." required
                            onChange={(e) => setCloseWO({...closeWO, action: e.target.value})}></textarea>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button type="button" onClick={onClose} className="flex-1 bg-white border border-slate-300 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 transition">Batal</button>
                        <button type="submit" className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-500/30 transition">Konfirmasi Selesai</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WorkOrderCompleteModal;