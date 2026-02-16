import Link from "next/link"
import { Pill, Phone, Mail, MapPin } from "lucide-react"

export function SiteFooter() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container mx-auto px-4 py-10 md:px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-primary text-xl">
                            <Pill className="h-6 w-6" />
                            <span>VrindaCare</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Your trusted partner for health and wellness. High-quality medicines delivered to your doorstep.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/products" className="hover:text-primary">Browse Medicines</Link></li>
                            <li><Link href="/blog" className="hover:text-primary">Health Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/category/personal-care" className="hover:text-primary">Personal Care</Link></li>
                            <li><Link href="/category/baby-care" className="hover:text-primary">Baby Care</Link></li>
                            <li><Link href="/category/nutrition" className="hover:text-primary">Nutrition & Fitness</Link></li>
                            <li><Link href="/category/devices" className="hover:text-primary">Healthcare Devices</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>support@vrindacare.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>123 Health Dr, Wellness City</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} VrindaCare. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
