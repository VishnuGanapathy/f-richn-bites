'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, EyeOff, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Super simple demo auth logic
        if (password === 'admin123') {
            setError('');
            router.push('/admin');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <main className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-6 relative overflow-hidden text-white font-sans selection:bg-[#c69f62] selection:text-white">

            {/* Dark Aesthetic Decorations */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#c69f62] rounded-full blur-[200px] opacity-10"></div>
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#8a4836] rounded-full blur-[200px] opacity-10"></div>

            <Link href="/" className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center transition-colors font-medium">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Store
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-[32px] shadow-2xl backdrop-blur-xl relative z-10"
            >
                <div className="flex flex-col items-center justify-center mb-10 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c69f62] to-[#8a4836] shadow-[0_0_30px_rgba(198,159,98,0.4)] flex items-center justify-center mb-6">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Portal</h1>
                    <p className="text-gray-400 text-sm font-medium">Sign in to manage inventory and orders.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Master Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password..."
                                className="w-full pl-5 pr-12 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-[#c69f62] focus:ring-1 focus:ring-[#c69f62]/50 transition-all font-medium text-white placeholder:text-gray-600 shadow-inner"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs font-bold mt-2 ml-1 flex items-center tracking-wide"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1.5" />{error}</motion.p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-white text-[#111111] rounded-xl font-bold tracking-wide hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all shadow-lg active:scale-[0.98] mt-4"
                    >
                        Access Control Panel
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <p className="text-xs text-gray-500 font-medium">Authorized personnel only.</p>
                    {/* Hint for demonstration purposes */}
                    <p className="text-[10px] text-gray-600 mt-2 font-mono">Hint: Use 'admin123'</p>
                </div>
            </motion.div>

        </main>
    );
}
