
import Image from "next/image";

export default function StorySection() {
    return (
        <section id="our-story" className="py-20 bg-rama-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl group">
                        <Image
                            src="/highlands-coffee.png"
                            alt="Ethiopian Coffee Highlands"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-rama-dark/10 group-hover:bg-transparent transition-colors duration-500"></div>
                        <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <p className="text-white text-sm font-bold uppercase tracking-widest">Our Heritage</p>
                            <p className="text-white/80 text-xs mt-1 italic">Highlands of Sidamo, Ethiopia</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold text-rama-dark">Our Story</h2>
                        <div className="w-20 h-1 bg-rama-gold"></div>
                        <p className="text-lg text-rama-dark/80 leading-relaxed">
                            Rama Coffee is a local coffee shop located in Addis Ababa, Ethiopia. It is a casual café popular among locals and visitors for enjoying traditional Ethiopian coffee and light refreshments in a relaxed setting.
                        </p>
                        <p className="text-lg text-rama-dark/80 leading-relaxed">
                            Riders and guests can expect typical Ethiopian coffee culture, which emphasises brewed coffee alongside a social atmosphere. Our café in Addis Ababa features a welcoming restaurant setting that serves both great food and exceptional coffee.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
