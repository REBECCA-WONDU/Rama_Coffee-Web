
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contact" className="bg-rama-dark border-t border-rama-gold/20 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-rama-cream">Rama Coffee <span className="text-sm block font-serif text-rama-gold">ራማ ቡና</span></h3>
                        <p className="text-rama-cream/60 text-sm leading-relaxed">
                            Located in Addis Ababa, we bring you the heart of Ethiopian coffee culture through our traditional brews and social café atmosphere.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-rama-gold">Visit Us</h4>
                        <div className="space-y-2 text-rama-cream/80 text-sm">
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-rama-gold mt-1 flex-shrink-0" />
                                <span>Yerer Alemayehue area (የረር አለማየሁ ህንፃ ዝቅ ብሎ), Addis Ababa, Ethiopia</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-rama-gold" />
                                <span>+251 911 234 567</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-rama-gold" />
                                <span>info@ramacoffee.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold text-rama-gold">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 border border-rama-cream/20 rounded-full text-rama-cream hover:bg-rama-gold hover:text-rama-dark transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="p-2 border border-rama-cream/20 rounded-full text-rama-cream hover:bg-rama-gold hover:text-rama-dark transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="p-2 border border-rama-cream/20 rounded-full text-rama-cream hover:bg-rama-gold hover:text-rama-dark transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-rama-cream/10 text-center text-rama-cream/40 text-sm">
                    <p>&copy; {new Date().getFullYear()} Rama Coffee. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
