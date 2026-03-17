'use client';

import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, IndianRupee, ShoppingBag, TrendingUp, Users, MoreHorizontal } from 'lucide-react';
import { REVENUE_DATA, CATEGORY_SALES } from '@/data/products';

const StatCard = ({ title, value, icon: Icon, trend, positive, subtext }: any) => (
    <div className="bg-white p-4 sm:p-6 rounded-[20px] sm:rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden group">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-[#c69f62]/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        <div className="flex justify-between items-start mb-4 sm:mb-6 relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#fcf9f5] border border-[#c69f62]/20 text-[#c69f62] flex items-center justify-center group-hover:bg-[#c69f62] group-hover:text-white transition-colors duration-300"><Icon className="w-5 h-5 sm:w-6 sm:h-6" /></div>
            <button className="text-gray-400 hover:text-gray-900"><MoreHorizontal className="w-5 h-5" /></button>
        </div>
        <div className="relative z-10">
            <h3 className="text-gray-500 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-1">{title}</h3>
            <h4 className="text-2xl sm:text-4xl font-bold text-[#111111] tracking-tight mb-2">{value}</h4>
            <div className="flex items-center justify-between mt-3 sm:mt-4">
                <span className={`flex items-center text-xs sm:text-sm font-bold px-2 py-1 rounded-full ${positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {positive ? <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" /> : <ArrowDownRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />}
                    {trend}%
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium">{subtext}</span>
            </div>
        </div>
    </div>
);

export default function AdminDashboard() {
    return (
        <div className="space-y-6 sm:space-y-8 pb-10">

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard title="Total Revenue" value="₹2.4M" icon={IndianRupee} trend={18.5} positive={true} subtext="vs last month" />
                <StatCard title="Total Orders" value="3,842" icon={ShoppingBag} trend={12.4} positive={true} subtext="vs last month" />
                <StatCard title="Avg. Order Value" value="₹624" icon={TrendingUp} trend={4.1} positive={true} subtext="vs last month" />
                <StatCard title="Active Customers" value="1,294" icon={Users} trend={2.3} positive={false} subtext="vs last month" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Area Chart */}
                <div className="bg-white p-5 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] xl:col-span-2 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 relative z-10 gap-4">
                        <div>
                            <h3 className="text-[#111111] font-bold text-lg sm:text-xl mb-1">Revenue Flow</h3>
                            <p className="text-xs sm:text-sm font-medium text-gray-500">Real-time revenue vs previous period</p>
                        </div>
                        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                            <button className="px-3 sm:px-4 py-1.5 text-xs font-bold rounded-lg text-gray-500 hover:text-gray-900 transition-colors">1D</button>
                            <button className="px-3 sm:px-4 py-1.5 text-xs font-bold rounded-lg bg-white text-[#111111] shadow-sm ring-1 ring-gray-200">7D</button>
                            <button className="px-3 sm:px-4 py-1.5 text-xs font-bold rounded-lg text-gray-500 hover:text-gray-900 transition-colors">1M</button>
                            <button className="px-3 sm:px-4 py-1.5 text-xs font-bold rounded-lg text-gray-500 hover:text-gray-900 transition-colors">1Y</button>
                        </div>
                    </div>
                    <div className="h-[260px] sm:h-[340px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#c69f62" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#c69f62" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12, fontWeight: 500 }} dy={15} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12, fontWeight: 500 }} dx={-10} tickFormatter={(val) => `₹${val / 1000}k`} />
                                <Tooltip
                                    cursor={{ stroke: '#c69f62', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    contentStyle={{ borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 10px 30px -5px rgb(0 0 0 / 0.1)', padding: '12px 20px' }}
                                    itemStyle={{ fontWeight: 600 }}
                                    formatter={(value: number | undefined) => [`₹${value?.toLocaleString() || 0}`, 'Revenue']}
                                />
                                <Area type="monotone" dataKey="current" name="Current Week" stroke="#c69f62" strokeWidth={3} fillOpacity={1} fill="url(#colorCurrent)" activeDot={{ r: 6, strokeWidth: 0, fill: '#c69f62' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="bg-white p-5 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col">
                    <div className="mb-6 sm:mb-8">
                        <h3 className="text-[#111111] font-bold text-lg sm:text-xl mb-1">Top Selling Categories</h3>
                        <p className="text-xs sm:text-sm font-medium text-gray-500">Revenue split by product type</p>
                    </div>
                    <div className="flex-1 w-full min-h-[260px] sm:min-h-[340px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={CATEGORY_SALES} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#111', fontSize: 12, fontWeight: 600 }} width={100} />
                                <Tooltip
                                    cursor={{ fill: '#fcf9f5', radius: 8 }}
                                    contentStyle={{ borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 10px 30px -5px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value: number | undefined) => [`₹${((value || 0) / 1000).toFixed(1)}k`, 'Sales']}
                                />
                                <Bar dataKey="sales" fill="#1a1a1a" radius={[0, 8, 8, 0]} barSize={22}>
                                    {CATEGORY_SALES.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#c69f62' : '#1a1a1a'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
