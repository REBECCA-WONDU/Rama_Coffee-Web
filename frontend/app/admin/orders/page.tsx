"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Search, Filter, Eye, CheckCircle, Clock, XCircle, Truck } from "lucide-react";

interface OrderItem {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
}

interface Order {
    id: number;
    customerId: number | null;
    guestName: string | null;
    guestPhone: string | null;
    guestAddress: string | null;
    totalAmount: number;
    status: string;
    createdAt: string;
    items: OrderItem[];
}

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/orders");
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId: number, status: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(status)
            });
            if (res.ok) {
                setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
            }
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Pending": return <Clock size={14} className="text-orange-500" />;
            case "Processing": return <Search size={14} className="text-blue-500" />;
            case "Shipped": return <Truck size={14} className="text-purple-500" />;
            case "Completed": return <CheckCircle size={14} className="text-green-500" />;
            case "Cancelled": return <XCircle size={14} className="text-red-500" />;
            default: return null;
        }
    };

    const filteredOrders = filter === "All" ? orders : orders.filter(o => o.status === filter);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h1 className="text-3xl font-playfair font-bold text-rama-dark">Order Management</h1>
                <p className="text-gray-500 mt-1">Manage and fulfillment for customer orders.</p>
            </header>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex gap-2">
                    {["All", "Pending", "Processing", "Shipped", "Completed"].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filter === s
                                    ? "bg-rama-gold text-rama-dark shadow-sm"
                                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-rama-gold w-full md:w-64"
                    />
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-400 font-medium">Loading orders...</div>
                ) : filteredOrders.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 font-medium whitespace-pre-wrap flex flex-col items-center gap-3">
                        <ShoppingBag size={48} className="opacity-20" />
                        No orders found matching your criteria.
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-sm font-bold text-rama-dark">#{order.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-semibold text-rama-dark">{order.guestName || "Customer #" + order.customerId}</div>
                                        <div className="text-xs text-gray-500">{order.guestPhone || "No Phone"}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-2 text-xs font-bold">
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-sm text-rama-dark">ETB {order.totalAmount.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                                className="text-xs border-gray-200 rounded-lg focus:ring-rama-gold bg-gray-50"
                                            >
                                                <option>Pending</option>
                                                <option>Processing</option>
                                                <option>Shipped</option>
                                                <option>Completed</option>
                                                <option>Cancelled</option>
                                            </select>
                                            <button className="p-2 text-gray-400 hover:text-rama-gold transition-colors">
                                                <Eye size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
