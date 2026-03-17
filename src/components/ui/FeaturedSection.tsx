'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FEATURED_PRODUCTS } from '@/data/products';

export default function FeaturedSection() {
    return (
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-white scroll-mt-20">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#241612] mb-4">Featured Collections</h2>
                        <p className="text-gray-600 max-w-2xl text-sm sm:text-base">Handpicked selections from our master chocolatiers — readily available or fully customizable to your taste.</p>
                    </div>
                    <Link href="/shop" className="text-[#c69f62] font-semibold hover:text-[#8a4836] flex items-center mt-4 md:mt-0 group transition-colors">
                        View All Products
                        <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
                    {FEATURED_PRODUCTS.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group rounded-3xl overflow-hidden bg-[#fcf9f5] border border-transparent hover:border-[#c69f62]/20 hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="relative h-[240px] sm:h-[300px] w-full p-8 flex items-center justify-center bg-gradient-to-b from-[#fcf9f5] to-[#f4efe8]">
                                <Image src={product.image} alt={product.name} fill className="object-contain p-8 drop-shadow-lg transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#241612] uppercase tracking-wider">
                                    {product.type}
                                </div>
                            </div>

                            <div className="p-6 sm:p-8 bg-white text-center flex flex-col items-center">
                                <h3 className="text-lg sm:text-xl font-bold text-[#241612] mb-2">{product.name}</h3>
                                <p className="text-gray-500 mb-6">Starting from <span className="font-semibold text-[#8a4836] text-lg">₹{product.price}</span></p>
                                <Link
                                    href={`/product?type=${product.type.toLowerCase()}`}
                                    className="w-full bg-transparent border border-[#3d241c] text-[#3d241c] font-medium py-3 rounded-full hover:bg-[#3d241c] hover:text-white transition-colors duration-300 block text-center"
                                >
                                    View Customization
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
