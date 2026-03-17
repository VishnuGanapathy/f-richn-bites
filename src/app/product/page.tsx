'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
    setProductType, setChocolateBase, setWeight,
    toggleTopping, setQuantity, resetConfig
} from '@/features/productSlice';
import { addToCart } from '@/features/cartSlice';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Check, ChevronRight, ChevronLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import {
    PRODUCT_TYPES, CHOCOLATE_BASES, WEIGHT_OPTIONS,
    TOPPING_LIST, CUSTOMIZATION_STEPS
} from '@/data/products';

export default function ProductConfigurationPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const dispatch = useAppDispatch();
    const productConfig = useAppSelector(state => state.product);

    const handleNext = () => {
        if (currentStep < CUSTOMIZATION_STEPS.length - 1) setCurrentStep(c => c + 1);
    };
    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(c => c - 1);
    };

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: Math.random().toString(36).substring(7),
            productType: productConfig.productType,
            chocolateBase: productConfig.chocolateBase,
            toppings: productConfig.toppings,
            packaging: productConfig.packaging,
            weight: productConfig.weight,
            quantity: productConfig.quantity,
            finalPrice: productConfig.finalPrice
        }));
        alert('Added to Cart Successfully!');
        dispatch(resetConfig());
        setCurrentStep(0);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {PRODUCT_TYPES.map(type => (
                            <div
                                key={type.id}
                                onClick={() => dispatch(setProductType(type.id))}
                                className={`cursor-pointer rounded-2xl border-2 p-4 sm:p-6 transition-all duration-300 relative bg-white ${productConfig.productType === type.id ? 'border-[#c69f62] shadow-xl scale-[1.02]' : 'border-gray-100 hover:border-[#c69f62]/50'}`}
                            >
                                {productConfig.productType === type.id && (
                                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#c69f62] text-white p-1 rounded-full"><Check className="w-4 h-4" /></div>
                                )}
                                <div className="relative w-full h-32 sm:h-40 mb-4">
                                    <Image src={type.img} alt={type.name} fill className="object-contain drop-shadow-md" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-[#241612] text-center">{type.name}</h3>
                                <p className="text-center text-gray-500 mt-2 text-sm">Starts from ₹{type.price}</p>
                            </div>
                        ))}
                    </div>
                );
            case 1:
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {CHOCOLATE_BASES.map(base => (
                            <div
                                key={base.id}
                                onClick={() => dispatch(setChocolateBase(base.id))}
                                className={`cursor-pointer rounded-xl border-2 p-5 sm:p-6 transition-all duration-300 relative bg-white ${productConfig.chocolateBase === base.id ? 'border-[#c69f62] bg-[#fcf9f5]' : 'border-gray-100 hover:border-[#c69f62]/30'}`}
                            >
                                <h4 className="font-bold text-[#241612] text-base sm:text-lg">{base.name}</h4>
                                <p className="text-sm text-gray-500 mt-1">{base.desc}</p>
                                {productConfig.chocolateBase === base.id && <Check className="absolute top-5 right-5 sm:top-6 sm:right-6 text-[#c69f62]" />}
                            </div>
                        ))}
                    </div>
                );
            case 2:
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {WEIGHT_OPTIONS.map(weight => (
                            <div
                                key={weight.id}
                                onClick={() => dispatch(setWeight(weight.id))}
                                className={`cursor-pointer rounded-xl border-2 p-5 sm:p-6 text-center transition-all duration-300 bg-white ${productConfig.weight === weight.id ? 'border-[#c69f62] bg-[#fcf9f5]' : 'border-gray-100 hover:border-[#c69f62]/30'}`}
                            >
                                <span className="font-bold text-[#241612] text-lg sm:text-xl">{weight.label}</span>
                            </div>
                        ))}
                    </div>
                );
            case 3:
                return (
                    <div>
                        <p className="text-sm text-gray-500 mb-6">Select up to 5 master-crafted toppings (₹50 each)</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                            {TOPPING_LIST.map(topping => {
                                const isSelected = productConfig.toppings.includes(topping);
                                const isDisabled = !isSelected && productConfig.toppings.length >= 5;
                                return (
                                    <div
                                        key={topping}
                                        onClick={() => !isDisabled && dispatch(toggleTopping(topping))}
                                        className={`cursor-pointer rounded-xl border-2 p-3 sm:p-4 text-center transition-all duration-300 
                                            ${isSelected ? 'border-[#c69f62] bg-[#c69f62] text-white' :
                                                isDisabled ? 'opacity-50 cursor-not-allowed border-gray-100 bg-gray-50' :
                                                    'border-gray-200 bg-white hover:border-[#c69f62]'}`}
                                    >
                                        <span className="font-medium text-sm">{topping}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {productConfig.toppings.map(t => (
                                <span key={t} className="px-3 py-1 bg-[#fcf9f5] border border-[#c69f62]/30 rounded-full text-sm font-medium text-[#8a4836]">{t}</span>
                            ))}
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
                        <h3 className="text-xl sm:text-2xl font-bold font-serif mb-6 border-b pb-4">Order Summary</h3>
                        <div className="space-y-4 mb-8 text-sm sm:text-base">
                            <div className="flex justify-between font-medium">
                                <span className="text-gray-500">Product</span>
                                <span className="capitalize">{PRODUCT_TYPES.find(p => p.id === productConfig.productType)?.name}</span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span className="text-gray-500">Base</span>
                                <span>{productConfig.chocolateBase}</span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span className="text-gray-500">Weight</span>
                                <span>{productConfig.weight}</span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span className="text-gray-500">Toppings ({productConfig.toppings.length})</span>
                                <span className="text-right max-w-[200px]">{productConfig.toppings.join(', ') || 'None'}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-[#fcf9f5] p-4 rounded-xl border border-[#c69f62]/20">
                            <span className="font-bold">Quantity</span>
                            <div className="flex items-center space-x-4">
                                <button onClick={() => dispatch(setQuantity(productConfig.quantity - 1))} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center hover:bg-gray-50"><Minus className="w-4 h-4" /></button>
                                <span className="font-bold text-lg">{productConfig.quantity}</span>
                                <button onClick={() => dispatch(setQuantity(productConfig.quantity + 1))} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center hover:bg-gray-50"><Plus className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 sm:pt-28 pb-32 bg-[#fafafa]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row gap-8 lg:gap-12 relative lg:items-start">

                    {/* Main Configurator */}
                    <div className="lg:w-2/3 flex-1">
                        {/* Stepper */}
                        <div className="mb-10">
                            <div className="flex items-center justify-between relative z-10">
                                {CUSTOMIZATION_STEPS.map((step, index) => (
                                    <div key={step} className="flex flex-col items-center relative z-10 w-1/6">
                                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${index < currentStep ? 'bg-[#c69f62] text-white' :
                                            index === currentStep ? 'bg-[#241612] text-white ring-4 ring-[#c69f62]/30' :
                                                'bg-gray-200 text-gray-400'
                                            }`}>
                                            {index < currentStep ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : index + 1}
                                        </div>
                                        <span className={`text-[9px] sm:text-xs mt-2 text-center font-medium absolute top-9 sm:top-10 w-16 sm:w-24 left-1/2 -translate-x-1/2 ${index <= currentStep ? 'text-[#241612]' : 'text-gray-400'}`}>
                                            {step}
                                        </span>
                                    </div>
                                ))}
                                <div className="absolute top-3.5 sm:top-4 left-0 right-0 h-[2px] bg-gray-200 -z-10 mx-6">
                                    <div className="h-full bg-[#c69f62] transition-all duration-500" style={{ width: `${(currentStep / (CUSTOMIZATION_STEPS.length - 1)) * 100}%` }} />
                                </div>
                            </div>
                        </div>

                        {/* Step Content */}
                        <div className="mt-14 sm:mt-16 bg-white shrink-0 p-5 sm:p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[350px] sm:min-h-[400px] flex flex-col">
                            <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-6 sm:mb-8">{CUSTOMIZATION_STEPS[currentStep]}</h2>
                            <AnimatePresence mode="wait">
                                <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex-1">
                                    {renderStepContent()}
                                </motion.div>
                            </AnimatePresence>

                            <div className="mt-10 sm:mt-12 pt-6 border-t flex justify-between items-center">
                                <button onClick={handleBack} disabled={currentStep === 0} className={`flex items-center font-medium py-2 px-4 rounded-full transition-colors text-sm ${currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
                                    <ChevronLeft className="w-5 h-5 mr-1" /> Back
                                </button>
                                {currentStep < CUSTOMIZATION_STEPS.length - 1 ? (
                                    <button onClick={handleNext} className="flex items-center bg-[#3d241c] text-white font-medium py-3 px-6 sm:px-8 rounded-full shadow-lg hover:bg-[#c69f62] hover:-translate-y-0.5 transition-all text-sm">
                                        Next Step <ChevronRight className="w-5 h-5 ml-1" />
                                    </button>
                                ) : (
                                    <button onClick={handleAddToCart} className="flex items-center bg-[#c69f62] text-white font-medium py-3 px-6 sm:px-8 rounded-full shadow-xl hover:bg-[#a37d40] hover:-translate-y-0.5 transition-all animate-pulse-slow font-bold text-sm">
                                        <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart (₹{productConfig.finalPrice})
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sticky Price Summary (Desktop) */}
                    <div className="hidden lg:block lg:w-1/3 sticky top-32">
                        <div className="bg-[#3d241c] text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl" />
                            <h3 className="text-xl font-bold font-serif mb-6 tracking-wide text-white/90 uppercase border-b border-white/10 pb-4">Live Summary</h3>
                            <div className="space-y-4 mb-8 text-sm">
                                <div className="flex justify-between"><span className="text-white/60">Base Price ({productConfig.weight})</span><span className="font-semibold">₹{productConfig.basePrice}</span></div>
                                {productConfig.toppings.length > 0 && (
                                    <div className="flex justify-between"><span className="text-white/60">Toppings (x{productConfig.toppings.length})</span><span className="font-semibold">+ ₹{productConfig.toppings.length * 50}</span></div>
                                )}
                                <div className="flex justify-between mb-4 mt-2 pt-2 border-t border-white/10"><span className="text-white/60">Quantity</span><span className="font-semibold">x{productConfig.quantity}</span></div>
                            </div>
                            <div className="pt-6 border-t border-[#c69f62]/30 flex justify-between items-end">
                                <div>
                                    <p className="text-xs text-[#c69f62] uppercase tracking-wider font-bold mb-1">Total Estimated</p>
                                    <p className="text-4xl font-light tracking-tight">₹{productConfig.finalPrice}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Mobile Price Bar */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#3d241c] text-white p-4 shadow-2xl z-40 rounded-t-3xl flex justify-between items-center border-t border-[#c69f62]/30">
                    <div>
                        <p className="text-xs text-[#c69f62] mb-0.5 font-bold uppercase">Total</p>
                        <p className="text-2xl font-bold">₹{productConfig.finalPrice}</p>
                    </div>
                    {currentStep === CUSTOMIZATION_STEPS.length - 1 ? (
                        <button onClick={handleAddToCart} className="bg-[#c69f62] text-white px-6 py-2.5 rounded-full font-bold shadow-lg text-sm">Add to Cart</button>
                    ) : (
                        <button onClick={handleNext} className="bg-white text-[#241612] px-6 py-2.5 pr-4 rounded-full font-bold flex items-center shadow-lg text-sm">
                            Next <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
