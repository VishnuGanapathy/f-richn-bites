'use client';

import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#fcf9f5] flex flex-col pt-24 sm:pt-32 pb-24">
            <Navbar />

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex-1 flex flex-col items-center justify-center text-center max-w-4xl">
                <span className="text-[#c69f62] font-bold tracking-widest uppercase text-sm mb-4">Our Heritage</span>
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-[#111111] mb-8 font-serif tracking-tight">
                    The Art of <br /> Premium Chocolate
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    Rich'n Bites is born out of a passion for luxury and craftsmanship. We source only the finest cocoa beans and meticulously craft each piece to create a truly unforgettable experience. (This is a dummy page to be expanded later).
                </p>

                <div className="w-24 h-1 bg-[#c69f62]/30 rounded-full mx-auto mb-16"></div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-[#111111] font-bold text-xl mb-3">Finest Cocoa</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Sourced globally for the richest flavor.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-[#111111] font-bold text-xl mb-3">Master Crafted</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Artisan techniques for a flawless snap.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-[#111111] font-bold text-xl mb-3">100% Custom</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Built exactly to your specifications.</p>
                    </div>
                </div>
            </div>

            <div className="mt-20" />
            <Footer />
        </main>
    );
}
