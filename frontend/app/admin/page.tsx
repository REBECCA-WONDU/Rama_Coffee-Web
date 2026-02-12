"use client";

import { ShoppingBag, Coffee, Users, TrendingUp, DollarSign } from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        { name: "Total Revenue", value: "ETB 45,200", icon: DollarSign, change: "+12.5%", color: "text-green-600", bg: "bg-green-100" },
        { name: "Active Orders", value: "24", icon: ShoppingBag, change: "+3 today", color: "text-blue-600", bg: "bg-blue-100" },
        { name: "Total Products", value: "12", icon: Coffee, change: "2 new", color: "text-orange-600", bg: "bg-orange-100" },
        { name: "Total Customers", value: "156", icon: Users, change: "+48 this month", color: "text-purple-600", bg: "bg-purple-100" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-playfair font-bold text-rama-dark">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back. Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                        Download Report
                    </button>
                    <button className="px-4 py-2 bg-rama-dark text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
                        View Analytics
                    </button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon size={24} className={stat.color} />
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.bg} ${stat.color}`}>
                                {stat.change}
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                            <p className="text-2xl font-bold text-rama-dark mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts / Recent Activity Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-rama-dark mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-rama-gold" />
                        Revenue Trends
                    </h2>
                    <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-medium italic">Chart Visualization Implementation</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-rama-dark mb-6 flex items-center gap-2">
                        <ShoppingBag size={20} className="text-rama-gold" />
                        Recent Orders
                    </h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((order) => (
                            <div key={order} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-rama-cream flex items-center justify-center text-rama-dark font-bold">
                                        #{order}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-rama-dark">Customer Name</p>
                                        <p className="text-xs text-gray-500">2 mins ago • 3 Items</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-rama-dark">ETB 1,250</p>
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-blue-500">Processing</span>
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-2 text-sm font-semibold text-rama-gold hover:text-rama-dark transition-colors mt-2">
                            View All Orders
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
