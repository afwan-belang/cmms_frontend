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
            await new Promise(r => setTimeout(r, 600)); 
            const res = await api.post('/auth/login', form);
            
            // Cek apakah response memiliki token
            if (res.data && res.data.token) {
                // Simpan TOKEN dan USER secara terpisah di localStorage
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/');
            } else {
                setError('Username atau Password tidak valid.');
            }
        } catch (err) {
            setError('Gagal terhubung ke server atau akses ditolak.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Background disamakan dengan tema MainLayout agar transisi terasa mulus
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] font-inter selection:bg-blue-500 selection:text-white">
            
            {/* Card diperkecil menjadi max-w-sm (24rem/384px) agar proporsional */}
            <div className="w-full max-w-sm p-6">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600 shadow-sm mb-5">
                            <Factory className="text-white w-7 h-7" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">CMMS Enterprise</h1>
                        <p className="text-slate-500 mt-2 text-sm">Silakan masuk ke akun Anda.</p>
                    </div>

                    {/* Error Notification */}
                    {error && (
                        <div className="mb-6 p-3 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium text-center">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        
                        {/* Username Field */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <User className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Masukkan username" 
                                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    onChange={(e) => setForm({...form, username: e.target.value})}
                                    required 
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                                <input 
                                    type="password" 
                                    placeholder="Masukkan password" 
                                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    onChange={(e) => setForm({...form, password: e.target.value})}
                                    required 
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            disabled={isLoading}
                            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin h-4 w-4" />
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    Masuk Aplikasi
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-[11px] text-slate-400">
                            &copy; 2026 PT. Industrial Maintenance System.<br/>Ver 2.0.1 Stable
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;