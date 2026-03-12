import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Factory, User, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            // Simulasi delay sedikit biar animasinya kerasa (opsional)
            await new Promise(r => setTimeout(r, 800));
            
            const res = await api.post('/auth/login', form);
            if (res.data) {
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate('/');
            } else {
                setError('Username atau Password tidak ditemukan.');
            }
        } catch (err) {
            setError('Gagal terhubung ke server. Cek koneksi internet/backend.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0F172A] overflow-hidden font-inter selection:bg-blue-500 selection:text-white">
            
            {/* --- BACKGROUND EFFECTS (Glow) --- */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]"></div>
            
            {/* --- MAIN CARD --- */}
            <div className="relative z-10 w-full max-w-md p-6">
                <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in-up">
                    
                    {/* Header: Logo & Title */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 mb-6">
                            <Factory className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">CMMS Enterprise</h1>
                        <p className="text-slate-400 mt-2 text-sm">Masuk untuk mengelola aset & perbaikan.</p>
                    </div>

                    {/* Error Notification */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium text-center animate-pulse">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        
                        {/* Username Field */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-300 ml-1 uppercase tracking-wider">Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Masukkan username" 
                                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                    onChange={(e) => setForm({...form, username: e.target.value})}
                                    required 
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-300 ml-1 uppercase tracking-wider">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                </div>
                                <input 
                                    type="password" 
                                    placeholder="Masukkan password" 
                                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                    onChange={(e) => setForm({...form, password: e.target.value})}
                                    required 
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            disabled={isLoading}
                            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5" />
                                    Sedang Memproses...
                                </>
                            ) : (
                                <>
                                    MASUK APLIKASI
                                    <ArrowRight className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-500">
                            &copy; 2026 PT. Industrial Maintenance System. <br/>Ver 2.0.1 Stable
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;