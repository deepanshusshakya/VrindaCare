"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Beaker, Activity, Heart, FileText, CheckCircle2, ShieldCheck, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

const labTests = [
    {
        id: "1",
        title: "Full Body Checkup",
        description: "Comprehensive health assessment including blood, glucose, and lipid profile.",
        price: 2499,
        icon: Activity,
        color: "blue"
    },
    {
        id: "2",
        title: "Diabetes Screening",
        description: "HbA1c and Fasting, PP Blood Sugar tests with consultant review.",
        price: 999,
        icon: Beaker,
        color: "green"
    },
    {
        id: "3",
        title: "Heart Health Package",
        description: "Cholesterol, ECG, and Cardiac Risk Markers for complete peace of mind.",
        price: 3499,
        icon: Heart,
        color: "red"
    },
    {
        id: "4",
        title: "Vitamin Profile",
        description: "Vitamin D, B12, and Calcium levels check for optimal bone health.",
        price: 1499,
        icon: FileText,
        color: "purple"
    },
]

export default function LabTestsPage() {
    const router = useRouter()

    const handleBookTest = (test: typeof labTests[0]) => {
        router.push(`/contact?subject=Lab Test Booking: ${encodeURIComponent(test.title)}&message=I would like to book the ${test.title} package for ₹${test.price}.`)
    }

    return (
        <div className="bg-gray-50/50 min-h-screen">
            <div className="container px-4 md:px-6 py-16">
                <div className="flex flex-col items-center text-center space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-2">
                        <ShieldCheck className="h-4 w-4" /> NABL Accredited Labs
                    </div>
                    <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl text-gray-900">
                        Diagnostic <span className="text-primary">Lab Tests</span>
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl font-medium">
                        Book trusted lab tests and health checkups from the comfort of your home with free sample collection.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {labTests.map((test) => (
                        <Card key={test.id} className="flex flex-col border-2 border-transparent hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-xl group rounded-3xl overflow-hidden bg-white">
                            <CardHeader className="pb-4">
                                <div className={`w-14 h-14 rounded-2xl bg-${test.color}-50 text-${test.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-${test.color}-100`}>
                                    <test.icon className="h-7 w-7" />
                                </div>
                                <CardTitle className="text-xl font-bold text-gray-900">{test.title}</CardTitle>
                                <CardDescription className="text-sm font-medium text-gray-500 leading-relaxed mt-2">{test.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pt-4">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-primary">₹{test.price.toLocaleString()}</span>
                                    <span className="text-xs font-bold text-gray-400 uppercase">all inclusive</span>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0 pb-8">
                                <Button className="w-full h-12 rounded-xl text-md font-bold shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-95 transition-all" onClick={() => handleBookTest(test)}>Book Now</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* How it works */}
                <section className="mt-24">
                    <div className="bg-white rounded-[40px] shadow-sm border p-12 md:p-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <Activity className="h-64 w-64 text-primary" />
                        </div>
                        <h2 className="text-3xl font-black text-center mb-16 text-gray-900 flex items-center justify-center gap-3">
                            <div className="h-2 w-12 bg-primary rounded-full hidden md:block" />
                            How it Works
                            <div className="h-2 w-12 bg-primary rounded-full hidden md:block" />
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
                            {[
                                { step: "01", title: "Select Test", desc: "Choose your health package and fill in details.", icon: FileText },
                                { step: "02", title: "Home Visit", desc: "Our certified specialist collects samples at your preferred time.", icon: MapPin },
                                { step: "03", title: "Smart Reports", desc: "Get accurate digital reports via email & app within 24 hours.", icon: CheckCircle2 },
                            ].map((s, i) => (
                                <div key={i} className="flex flex-col items-center text-center group">
                                    <div className="w-20 h-20 rounded-3xl bg-gray-50 border flex items-center justify-center mb-8 relative group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <s.icon className="h-8 w-8" />
                                        <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white border shadow-sm flex items-center justify-center text-xs font-black text-primary group-hover:scale-110 transition-all font-mono italic">
                                            {s.step}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                                    <p className="text-gray-500 font-medium leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
