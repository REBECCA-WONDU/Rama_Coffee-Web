"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Coffee, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Orders", icon: ShoppingBag, href: "/admin/orders" },
    { name: "Products", icon: Coffee, href: "/admin/products" },
    { name: "Customers", icon: Users, href: "/admin/customers" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-rama-dark font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-rama-dark text-white flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-playfair text-2xl font-bold tracking-tight text-rama-gold">
              RAMA<span className="text-white">COFFEE</span>
            </span>
          </Link>
          <p className="text-xs text-white/50 mt-1 uppercase tracking-widest font-medium">Admin Portal</p>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? "bg-rama-gold text-rama-dark font-semibold shadow-lg shadow-rama-gold/20" 
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={20} className={isActive ? "text-rama-dark" : "text-white/40 group-hover:text-white/70"} />
                <span>{item.name}</span>
                {isActive && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
