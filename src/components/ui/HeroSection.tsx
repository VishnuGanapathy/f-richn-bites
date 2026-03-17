'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-gradient-to-tr from-[#ffffff] via-[#faf8f5] to-[#f5f1eb]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center relative z-10">

                {/* Left Content */}
                <div className="lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left z-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.2] mb-6 tracking-tight uppercase"
                        style={{ fontFamily: 'var(--font-inter)' }}
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#241612] via-[#c69f62] to-[#241612] bg-[length:200%_auto] animate-[gradient_5s_ease_infinite] block">
                            Craft Your<br />Perfect Bites.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 max-w-md leading-relaxed"
                    >
                        Discover the perfect harmony of premium ingredients and customized design. Masterfully crafted luxury chocolate, just for you.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex space-x-4"
                    >
                        <Link href="/product" className="bg-[#3d241c] text-white px-8 py-3.5 rounded-full font-bold tracking-wide shadow-2xl shadow-[#3d241c]/30 hover:bg-[#c69f62] hover:shadow-[#c69f62]/40 transition-all hover:-translate-y-1 text-sm uppercase">
                            Start Customizing
                        </Link>
                    </motion.div>
                </div>

                {/* Right Image */}
                <div className="lg:w-1/2 relative mt-8 sm:mt-16 lg:mt-0 h-[350px] sm:h-[500px] lg:h-[600px] w-full flex justify-center items-center z-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] z-10"
                    >
                        {/* The float animation class from our css applies the gentle bobbing */}
                        <div className="w-full h-full animate-[float_6s_ease-in-out_infinite]">
                            <Image
                                src="/images/richnbites_chocolate_bars.png"
                                alt="Rich'n Bites Premium Chocolate Bars"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-contain drop-shadow-[0_30px_30px_rgba(61,36,28,0.2)]"
                                priority
                            />
                        </div>
                    </motion.div>
                    {/* Floating decorative elements mimicking beans */}
                    <motion.div
                        className="absolute top-1/4 left-10 w-8 h-8 bg-[#c69f62] rounded-full blur-md opacity-50"
                        animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-20 w-12 h-12 bg-[#8a4836] rounded-full blur-xl opacity-40"
                        animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </div>

            {/* Background radial gradient similar to reference */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-[#c69f62] rounded-full blur-[150px] opacity-10 -z-10 pointer-events-none" />
        </section>
    );
}
