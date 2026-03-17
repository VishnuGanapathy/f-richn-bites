'use client';

import {
    LayoutDashboard, ShoppingCart, Package,
    Warehouse, LogOut, Search, Bell, Settings,
    ChevronRight, ArrowUpRight, Menu, X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/admin' },
    { label: 'Orders', icon: ShoppingCart, path: '/admin/orders', badge: '12' },
    { label: 'Products', icon: Package, path: '/admin/products' },
    { label: 'Inventory', icon: Warehouse, path: '/admin/inventory', alert: true },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Close sidebar on route change
    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    // Lock body scroll on mobile sidebar
    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            document.body.style.overflow = sidebarOpen ? 'hidden' : '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [sidebarOpen]);

    const handleAdminSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        const q = searchQuery.toLowerCase();
        if (q.includes('order')) router.push('/admin/orders');
        else if (q.includes('product') || q.includes('catalog')) router.push('/admin/products');
        else if (q.includes('inventory') || q.includes('stock')) router.push('/admin/inventory');
        else if (q.includes('setting')) router.push('/admin/settings');
        else router.push('/admin');
        setSearchQuery('');
    };

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const SidebarContent = () => (
        <>
            <div className="h-20 sm:h-24 flex items-center px-6 sm:px-8 shrink-0">
                <Link href="/admin" className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#c69f62] to-[#8a4836] shadow-[0_0_15px_rgba(198,159,98,0.4)] flex items-center justify-center">
                        <span className="text-white text-xs sm:text-sm font-serif italic font-bold">RB</span>
                    </div>
                    <span>Rich'n<span className="text-[#c69f62] font-serif italic">Bites</span></span>
                </Link>
            </div>

            <div className="px-4 sm:px-6 mb-6">
                <p className="text-[#888888] text-xs font-semibold uppercase tracking-widest mb-4 ml-2">Main Menu</p>
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        const Icon = item.icon;
                        return (
                            <Link key={item.path} href={item.path} className="relative block">
                                <div className={`flex items-center justify-between px-4 py-3 sm:py-3.5 rounded-xl transition-all duration-300 font-medium ${isActive
                                    ? 'bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                                    : 'text-[#999999] hover:bg-white/5 hover:text-white'
                                    }`}>
                                    <div className="flex items-center space-x-3">
                                        <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#c69f62]' : 'text-[#666666]'}`} />
                                        <span className="text-sm tracking-wide">{item.label}</span>
                                    </div>
                                    {item.badge && (
                                        <span className="bg-[#c69f62] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(198,159,98,0.3)]">
                                            {item.badge}
                                        </span>
                                    )}
                                    {item.alert && !item.badge && (
                                        <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                                    )}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-nav-indicator"
                                            className="absolute left-0 w-1 h-8 bg-[#c69f62] rounded-r-full shadow-[0_0_10px_rgba(198,159,98,0.8)]"
                                        />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto px-4 sm:px-6 pb-6 sm:pb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 mb-6 relative overflow-hidden backdrop-blur-md">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#c69f62] rounded-full blur-[40px] opacity-20" />
                    <h4 className="text-white text-sm font-bold mb-1">Store Performance</h4>
                    <p className="text-[#888888] text-xs mb-3">Revenue is up 12% this week</p>
                    <Link href="/admin" className="text-[#c69f62] text-xs font-semibold flex items-center hover:text-white transition-colors">
                        View Report <ArrowUpRight className="w-3 h-3 ml-1" />
                    </Link>
                </div>

                <button onClick={() => window.location.href = "/admin/login"} className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-[#999999] hover:bg-red-500/10 hover:text-red-500 transition-colors font-medium group mt-1">
                    <LogOut className="w-5 h-5 text-[#666666] group-hover:text-red-500 transition-colors" />
                    <span className="text-sm tracking-wide">Logout</span>
                </button>
            </div>
        </>
    );

    return (
        <div className="flex h-screen bg-[#f5f5f7] overflow-hidden font-sans selection:bg-[#c69f62] selection:text-white">

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-[280px] bg-[#1a1a1a] flex-col shrink-0 relative z-20 shadow-2xl">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[80] md:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#1a1a1a] z-[90] md:hidden flex flex-col shadow-2xl"
                        >
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="absolute top-5 right-4 text-white/60 hover:text-white p-1 z-50"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f5f5f7]">

                {/* Top Header */}
                <header className="h-16 sm:h-24 bg-[#f5f5f7]/80 backdrop-blur-xl flex items-center justify-between px-4 sm:px-10 shrink-0 sticky top-0 z-10 border-b border-gray-200/50">
                    <div className="flex items-center gap-3">
                        {/* Mobile hamburger */}
                        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600 hover:text-[#111111] p-1">
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-[#111111]">
                                {navItems.find(i => i.path === pathname)?.label || 'Overview'}
                            </h1>
                            <div className="hidden sm:flex items-center text-xs text-gray-500 mt-1 font-medium tracking-wide">
                                <span>Admin</span>
                                <ChevronRight className="w-3 h-3 mx-1 opacity-50" />
                                <span className="text-[#111111]">{navItems.find(i => i.path === pathname)?.label || 'Overview'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 sm:space-x-5">
                        <form onSubmit={handleAdminSearch} className="relative group hidden sm:block">
                            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#c69f62] transition-colors" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search anything..."
                                className="pl-11 pr-4 py-2.5 border border-gray-200/80 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-2 focus:ring-[#c69f62]/20 focus:border-[#c69f62]/50 w-48 lg:w-72 text-sm font-medium text-gray-700 transition-all placeholder:text-gray-400"
                            />
                        </form>

                        <button className="relative text-gray-400 hover:text-[#111111] transition-colors p-2 rounded-full hover:bg-gray-100">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#f5f5f7]" />
                        </button>

                        <div className="flex items-center gap-2 sm:gap-3 pl-2 cursor-pointer group">
                            <div className="text-right hidden lg:block">
                                <p className="text-sm font-semibold text-[#111111] leading-tight">Admin User</p>
                                <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">Superadmin</p>
                            </div>
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#c69f62] to-[#8a4836] shadow-md overflow-hidden flex items-center justify-center text-white ring-2 ring-white group-hover:ring-[#c69f62]/30 transition-all">
                                <span className="font-bold text-xs sm:text-sm">AU</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 relative">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
