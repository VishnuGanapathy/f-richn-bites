import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/ui/HeroSection";
import CategorySection from "@/components/ui/CategorySection";
import WhySection from "@/components/ui/WhySection";
import FeaturedSection from "@/components/ui/FeaturedSection";
import Footer from "@/components/ui/Footer";
import Image from "next/image";

// Custom WhatsApp Icon Component
const FloatingWhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

// A minimal Instagram section purely for the main page before footer
function InstagramSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#fcf9f5]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#241612] mb-4">Follow Our Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Tag @richnbites to be featured on our premium gallery.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative aspect-square group overflow-hidden bg-gray-100 rounded-xl cursor-pointer">
              <Image
                src={
                  i % 3 === 0 ? "/images/chocolate_bites.png" :
                    i % 2 === 0 ? "/images/hero_chocolate_bars.png" :
                      "/images/chocolate_pops.png"
                }
                alt="Instagram Custom Chocolate"
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <HeroSection />
      <CategorySection />
      <WhySection />
      <FeaturedSection />
      <InstagramSection />
      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/916374530933"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
        title="Order via WhatsApp"
      >
        <FloatingWhatsAppIcon />
      </a>
    </main>
  );
}
