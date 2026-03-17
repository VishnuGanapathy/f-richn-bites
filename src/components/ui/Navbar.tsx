'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Instagram, User, X, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toggleCart } from '@/features/cartSlice';

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
);

const DummyLogoIcon = () => (
    <div className="w-8 h-8 rounded-full bg-[#3d241c] flex items-center justify-center mr-2 shadow-[0_0_10px_rgba(198,159,98,0.5)]">
        <div className="w-4 h-4 bg-[#c69f62] rotate-45 rounded-[2px]" />
    </div>
);

const NAV_LINKS = [
    { href: '/shop', label: 'Shop' },
    { href: '/product', label: 'Customization' },
    { href: '/hampers', label: 'Gift Hampers' },
    { href: '/about', label: 'About Us' },
    { href: '/admin/login', label: 'Admin', icon: true },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setSearchOpen(false);
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || searchOpen ? 'glass py-3' : 'bg-white/90 backdrop-blur-md border-b border-[#c69f62]/10 py-4'}`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center text-xl sm:text-2xl font-semibold tracking-wide text-[#241612] group">
                        <DummyLogoIcon />
                        <span>Rich'n<span className="text-[#c69f62] transition-colors group-hover:text-[#8a4836]">Bites</span></span>
                    </Link>

                    {/* Center Pill Menu — Desktop only */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8 bg-[#3d241c] text-white px-8 py-3 rounded-full text-sm font-medium shadow-lg backdrop-blur-md">
                        {NAV_LINKS.map(link => (
                            <Link key={link.href} href={link.href} className="hover:text-[#c69f62] transition-colors flex items-center">
                                {link.icon && <User className="w-4 h-4 mr-1" />}
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-3 sm:space-x-5 text-[#241612]">
                        <button onClick={() => setSearchOpen(!searchOpen)} className="hover:text-[#c69f62] transition-colors" title="Search">
                            <Search className="w-5 h-5" />
                        </button>

                        <button onClick={() => dispatch(toggleCart())} className="hover:text-[#c69f62] transition-colors relative" title="View Cart">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="absolute -top-1.5 -right-1.5 bg-[#c69f62] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {cartCount}
                            </span>
                        </button>

                        <div className="h-6 w-px bg-[#3d241c]/20 mx-1 hidden sm:block" />
                        <a href="https://wa.me/916374530933" target="_blank" rel="noopener noreferrer" className="hover:text-[#c69f62] transition-colors hidden sm:block" title="Order via WhatsApp">
                            <WhatsAppIcon className="w-5 h-5" />
                        </a>
                        <a href="https://www.instagram.com/_.richn_bites._?igsh=bXBuMW9xbW9nOTY2" target="_blank" rel="noopener noreferrer" className="hover:text-[#c69f62] transition-colors hidden sm:block" title="Order via Instagram">
                            <Instagram className="w-5 h-5" />
                        </a>

                        {/* Mobile Hamburger */}
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden hover:text-[#c69f62] transition-colors ml-1" title="Menu">
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Dropdown Search Bar */}
                <AnimatePresence>
                    {searchOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-white border-t border-gray-100 mt-3 absolute w-full left-0 overflow-hidden shadow-lg"
                        >
                            <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-4">
                                <form onSubmit={handleSearch} className="relative flex items-center">
                                    <Search className="w-5 h-5 absolute left-4 text-gray-400" />
                                    <input
                                        type="text"
                                        autoFocus
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search for chocolate bars, pops, or flavors..."
                                        className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:border-[#c69f62] focus:ring-[#c69f62]/20"
                                    />
                                    <button type="button" onClick={() => setSearchOpen(false)} className="absolute right-4 text-gray-400 hover:text-gray-700">
                                        <X className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Mobile Slide-in Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[60] md:hidden"
                        />
                        {/* Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#1a1a1a] z-[70] md:hidden flex flex-col shadow-2xl"
                        >
                            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                                <span className="text-white text-lg font-bold">Menu</span>
                                <button onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                                {NAV_LINKS.map(link => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center px-4 py-3.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors text-sm font-medium"
                                    >
                                        {link.icon && <User className="w-4 h-4 mr-2" />}
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                            <div className="px-6 py-6 border-t border-white/10 flex items-center space-x-4">
                                <a href="https://wa.me/916374530933" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#25D366] transition-colors">
                                    <WhatsAppIcon className="w-5 h-5" />
                                </a>
                                <a href="https://www.instagram.com/_.richn_bites._?igsh=bXBuMW9xbW9nOTY2" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#c69f62] transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
