'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { GIFT_HAMPERS } from '@/data/products';

export default function HampersPage() {
    return (
        <main className="min-h-screen bg-[#fcf9f5] flex flex-col pt-24 sm:pt-32 pb-24">
            <Navbar />

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex-1 flex flex-col items-center">
                <span className="text-[#c69f62] font-bold tracking-widest uppercase text-xs sm:text-sm mb-4">Gifting Elegance</span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] mb-6 font-serif tracking-tight text-center">
                    Luxury Gift Hampers
                </h1>
                <p className="text-gray-600 max-w-2xl text-center mb-12 sm:mb-16 text-sm sm:text-base">
                    Curated with our most premium chocolate assortments and packaged beautifully in our signature gold-embossed bespoke boxes.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 w-full max-w-6xl">
                    {GIFT_HAMPERS.map((hamper, i) => (
                        <motion.div
                            key={hamper.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="bg-white rounded-[32px] border border-gray-100 overflow-hidden group hover:shadow-[0_15px_40px_rgba(36,22,18,0.08)] transition-all duration-500 relative flex flex-col"
                        >
                            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
                                <span className={hamper.tag === 'Bestseller' ? "bg-[#3d241c] text-[#c69f62] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center" : "bg-[#c69f62] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg"}>
                                    {hamper.tag === 'Bestseller' && <Star className="w-3 h-3 mr-1 fill-[#c69f62] text-[#c69f62]" />}
                                    {hamper.tag}
                                </span>
                            </div>

                            <div className="relative h-56 sm:h-72 bg-gradient-to-br from-[#fcf9f5] to-[#f4eee6] p-8 flex justify-center items-center overflow-hidden">
                                <div className="absolute w-40 h-40 bg-white rounded-full blur-[40px] opacity-60" />
                                <div className="relative w-40 h-40 sm:w-56 sm:h-56 group-hover:scale-105 transition-transform duration-700 ease-out">
                                    <Image src={hamper.img} alt={hamper.name} fill className="object-contain drop-shadow-2xl" />
                                </div>
                            </div>

                            <div className="p-6 sm:p-8 flex flex-col flex-1">
                                <h3 className="text-xl sm:text-2xl font-bold text-[#111111] mb-3">{hamper.name}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed mb-6 sm:mb-8 flex-1">{hamper.desc}</p>

                                <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-5 sm:pt-6">
                                    <span className="text-xl sm:text-2xl font-bold text-[#241612] font-serif italic">₹{hamper.price}</span>
                                    <button className="flex items-center space-x-2 bg-[#3d241c] text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-sm font-bold hover:bg-[#c69f62] hover:shadow-[0_0_20px_rgba(198,159,98,0.4)] hover:-translate-y-0.5 transition-all duration-300">
                                        <ShoppingBag className="w-4 h-4" />
                                        <span>Gift This</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-20" />
            <Footer />
        </main>
    );
}
