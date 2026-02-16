import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="container px-4 md:px-6 py-12">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">About VrindaCare</h1>
                    <p className="text-xl text-muted-foreground">
                        Your trusted partner in health and wellness, delivering genuine medicines since 2024.
                    </p>
                </div>

                <div className="prose prose-lg dark:prose-invert mx-auto">
                    <p>
                        At VrindaCare, we believe that access to healthcare should be simple, affordable, and transparent.
                        We started with a mission to make essential medicines accessible to everyone, regardless of their location.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                    <div className="bg-muted/50 p-8 rounded-xl">
                        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                        <p className="text-muted-foreground">
                            To revolutionize healthcare delivery by providing genuine medicines, expert advice, and comprehensive wellness solutions at your fingertips.
                        </p>
                    </div>
                    <div className="bg-muted/50 p-8 rounded-xl">
                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <p className="text-muted-foreground">
                            To become the world&apos;s most trusted online pharmacy, known for quality, reliability, and customer-centric service.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-center">Why Choose Us?</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            "100% Genuine Medicines directly from manufacturers",
                            "Wide range of healthcare and wellness products",
                            "Fast and reliable delivery across the country",
                            "Secure payment options and prescription verification",
                            "24/7 Customer Support for all your queries",
                            "Easy returns and refund policy"
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-center pt-8">
                    <Button size="lg" asChild>
                        <Link href="/contact">Contact Us</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
