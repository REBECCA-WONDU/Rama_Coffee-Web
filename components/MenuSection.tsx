
import { Coffee } from "lucide-react";

const menuItems = [
    { name: "Espresso", price: "45 ETB", desc: "Rich and intense single shot" },
    { name: "Macchiato", price: "55 ETB", desc: "Espresso with a dash of foam" },
    { name: "Cappuccino", price: "70 ETB", desc: "Equal parts espresso, milk, foam" },
    { name: "Ethiopian Traditional", price: "60 ETB", desc: "Ceremonial brew served in clay pot" },
    { name: "Latte", price: "75 ETB", desc: "Espresso with steamed milk" },
    { name: "Mocha", price: "85 ETB", desc: "Espresso, chocolate, steamed milk" },
];

export default function MenuSection() {
    return (
        <section id="menu" className="py-24 bg-rama-dark text-rama-cream relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-rama-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-rama-green/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Café Menu</h2>
                    <div className="w-24 h-1 bg-rama-gold mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                    {menuItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-end border-b border-rama-cream/10 pb-4 group hover:border-rama-gold/50 transition-colors">
                            <div>
                                <h4 className="text-xl font-bold group-hover:text-rama-gold transition-colors">{item.name}</h4>
                                <p className="text-rama-cream/50 text-sm mt-1">{item.desc}</p>
                            </div>
                            <div className="text-2xl font-serif font-bold text-rama-gold">{item.price}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="border border-rama-gold text-rama-gold px-8 py-3 rounded-full hover:bg-rama-gold hover:text-rama-dark transition-colors font-semibold">
                        View Full Menu
                    </button>
                </div>
            </div>
        </section>
    );
}
