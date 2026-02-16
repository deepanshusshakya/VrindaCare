"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Beaker, Activity, Heart, FileText } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const labTests = [
    {
        id: "1",
        title: "Full Body Checkup",
        description: "Comprehensive health assessment including blood, glucose, and lipid profile.",
        price: 49.99,
        icon: Activity,
    },
    {
        id: "2",
        title: "Diabetes Screening",
        description: "HbA1c and Fasting, PP Blood Sugar tests.",
        price: 19.99,
        icon: Beaker,
    },
    {
        id: "3",
        title: "Heart Health Package",
        description: "Cholesterol, ECG, and Cardiac Risk Markers.",
        price: 59.99,
        icon: Heart,
    },
    {
        id: "4",
        title: "Vitamin Profile",
        description: "Vitamin D, B12, and Calcium levels check.",
        price: 29.99,
        icon: FileText,
    },
]

export default function LabTestsPage() {
    const router = useRouter()

    const handleBookTest = (test: typeof labTests[0]) => {
        // You can redirect to a booking page or show a modal
        // For now, we'll redirect to contact page with test info
        router.push(`/contact?test=${encodeURIComponent(test.title)}&price=${test.price}`)
    }
    return (
        <div className="container px-4 md:px-6 py-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Diagnostic Lab Tests</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Book trusted lab tests and health checkups from the comfort of your home.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {labTests.map((test) => (
                    <Card key={test.id} className="flex flex-col">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                                <test.icon className="h-6 w-6" />
                            </div>
                            <CardTitle>{test.title}</CardTitle>
                            <CardDescription>{test.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="text-2xl font-bold text-primary">${test.price.toFixed(2)}</div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleBookTest(test)}>Book Now</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* How it works */}
            <section className="mt-16 bg-muted/30 rounded-xl p-8 md:p-12">
                <h2 className="text-2xl font-bold text-center mb-8">How it Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-2">
                        <div className="font-bold text-xl mb-2">1. Book Test</div>
                        <p className="text-muted-foreground">Select your package and schedule a visit.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="font-bold text-xl mb-2">2. Sample Collection</div>
                        <p className="text-muted-foreground">Our certified phlebotomist collects samples from your home.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="font-bold text-xl mb-2">3. Digital Report</div>
                        <p className="text-muted-foreground">Receive accurate reports via email within 24 hours.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
