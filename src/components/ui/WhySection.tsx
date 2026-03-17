'use client';

import { motion } from 'framer-motion';
import { Star, Settings2, PackageOpen, ShieldCheck, BadgeCheck, Flag, Truck } from 'lucide-react';

const reasons = [
    {
        icon: <Star className="w-8 h-8 text-[#c69f62]" />,
        title: 'Premium Ingredients',
        description: 'Sourced from the finest cocoa variants globally, ensuring a rich and authentic taste profile.',
    },
    {
        icon: <Settings2 className="w-8 h-8 text-[#c69f62]" />,
        title: 'Fully Customizable',
        description: 'Design your own chocolate profile, from the base flavor to the final toppings.',
    },
    {
        icon: <PackageOpen className="w-8 h-8 text-[#c69f62]" />,
        title: 'Luxury Packaging',
        description: 'Delivered in our signature embossed magnetic boxes, perfect for gifting or a premium self-treat.',
    },
];

const trustBadges = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-[#c69f62]" />,
        title: 'Secure Payments',
        description: '100% safe & encrypted checkout every time.',
    },
    {
        icon: <BadgeCheck className="w-8 h-8 text-[#c69f62]" />,
        title: 'Assured Quality',
        description: 'Premium ingredients rigorously tested in every batch.',
    },
    {
        icon: <Flag className="w-8 h-8 text-[#c69f62]" />,
        title: 'Made In India',
        description: 'Proudly handcrafted locally with love and precision.',
    },
    {
        icon: <Truck className="w-8 h-8 text-[#c69f62]" />,
        title: 'Timely Delivery',
        description: 'Fast, reliable shipping straight to your door.',
    },
];

export default function WhySection() {
    return (
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#fcf9f5] border-t border-[#3d241c]/5 scroll-mt-20">
            <div className="container mx-auto">

                {/* Why Rich'n Bites */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#241612] mb-4">
                        Why Rich&apos;n Bites
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Experience the intersection of luxury, artisan craftsmanship, and total personalization.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-16 sm:mb-20">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-[#c69f62]/10 group-hover:border-[#c69f62]/40 group-hover:scale-110 transition-all duration-300">
                                {reason.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#241612] mb-3">{reason.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-6 mb-16">
                    <div className="flex-1 h-px bg-[#c69f62]/15" />
                    <span className="text-sm sm:text-base font-bold uppercase tracking-widest text-[#c69f62] font-serif">Our Promise</span>
                    <div className="flex-1 h-px bg-[#c69f62]/15" />
                </div>

                {/* Trust Badges — same icon + text style */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                    {trustBadges.map((badge, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-5 shadow-sm border border-[#c69f62]/10 group-hover:border-[#c69f62]/40 group-hover:scale-110 transition-all duration-300">
                                {badge.icon}
                            </div>
                            <h3 className="text-lg font-bold text-[#241612] mb-2">{badge.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{badge.description}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
