'use client';

import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { ALL_PRODUCTS } from '@/data/products';

export default function ShopPage() {
    return (
        <main className="min-h-screen bg-[#fcf9f5] flex flex-col pt-24 sm:pt-32 pb-24">
            <Navbar />

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex-1 flex flex-col items-center">
                <span className="text-[#c69f62] font-bold tracking-widest uppercase text-xs sm:text-sm mb-4">Our Catalog</span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] mb-8 sm:mb-12 font-serif tracking-tight text-center">
                    Premium Chocolate Collections
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
                    {ALL_PRODUCTS.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-[24px] border border-gray-100 overflow-hidden group hover:shadow-[0_8px_30px_rgba(36,22,18,0.08)] transition-all duration-300"
                        >
                            <div className="relative h-52 sm:h-64 bg-[#fcf9f5] p-6 flex justify-center items-center overflow-hidden">
                                <div className="absolute inset-0 bg-[#c69f62]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative w-36 h-36 sm:w-48 sm:h-48 group-hover:scale-110 transition-transform duration-500">
                                    <Image src={product.image} alt={product.name} fill className="object-contain drop-shadow-xl" />
                                </div>
                            </div>
                            <div className="p-5 sm:p-6">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#c69f62] mb-1 block">
                                    {product.type}
                                </span>
                                <h3 className="text-lg sm:text-xl font-bold text-[#111111] mb-2">{product.name}</h3>
                                <p className="text-xs text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex justify-between items-center mt-auto">
                                    <span className="text-lg font-bold text-[#241612]">₹{product.price}</span>
                                    <button className="flex items-center space-x-2 bg-[#3d241c] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#c69f62] transition-colors shadow-md">
                                        <ShoppingBag className="w-4 h-4" />
                                        <span>Add</span>
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
