"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send, ExternalLink, Loader2, HelpCircle, ChevronDown, ChevronUp, Facebook, Instagram, Twitter } from "lucide-react";
import { store } from "@/lib/store";

export function ContactForm() {
    const searchParams = useSearchParams()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(null)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
    })

    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000)
        return () => clearInterval(timer)
    }, [])

    const getStoreStatus = () => {
        const hour = currentTime.getHours()
        if (hour >= 8 && hour < 23) {
            return { status: "Open Now", color: "text-emerald-500" }
        }
        return { status: "Closed", color: "text-rose-500" }
    }

    const storeStatus = getStoreStatus()

    useEffect(() => {
        const subject = searchParams.get("subject")
        const message = searchParams.get("message")
        if (subject || message) {
            setFormData(prev => ({
                ...prev,
                subject: subject || prev.subject,
                message: message || prev.message
            }))
        }
    }, [searchParams])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Save to store
        store.saveInquiry({
            id: `INQ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            date: new Date().toISOString(),
            status: "New"
        })

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsLoading(false)
        setIsSubmitted(true)
    }

    const faqs = [
        {
            q: "How can I track my order?",
            a: "Once your order is dispatched, you'll receive a tracking link via SMS and email. You can also track it from your dashboard."
        },
        {
            q: "Do you deliver medicines 24/7?",
            a: "Yes, we provide 24/7 home delivery for all essential medicines across Gurgaon."
        },
        {
            q: "How do I book a lab test?",
            a: "You can browse lab tests under the 'Lab Tests' menu and book directly. For assistance, you can call our support line."
        }
    ]

    if (isSubmitted) {
        return (
            <div className="container px-4 py-24 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-inner">
                    <CheckCircle2 className="h-12 w-12" />
                </div>
                <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Message Sent Successfully!</h1>
                <p className="text-gray-500 max-w-md font-medium text-lg mb-10 leading-relaxed">
                    Thank you for reaching out to VrindaCare. A dedicated health consultant will review your query and get back to you within 2-4 hours.
                </p>
                <div className="flex gap-4">
                    <Button onClick={() => setIsSubmitted(false)} variant="outline" className="h-12 px-8 rounded-xl font-bold">Send Another</Button>
                    <Button className="h-12 px-8 rounded-xl font-bold" onClick={() => window.location.href = "/"}>Back to Home</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            <div className="container px-4 md:px-6 py-16">
                <div className="flex flex-col items-center text-center space-y-6 mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        We're here to help 24/7
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900">
                        Get in <span className="text-emerald-600">Touch</span>
                    </h1>
                    <p className="text-gray-500 max-w-[700px] font-medium text-lg md:text-xl leading-relaxed">
                        Have questions about medicines, orders, or lab tests? Our expert medical team is ready to assist you anytime.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
                    {/* Contact Information Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <Card className="rounded-[2rem] border-none shadow-xl shadow-gray-200/50 overflow-hidden bg-white">
                            <CardHeader className="bg-emerald-600 text-white p-8">
                                <CardTitle className="text-2xl font-bold">Contact Details</CardTitle>
                                <CardDescription className="text-emerald-100 font-medium opacity-90">
                                    Direct channels to reach our team fast.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <a href="https://www.google.com/maps/dir//Branda+medical+store,+Mandal+pal+singh+ahata,+GT+Rd,+Kurawali,+Uttar+Pradesh+205265/@27.3966942,78.9649472,210m/data=!3m1!1e3!4m16!1m7!3m6!1s0x3975a10028df3a4d:0x6fd4d1bd6e9688d0!2sBranda+medical+store!8m2!3d27.3966942!4d78.9655909!16s%2Fg%2F11n44vwk17!4m7!1m0!1m5!1m1!1s0x3975a10028df3a4d:0x6fd4d1bd6e9688d0!2m2!1d78.9655909!2d27.3966942?entry=ttu" target="_blank" className="flex items-start gap-5 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-900">Main Pharmacy</h3>
                                            <ExternalLink className="h-3 w-3 text-gray-300 group-hover:text-emerald-500" />
                                        </div>
                                        <p className="text-gray-500 text-sm font-medium leading-relaxed mt-1">
                                            Mandal Pal Singh Ahata, GT Rd,<br />Kurawali, Uttar Pradesh 205265
                                        </p>
                                    </div>
                                </a>

                                <a href="tel:+919876543210" className="flex items-start gap-5 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Phone Support</h3>
                                        <p className="text-emerald-600 text-lg font-black mt-0.5">+91 98765 43210</p>
                                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1 bg-emerald-50 inline-block px-2 py-0.5 rounded">Active 24/7</p>
                                    </div>
                                </a>

                                <a href="mailto:support@vrindacare.com" className="flex items-start gap-5 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Email Query</h3>
                                        <p className="text-gray-500 text-sm font-medium mt-1">support@vrindacare.com</p>
                                    </div>
                                </a>
                            </CardContent>
                        </Card>

                        <Card className="rounded-[2rem] border-none shadow-xl shadow-gray-200/50 bg-white">
                            <CardHeader className="p-8 pb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-emerald-600">
                                            <Clock className="h-5 w-5" />
                                        </div>
                                        <CardTitle className="text-lg font-bold">Store Hours</CardTitle>
                                    </div>
                                    <div className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-50 ${storeStatus.color}`}>
                                        {storeStatus.status}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 pt-4">
                                <ul className="space-y-4">
                                    {[
                                        { label: "Retail Outlet", time: "8 AM - 11 PM" },
                                        { label: "Home Delivery", time: "24 Hours", special: true },
                                        { label: "Lab Collection", time: "6 AM - 8 PM" }
                                    ].map((item, i) => (
                                        <li key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                            <span className="text-gray-400 text-xs font-black uppercase tracking-tighter">{item.label}</span>
                                            <span className={`text-sm font-bold ${item.special ? "text-emerald-500 italic" : "text-gray-700"}`}>{item.time}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <div className="flex justify-center gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <button key={i} className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:shadow-lg transition-all">
                                    <Icon className="h-5 w-5" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form Main */}
                    <Card className="lg:col-span-8 rounded-[3rem] border-none shadow-2xl shadow-gray-200/50 p-4 md:p-10 bg-white">
                        <CardHeader className="pb-10">
                            <CardTitle className="text-3xl md:text-4xl font-black text-gray-900">Send us a Message</CardTitle>
                            <CardDescription className="text-lg font-medium text-gray-500 mt-2">
                                We'll analyze your query and get back with a solution.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">First Name</label>
                                        <Input
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="h-16 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-emerald-500/20 transition-all text-base px-6 font-medium"
                                            placeholder="Rahul" required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Last Name</label>
                                        <Input
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="h-16 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-emerald-500/20 transition-all text-base px-6 font-medium"
                                            placeholder="Sharma" required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Email Address</label>
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="h-16 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-emerald-500/20 transition-all text-base px-6 font-medium"
                                            placeholder="rahul@example.com" required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Subject</label>
                                        <Input
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="h-16 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-emerald-500/20 transition-all text-base px-6 font-medium"
                                            placeholder="How can we help?" required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Message</label>
                                        <span className={`text-[10px] font-bold ${formData.message.length > 500 ? "text-rose-500" : "text-gray-300"}`}>
                                            {formData.message.length}/500
                                        </span>
                                    </div>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value.slice(0, 500) })}
                                        className="flex w-full rounded-[2rem] border border-gray-100 bg-gray-50/50 px-6 py-5 text-base shadow-sm focus:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/10 min-h-[180px] transition-all font-medium leading-relaxed"
                                        placeholder="Tell us more about your requirement..."
                                        required
                                    ></textarea>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-18 rounded-2xl text-xl font-black shadow-xl shadow-emerald-200/50 group hover:shadow-emerald-400/40 active:scale-[0.98] transition-all bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                                            Sending Message...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-6 w-6 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                                <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    Guaranteed response within 24 hours
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto mt-32 space-y-12 mb-20">
                    <div className="text-center space-y-3">
                        <div className="flex items-center justify-center gap-2 text-emerald-600">
                            <HelpCircle className="h-6 w-6" />
                            <h2 className="text-3xl font-black text-gray-900 underline decoration-emerald-200 decoration-8 underline-offset-4">Quick Help</h2>
                        </div>
                        <p className="text-gray-500 font-medium">Common questions answered for you.</p>
                    </div>

                    <div className="grid gap-4">
                        {faqs.map((faq, i) => (
                            <Card
                                key={i}
                                className="rounded-[1.5rem] border-none shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden group"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <CardHeader className="p-6">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className={`text-lg font-bold transition-colors ${openFaq === i ? "text-emerald-600" : "text-gray-900 group-hover:text-emerald-500"}`}>
                                            {faq.q}
                                        </CardTitle>
                                        {openFaq === i ? <ChevronUp className="h-5 w-5 text-emerald-600" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                                    </div>
                                    {openFaq === i && (
                                        <div className="mt-4 text-gray-500 font-medium leading-relaxed animate-in slide-in-from-top-2 duration-300">
                                            {faq.a}
                                        </div>
                                    )}
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
