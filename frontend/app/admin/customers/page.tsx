"use client";

import { useEffect, useState } from "react";
import { Users, Mail, Phone, Calendar, Search } from "lucide-react";

interface Customer {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
}

export default function AdminCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/customers");
            const data = await res.json();
            setCustomers(data);
        } catch (err) {
            console.error("Failed to fetch customers:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header>
                <h1 className="text-3xl font-playfair font-bold text-rama-dark">Customer Base</h1>
                <p className="text-gray-500 mt-1">Manage your customer relationships and view community growth.</p>
            </header>

            {/* Toolbar */}
            <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search customers by name, email or phone..."
                        className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-rama-gold w-full"
                    />
                </div>
            </div>

            {/* Customer List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-400 font-medium">Loading customers...</div>
                ) : customers.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">No customers found.</div>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Contact Information</th>
                                <th className="px-6 py-4">Joined Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-rama-gold text-rama-dark flex items-center justify-center font-bold">
                                                {customer.fullName.charAt(0)}
                                            </div>
                                            <div className="text-sm font-bold text-rama-dark">{customer.fullName}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 space-y-1">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Mail size={14} className="text-gray-400" />
                                            {customer.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone size={14} className="text-gray-400" />
                                            {customer.phoneNumber}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar size={14} className="text-gray-400" />
                                            {new Date(customer.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-sm font-bold text-rama-gold hover:text-rama-dark transition-colors">
                                            View Profile
                                        </button>
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
