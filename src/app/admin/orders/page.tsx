'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Download, Search, Filter, MoreHorizontal, CheckCircle2, Clock, Truck, PackageCheck } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks'; // Connecting real cart later or using dynamic data

const mockOrders = [
    { id: 'ORD-1001', customer: 'Alice Smith', phone: '+91 9876543210', address: 'Mumbai, MH', product: 'Custom Dark Bar', total: 649, status: 'Processing', date: '2026-03-05' },
    { id: 'ORD-1002', customer: 'Bob Jones', phone: '+91 8765432109', address: 'Delhi, DL', product: 'Luxury Pop (x2)', total: 698, status: 'Shipped', date: '2026-03-04' },
    { id: 'ORD-1003', customer: 'Charlie Brown', phone: '+91 7654321098', address: 'Bangalore, KA', product: 'Premium Bites', total: 799, status: 'Delivered', date: '2026-03-02' },
    { id: 'ORD-1004', customer: 'Diana Prince', phone: '+91 6543210987', address: 'Pune, MH', product: 'White Couverture Bar', total: 549, status: 'Pending', date: '2026-03-05' },
    { id: 'ORD-1005', customer: 'Ethan Hunt', phone: '+91 5432109876', address: 'Chennai, TN', product: 'Signature Hampers', total: 1299, status: 'Processing', date: '2026-03-05' },
];

export default function AdminOrders() {
    const [searchTerm, setSearchTerm] = useState('');

    // Real Data connect if needed:
    // const cartItems = useAppSelector(state => state.cart.items);
    // (In a real app, this would fetch from an API like /api/orders)

    const filteredOrders = mockOrders.filter(order =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredOrders.map(o => ({
            'Order ID': o.id,
            'Date': o.date,
            'Customer Name': o.customer,
            'Phone': o.phone,
            'Address': o.address,
            'Product Summary': o.product,
            'Total Amount (₹)': o.total,
            'Status': o.status
        })));

        ws['!cols'] = [
            { wch: 12 }, { wch: 15 }, { wch: 22 }, { wch: 15 },
            { wch: 25 }, { wch: 25 }, { wch: 18 }, { wch: 15 }
        ];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Orders");
        XLSX.writeFile(wb, `RichNBites_Orders_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const StatusBadge = ({ status }: { status: string }) => {
        let style = "";
        let Icon = Clock;

        switch (status) {
            case 'Delivered': style = "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"; Icon = PackageCheck; break;
            case 'Shipped': style = "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20"; Icon = Truck; break;
            case 'Processing': style = "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20"; Icon = Clock; break;
            default: style = "bg-gray-50 text-gray-700 ring-1 ring-gray-600/20"; Icon = CheckCircle2;
        }

        return (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${style}`}>
                <Icon className="w-3 h-3 mr-1.5" />
                {status}
            </span>
        );
    };

    return (
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-8 relative overflow-hidden">

            {/* Search & Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-[#111111] tracking-tight mb-1">Orders Management</h2>
                    <p className="text-sm font-medium text-gray-500">Track and manage recent customer orders</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative group flex-1 md:w-64">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#c69f62] transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by ID or name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c69f62]/20 focus:border-[#c69f62]/50 w-full text-sm font-medium transition-all shadow-sm"
                        />
                    </div>
                    <button className="flex items-center px-4 py-2 bg-white border border-gray-200/80 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700 shadow-sm">
                        <Filter className="w-4 h-4 mr-2 text-gray-400" /> Filter
                    </button>

                    <div className="w-px h-6 bg-gray-200 mx-1 hidden md:block"></div>

                    <button
                        onClick={exportToExcel}
                        className="flex items-center px-5 py-2 bg-gradient-to-r from-[#1a1a1a] to-[#241612] text-white rounded-xl hover:from-[#c69f62] hover:to-[#8a4836] transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)] font-semibold text-sm hover:shadow-[0_4px_20px_rgba(198,159,98,0.3)]"
                    >
                        <Download className="w-4 h-4 mr-2" /> Export
                    </button>
                </div>
            </div>

            {/* Modern Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200/60 bg-white">
                            <th className="py-4 px-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest w-[120px]">Order ID</th>
                            <th className="py-4 px-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-4 w-[250px]">Customer</th>
                            <th className="py-4 px-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Product Summary</th>
                            <th className="py-4 px-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Amount</th>
                            <th className="py-4 px-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-8">Status</th>
                            <th className="py-4 px-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {filteredOrders.map((order, idx) => (
                            <tr key={order.id} className="border-b last:border-0 border-gray-100 hover:bg-[#fcf9f5]/50 transition-colors group">
                                <td className="py-4 px-2 text-[#241612] font-semibold text-sm font-mono tracking-tight">{order.id}</td>
                                <td className="py-4 px-2 pl-4">
                                    <div className="font-bold text-[#111111]">{order.customer}</div>
                                    <div className="text-xs text-gray-500 font-medium mt-0.5">{order.phone} • {order.address}</div>
                                </td>
                                <td className="py-4 px-2">
                                    <span className="font-semibold text-gray-700 bg-gray-50 px-2 py-1 rounded text-xs border border-gray-200/50">{order.product}</span>
                                </td>
                                <td className="py-4 px-2 font-bold text-[#111111] text-right text-sm">
                                    ₹{order.total.toLocaleString()}
                                </td>
                                <td className="py-4 px-2 pl-8">
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="py-4 px-2 text-right">
                                    <button className="p-2 text-gray-400 hover:text-[#c69f62] hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100 shadow-sm border border-transparent hover:border-gray-200">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredOrders.length === 0 && (
                    <div className="py-20 text-center flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-6 h-6 text-gray-300" />
                        </div>
                        <p className="text-gray-900 font-bold mb-1">No orders found</p>
                        <p className="text-gray-500 text-sm font-medium">Try adjusting your search query</p>
                    </div>
                )}
            </div>

        </div>
    );
}
