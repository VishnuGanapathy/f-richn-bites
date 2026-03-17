'use client';

import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { ALL_PRODUCTS, CATEGORY_IMAGES } from '@/data/products';

const initialProducts = ALL_PRODUCTS.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    basePrice: p.basePrice,
    stock: p.stock,
    status: p.status,
}));

export default function AdminProducts() {
    const [products, setProducts] = useState(initialProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<typeof initialProducts[0] | null>(null);
    const [newProduct, setNewProduct] = useState({ name: '', category: 'Bars', basePrice: '', stock: '' });
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (product: typeof initialProducts[0]) => {
        setEditingProduct(product);
        setNewProduct({ name: product.name, category: product.category, basePrice: String(product.basePrice), stock: String(product.stock) });
        setIsModalOpen(true);
    };

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        const stock = Number(newProduct.stock);
        const status = stock > 50 ? 'Active' : stock > 0 ? 'Low Stock' : 'Out of Stock';
        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id
                ? { ...p, name: newProduct.name, category: newProduct.category, basePrice: Number(newProduct.basePrice), stock, status }
                : p
            ));
        } else {
            const nextId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
            setProducts([...products, { id: nextId, name: newProduct.name, category: newProduct.category, basePrice: Number(newProduct.basePrice), stock, status }]);
        }
        setIsModalOpen(false);
        setEditingProduct(null);
        setNewProduct({ name: '', category: 'Bars', basePrice: '', stock: '' });
    };

    const handleDelete = (id: number) => {
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <>
            <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-4 sm:p-6 md:p-8">

                {/* Header & Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10 gap-4 sm:gap-6">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight mb-1">Product Catalog</h2>
                        <p className="text-xs sm:text-sm font-medium text-gray-500">Manage your premium chocolate inventory and pricing</p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative group flex-1 sm:w-64">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#c69f62] transition-colors" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="pl-9 pr-4 py-2 border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c69f62]/20 focus:border-[#c69f62]/50 w-full text-sm font-medium transition-all shadow-sm"
                            />
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center px-4 sm:px-5 py-2 bg-gradient-to-r from-[#c69f62] to-[#8a4836] text-white rounded-xl hover:shadow-[0_4px_20px_rgba(198,159,98,0.4)] transition-all duration-300 shadow-[0_4px_15px_rgba(198,159,98,0.2)] font-semibold text-sm hover:-translate-y-0.5 whitespace-nowrap"
                        >
                            <Plus className="w-4 h-4 mr-1.5" /> <span className="hidden sm:inline">Add Product</span><span className="sm:hidden">Add</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-[20px] sm:rounded-[24px] border border-gray-100 flex flex-col group relative overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#c69f62]/30 transition-all duration-300">

                            <div className="relative h-36 sm:h-44 bg-gradient-to-br from-[#fcf9f5] to-[#f4eee6] flex items-center justify-center overflow-hidden">
                                <div className="relative w-24 h-24 sm:w-32 sm:h-32 group-hover:scale-110 transition-transform duration-500">
                                    <Image
                                        src={CATEGORY_IMAGES[product.category] || '/images/hero_chocolate_bars_highq.png'}
                                        alt={product.name}
                                        fill
                                        className="object-contain drop-shadow-lg"
                                    />
                                </div>
                                <div className="absolute top-3 right-3 flex space-x-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <button onClick={() => handleEdit(product)} className="p-2 text-gray-400 hover:text-[#c69f62] bg-white rounded-lg shadow-sm border border-gray-100 transition-colors hover:border-[#c69f62]/30">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 bg-white rounded-lg shadow-sm border border-gray-100 transition-colors hover:border-red-200 hover:bg-red-50">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 flex flex-col flex-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#c69f62] mb-1 block">{product.category}</span>
                                <h3 className="text-lg sm:text-xl font-bold text-[#111111] mb-1 tracking-tight">{product.name}</h3>
                                <p className="text-gray-900 font-semibold mb-4 sm:mb-6 flex items-baseline gap-1">
                                    ₹ {product.basePrice} <span className="text-xs text-gray-400 font-medium tracking-normal line-through">₹ {product.basePrice + 100}</span>
                                </p>

                                <div className="pt-4 sm:pt-5 mt-auto border-t border-gray-100/80 flex justify-between items-center group-hover:border-gray-200 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Stock</span>
                                        <span className="font-bold text-[#111111] text-sm sm:text-base">{product.stock} Units</span>
                                    </div>
                                    <span className={`px-2 sm:px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest
                                        ${product.status === 'Active' ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/20' :
                                            product.status === 'Low Stock' ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-600/20' :
                                                'bg-rose-50 text-rose-600 ring-1 ring-rose-600/20'}`}>
                                        {product.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Product Card */}
                    <div onClick={() => setIsModalOpen(true)} className="bg-gray-50/50 rounded-[20px] sm:rounded-[24px] border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[260px] cursor-pointer hover:bg-[#fcf9f5]/50 hover:border-[#c69f62]/40 hover:text-[#c69f62] transition-all group">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#c69f62]">
                            <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="font-bold text-[#111111] group-hover:text-[#c69f62] transition-colors text-sm sm:text-base">Create New Product</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">Configure bases, toppings & variants</p>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#111111]/60 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => { setIsModalOpen(false); setEditingProduct(null); setNewProduct({ name: '', category: 'Bars', basePrice: '', stock: '' }); }}
                            className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-xl sm:text-2xl font-bold text-[#111111] mb-2 tracking-tight">{editingProduct ? 'Edit Product' : 'New Product'}</h3>
                        <p className="text-sm text-gray-500 mb-6 sm:mb-8">{editingProduct ? 'Update the product details below.' : 'Add a new premium chocolate to your catalog.'}</p>

                        <form onSubmit={handleAddProduct} className="space-y-4 sm:space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Product Name</label>
                                <input required type="text" placeholder="e.g. Signature Dark Bar" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c69f62] focus:ring-1 focus:ring-[#c69f62]/50 transition-all font-medium" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Category</label>
                                    <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c69f62] focus:ring-1 focus:ring-[#c69f62]/50 transition-all font-medium text-gray-700">
                                        <option>Bars</option>
                                        <option>Popsicle</option>
                                        <option>Bites</option>
                                        <option>Hampers</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Base Price (₹)</label>
                                    <input required type="number" placeholder="e.g. 499" value={newProduct.basePrice} onChange={(e) => setNewProduct({ ...newProduct, basePrice: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c69f62] focus:ring-1 focus:ring-[#c69f62]/50 transition-all font-bold text-[#111111]" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Initial Stock</label>
                                <input required type="number" placeholder="e.g. 150" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c69f62] focus:ring-1 focus:ring-[#c69f62]/50 transition-all font-medium text-gray-700" />
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="w-full py-3.5 sm:py-4 bg-[#3d241c] text-white rounded-xl font-bold tracking-wide hover:bg-[#c69f62] transition-colors shadow-lg shadow-[#3d241c]/20">
                                    {editingProduct ? 'Update Product' : 'Save Product to Catalog'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
