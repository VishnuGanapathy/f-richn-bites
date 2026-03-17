import { Instagram, Facebook, Twitter, MapPin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#241612] text-[#fcf9f5] py-12 sm:py-20 px-4 sm:px-6 lg:px-12 border-t border-[#c69f62]/20">
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">

                {/* Brand */}
                <div className="col-span-2 md:col-span-1">
                    <Link href="/" className="text-3xl font-semibold tracking-wide text-white mb-6 inline-block">
                        Rich'n<span className="text-[#c69f62]">Bites</span>
                    </Link>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Crafting luxury artisanal chocolate experiences with total personalization. Your perfect bite, designed by you.
                    </p>
                    <div className="flex space-x-4">
                        <a href="https://www.instagram.com/_.richn_bites._?igsh=bXBuMW9xbW9nOTY2" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c69f62] transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c69f62] transition-colors">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c69f62] transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-bold mb-6 font-serif uppercase tracking-wider">Shop</h4>
                    <ul className="space-y-4">
                        <li><Link href="/product?type=bars" className="text-gray-400 hover:text-[#c69f62] transition-colors">Custom Bars</Link></li>
                        <li><Link href="/product?type=pops" className="text-gray-400 hover:text-[#c69f62] transition-colors">Luxury Pops</Link></li>
                        <li><Link href="/product?type=bites" className="text-gray-400 hover:text-[#c69f62] transition-colors">Premium Bites</Link></li>
                        <li><Link href="/hampers" className="text-gray-400 hover:text-[#c69f62] transition-colors">Gift Hampers</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="text-lg font-bold mb-6 font-serif uppercase tracking-wider">Support</h4>
                    <ul className="space-y-4">
                        <li><Link href="/faq" className="text-gray-400 hover:text-[#c69f62] transition-colors">FAQ</Link></li>
                        <li><Link href="/policies/shipping" className="text-gray-400 hover:text-[#c69f62] transition-colors">Shipping Policy</Link></li>
                        <li><Link href="/policies/returns" className="text-gray-400 hover:text-[#c69f62] transition-colors">Returns & Refunds</Link></li>
                        <li><Link href="/contact" className="text-gray-400 hover:text-[#c69f62] transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-lg font-bold mb-6 font-serif uppercase tracking-wider">Contact</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li className="flex items-start">
                            <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-[#c69f62]" />
                            <span>123 Luxury Lane, Culinary District, Mumbai 400001</span>
                        </li>
                        <li className="flex items-center">
                            <Phone className="w-5 h-5 mr-3 flex-shrink-0 text-[#c69f62]" />
                            <span>+91 98765 43210</span>
                        </li>
                        <li className="flex items-center">
                            <Mail className="w-5 h-5 mr-3 flex-shrink-0 text-[#c69f62]" />
                            <span>hello@richnbites.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto mt-10 sm:mt-16 pt-8 border-t border-white/10 text-center text-xs sm:text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Rich'n Bites. All rights reserved.</p>
            </div>
        </footer>
    );
}
