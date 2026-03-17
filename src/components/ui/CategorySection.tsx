'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CATEGORIES } from '@/data/products';

export default function CategorySection() {
    return (
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-white scroll-mt-20">
            <div className="container mx-auto">
                <div className="text-center mb-10 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#241612] mb-4">Discover Our Collections</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">From our signature bars to customized luxury pops, find the perfect treat for any occasion.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto">
                    {CATEGORIES.map((category, index) => (
                        <motion.a
                            key={index}
                            href={category.link}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={`block rounded-[24px] sm:rounded-[32px] ${category.color} relative overflow-hidden group cursor-pointer border border-transparent hover:border-[#c69f62]/20 hover:shadow-2xl transition-all duration-300
                                flex flex-row sm:flex-col items-center sm:items-center sm:justify-between
                                p-4 sm:p-8 sm:aspect-square`}
                        >
                            <h3 className="text-lg sm:text-2xl font-semibold text-[#241612] z-10 sm:mb-0">{category.title}</h3>
                            <div className="relative w-20 h-20 sm:w-48 sm:h-48 ml-auto sm:ml-0 sm:mt-auto transform group-hover:scale-110 transition-transform duration-500 ease-out z-0 shrink-0">
                                <Image src={category.image} alt={category.title} fill className="object-contain drop-shadow-xl" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#c69f62]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
