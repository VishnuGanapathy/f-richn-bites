'use client';

import { AlertTriangle, Package, Leaf, Layers, ShieldAlert, BarChart3 } from 'lucide-react';

const inventoryData = [
    { id: '1', name: 'Dark 70% Base', type: 'Chocolate Base', stock: 45, unit: 'kg', threshold: 50 },
    { id: '2', name: 'Premium Almonds', type: 'Topping', stock: 120, unit: 'kg', threshold: 20 },
    { id: '3', name: 'Magnetic Custom Box', type: 'Packaging', stock: 15, unit: 'pcs', threshold: 50 },
    { id: '4', name: 'Gold Branding Foil', type: 'Packaging', stock: 500, unit: 'm', threshold: 100 },
    { id: '5', name: 'Madagascar Vanilla', type: 'Flavoring', stock: 8, unit: 'litres', threshold: 10 },
    { id: '6', name: 'Sea Salt Flakes', type: 'Topping', stock: 35, unit: 'kg', threshold: 15 },
];

export default function AdminInventory() {
    const criticalItems = inventoryData.filter(i => i.stock < i.threshold);

    return (
        <div className="space-y-6">

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.02)] p-6 flex flex-col items-start">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-4"><Layers className="w-5 h-5" /></div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Total SKUs Tracked</p>
                    <h4 className="text-3xl font-bold tracking-tight text-[#111111]">{inventoryData.length} Items</h4>
                </div>

                <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.02)] p-6 flex flex-col items-start">
                    <div className="p-3 bg-rose-50 text-rose-600 rounded-xl mb-4"><ShieldAlert className="w-5 h-5" /></div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Low Stock Alerts</p>
                    <h4 className="text-3xl font-bold tracking-tight text-rose-600">{criticalItems.length} Warnings</h4>
                </div>

                <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.02)] p-6 flex flex-col items-start bg-[url('/images/hero_chocolate_bars_highq.png')] bg-cover bg-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#241612]/90 backdrop-blur-sm group-hover:bg-[#1a1a1a]/95 transition-colors"></div>
                    <div className="relative z-10 w-full h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-white/10 text-[#c69f62] rounded-xl"><BarChart3 className="w-5 h-5" /></div>
                            <button className="text-xs font-bold text-[#c69f62] uppercase tracking-widest hover:text-white transition-colors">Generate Report</button>
                        </div>
                        <div>
                            <p className="text-xs text-white/50 font-bold uppercase tracking-widest mb-1">Inventory Health</p>
                            <h4 className="text-3xl font-bold tracking-tight text-white mb-2">Excellent</h4>
                            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#c69f62] h-full rounded-full" style={{ width: '85%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Critical Alerts Component */}
            {criticalItems.length > 0 && (
                <div className="bg-rose-50 border border-rose-200/50 p-5 rounded-[20px] shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-rose-900 text-sm mb-1">Critical Refill Required</h4>
                        <p className="text-rose-700/80 text-sm leading-relaxed font-medium">
                            <strong>{criticalItems.map(i => i.name).join(', ')}</strong> are running below their operational minimum threshold. Please issue POs immediately to prevent production bottleneck.
                        </p>
                    </div>
                </div>
            )}

            {/* Main Tracking Board */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-8">
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
                    <div>
                        <h3 className="text-2xl font-bold text-[#111111] tracking-tight mb-1">Raw Material Levels</h3>
                        <p className="text-sm font-medium text-gray-500">Live operational stock tracking across all modules</p>
                    </div>
                    <button className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-[#111111] font-bold text-sm tracking-wide rounded-xl transition-colors border border-gray-200 shadow-sm">
                        Adjust Stock
                    </button>
                </div>

                <div className="space-y-2">
                    {inventoryData.map((item) => {
                        const isLowStock = item.stock < item.threshold;
                        const percent = Math.min((item.stock / (item.threshold * 3)) * 100, 100);

                        return (
                            <div key={item.id} className="group p-4 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all duration-300">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-4">
                                        <span className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-gray-100 bg-white
                       ${item.type === 'Packaging' ? 'text-blue-500' :
                                                item.type === 'Topping' ? 'text-emerald-500' :
                                                    item.type === 'Flavoring' ? 'text-purple-500' : 'text-[#8a4836]'}
                     `}>
                                            {item.type === 'Packaging' ? <Package className="w-5 h-5" /> : <Leaf className="w-5 h-5" />}
                                        </span>
                                        <div>
                                            <h4 className="font-bold text-[#111111] text-base group-hover:text-[#c69f62] transition-colors tracking-tight">{item.name}</h4>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.type}</span>
                                        </div>
                                    </div>

                                    <div className="text-right flex items-center gap-4 border-l border-gray-200 pl-6 lg:border-none lg:pl-0">
                                        {isLowStock && <span className="hidden sm:inline-block px-2 py-1 bg-rose-50 text-rose-600 text-[10px] font-bold uppercase rounded-md border border-rose-100 tracking-wide">Refill Urgently</span>}
                                        <div>
                                            <span className={`font-bold text-xl font-mono tracking-tight block ${isLowStock ? 'text-rose-600' : 'text-[#111111]'}`}>
                                                {item.stock} <span className="text-sm text-gray-400 font-sans tracking-normal">{item.unit}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar Container */}
                                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden mt-2 border border-gray-200/50">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ease-out 
                       ${isLowStock ? 'bg-gradient-to-r from-rose-500 to-rose-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                                                'bg-gradient-to-r from-[#111111] to-[#444444]'}
                     `}
                                        style={{ width: `${Math.max(percent, 5)}%` }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    );
}
