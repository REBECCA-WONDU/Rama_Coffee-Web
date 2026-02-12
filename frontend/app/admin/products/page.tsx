"use client";

import { useEffect, useState } from "react";
import { Coffee, Plus, Search, Edit2, Trash2, Camera, X } from "lucide-react";

interface Product {
    id: number;
    name: string;
    roast: string;
    price: number;
    currency: string;
    stockQuantity: number;
    isActive: boolean;
    image: string;
    notes: string;
    description: string;
}

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState<Partial<Product>>({
        name: "",
        roast: "Medium Roast",
        price: 0,
        currency: "ETB",
        stockQuantity: 100,
        isActive: true,
        image: "",
        notes: "",
        description: ""
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Failed to fetch products:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct)
            });
            if (res.ok) {
                setIsModalOpen(false);
                fetchProducts();
                setNewProduct({
                    name: "",
                    roast: "Medium Roast",
                    price: 0,
                    currency: "ETB",
                    stockQuantity: 100,
                    isActive: true,
                    image: "",
                    notes: "",
                    description: ""
                });
            }
        } catch (err) {
            console.error("Failed to add product:", err);
        }
    };

    const deleteProduct = async (id: number) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "DELETE"
            });
            if (res.ok) fetchProducts();
        } catch (err) {
            console.error("Failed to delete product:", err);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-playfair font-bold text-rama-dark">Product Catalog</h1>
                    <p className="text-gray-500 mt-1">Add, edit, and manage your premium coffee selections.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-rama-dark text-white rounded-xl font-semibold hover:bg-opacity-90 transition-all shadow-lg shadow-rama-dark/10"
                >
                    <Plus size={20} />
                    Add New Product
                </button>
            </header>

            {/* Toolbar */}
            <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search catalog by name or roast..."
                        className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-rama-gold w-full"
                    />
                </div>
            </div>

            {/* Product List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    <div className="col-span-full py-12 text-center text-gray-400 font-medium">Loading catalog...</div>
                ) : products.map((product) => (
                    <div key={product.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className="aspect-square bg-gray-100 relative overflow-hidden">
                            {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Coffee size={48} className="text-gray-200" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button className="p-3 bg-white text-rama-dark rounded-full hover:bg-rama-gold transition-colors">
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => deleteProduct(product.id)}
                                    className="p-3 bg-white text-red-500 rounded-full hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <div className="absolute top-3 left-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest bg-white/90 backdrop-blur px-2 py-1 rounded-md text-rama-dark">
                                    {product.roast}
                                </span>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start">
                                <h3 className="font-playfair font-bold text-lg text-rama-dark truncate mr-2" title={product.name}>{product.name}</h3>
                                <p className="font-bold text-rama-gold shrink-0">ETB {product.price}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-[32px]">{product.description}</p>
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                                <span className="text-xs font-medium text-gray-400">Stock: {product.stockQuantity}</span>
                                <span className={`w-2 h-2 rounded-full ${product.isActive ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-gray-300"}`}></span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-rama-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden">
                        <header className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-2xl font-playfair font-bold text-rama-dark">Add New Premium Blend</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </header>

                        <form onSubmit={handleAddProduct} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Product Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        placeholder="e.g. Sidama Reserve"
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-rama-gold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Roast Profile</label>
                                    <select
                                        value={newProduct.roast}
                                        onChange={(e) => setNewProduct({ ...newProduct, roast: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-rama-gold"
                                    >
                                        <option>Light Roast</option>
                                        <option>Medium Roast</option>
                                        <option>Medium-Dark Roast</option>
                                        <option>Dark Roast</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Price (ETB)</label>
                                    <input
                                        required
                                        type="number"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-rama-gold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Stock Quantity</label>
                                    <input
                                        required
                                        type="number"
                                        value={newProduct.stockQuantity}
                                        onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: parseInt(e.target.value) })}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-rama-gold"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Image URL</label>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={newProduct.image}
                                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                        placeholder="https://..."
                                        className="flex-1 px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-rama-gold"
                                    />
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 overflow-hidden">
                                        {newProduct.image ? <img src={newProduct.image} className="w-full h-full object-cover" /> : <Camera size={20} />}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Description</label>
                                <textarea
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                    rows={3}
                                    placeholder="Detailed description of the flavor profile..."
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-rama-gold resize-none"
                                />
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-4 bg-rama-dark text-white rounded-2xl font-bold hover:bg-opacity-90 transition-all shadow-xl shadow-rama-dark/20"
                                >
                                    Confirm & Publish
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
