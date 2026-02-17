"use client"

import { useState } from "react"
import { useCart } from "@/components/providers/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, CreditCard, Truck, QrCode } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { store } from "@/lib/store"

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart()
    const router = useRouter()
    const [orderId, setOrderId] = useState("")
    const [isOrdered, setIsOrdered] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod")
    const [onlineSubMethod, setOnlineSubMethod] = useState<"upi" | "card" | "netbanking">("upi")
    const [upiPaymentType, setUpiPaymentType] = useState<"id" | "qr">("id")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        phone: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)

        // Generate Order ID
        const newId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`
        setOrderId(newId)

        // Save to store
        store.saveOrder({
            id: newId,
            customer: formData.name,
            items: items,
            total: total,
            status: "Processing",
            date: "Just now",
            paymentMethod: paymentMethod === "cod" ? "COD" : getSubMethodLabel(),
            shippingAddress: `${formData.address}, ${formData.city}`
        })

        // Simulate network delay/payment processing
        const processTime = paymentMethod === "online" ? 4000 : 1500;

        setTimeout(() => {
            setIsProcessing(false)
            setIsOrdered(true)
            clearCart()
        }, processTime)
    }

    const getSubMethodLabel = () => {
        if (onlineSubMethod === "upi") return upiPaymentType === "qr" ? "UPI QR" : "UPI"
        if (onlineSubMethod === "card") return "Card"
        if (onlineSubMethod === "netbanking") return "Net Banking"
        return ""
    }

    if (isProcessing) {
        return (
            <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                    <CreditCard className="absolute inset-0 m-auto h-10 w-10 text-primary animate-pulse" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">
                        {paymentMethod === "online"
                            ? `Verifying ${getSubMethodLabel()} Payment...`
                            : "Confirming Order..."}
                    </h2>
                    <p className="text-muted-foreground">Please do not refresh or close the page.</p>
                </div>
            </div>
        )
    }

    if (isOrdered) {
        return (
            <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Your medicines are being prepared and will be delivered within 24-48 hours.
                        Order ID: #{orderId}
                    </p>
                    {paymentMethod === "online" && (
                        <p className="text-sm font-medium text-green-600">Payment Status: Confirmed ({getSubMethodLabel()})</p>
                    )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button asChild>
                        <Link href="/dashboard">View My Orders</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="container flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
                <Button asChild>
                    <Link href="/products">Browse products</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container px-4 py-8">
            <Link href="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cart
            </Link>

            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold flex items-center">
                            <Truck className="mr-2 h-5 w-5 text-primary" />
                            Shipping Details
                        </h2>
                        <form onSubmit={handleSubmit} id="checkout-form" className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Full Name</label>
                                    <Input required name="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email Address</label>
                                    <Input required type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Shipping Address</label>
                                <Input required name="address" placeholder="123 Wellness St" value={formData.address} onChange={handleInputChange} />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">City</label>
                                    <Input required name="city" placeholder="Healthcare City" value={formData.city} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone Number</label>
                                    <Input required type="tel" name="phone" placeholder="+91 99999 99999" value={formData.phone} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="pt-10 scroll-mt-24" id="payment-section">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-black text-gray-900 flex items-center">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mr-3">
                                            <CreditCard className="h-5 w-5" />
                                        </div>
                                        Payment Method
                                    </h2>
                                    <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 border border-green-100">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        Secure Checkout
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div
                                        onClick={() => setPaymentMethod("cod")}
                                        className={`group relative p-6 border-2 rounded-[2rem] cursor-pointer transition-all duration-300 overflow-hidden ${paymentMethod === "cod"
                                            ? "border-primary bg-primary/[0.02] shadow-xl shadow-primary/10"
                                            : "border-gray-100 bg-white hover:border-primary/20 hover:shadow-lg"
                                            }`}
                                    >
                                        <div className="relative z-10">
                                            <div className={`w-12 h-12 rounded-2xl mb-4 flex items-center justify-center transition-all ${paymentMethod === "cod" ? "bg-primary text-white" : "bg-gray-50 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary"}`}>
                                                <Truck className="h-6 w-6" />
                                            </div>
                                            <p className="font-black text-gray-900 text-lg mb-1">Cash on Delivery</p>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Pay at your doorstep</p>
                                        </div>
                                        {paymentMethod === "cod" && (
                                            <div className="absolute top-4 right-4 text-primary">
                                                <CheckCircle2 className="h-6 w-6 fill-primary text-white" />
                                            </div>
                                        )}
                                        <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full transition-all duration-500 ${paymentMethod === "cod" ? "bg-primary/5 scale-150" : "bg-gray-50 scale-100 opacity-0 group-hover:opacity-100"}`} />
                                    </div>

                                    <div
                                        onClick={() => setPaymentMethod("online")}
                                        className={`group relative p-6 border-2 rounded-[2rem] cursor-pointer transition-all duration-300 overflow-hidden ${paymentMethod === "online"
                                            ? "border-primary bg-primary/[0.02] shadow-xl shadow-primary/10"
                                            : "border-gray-100 bg-white hover:border-primary/20 hover:shadow-lg"
                                            }`}
                                    >
                                        <div className="relative z-10">
                                            <div className={`w-12 h-12 rounded-2xl mb-4 flex items-center justify-center transition-all ${paymentMethod === "online" ? "bg-primary text-white" : "bg-gray-50 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary"}`}>
                                                <QrCode className="h-6 w-6" />
                                            </div>
                                            <p className="font-black text-gray-900 text-lg mb-1">Online Payment</p>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter text-blue-600">Extra 5% Cashback</p>
                                        </div>
                                        {paymentMethod === "online" && (
                                            <div className="absolute top-4 right-4 text-primary">
                                                <CheckCircle2 className="h-6 w-6 fill-primary text-white" />
                                            </div>
                                        )}
                                        <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full transition-all duration-500 ${paymentMethod === "online" ? "bg-primary/5 scale-150" : "bg-gray-50 scale-100 opacity-0 group-hover:opacity-100"}`} />
                                    </div>
                                </div>

                                {paymentMethod === "online" && (
                                    <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                        <div className="flex flex-wrap gap-3">
                                            {[
                                                { id: "upi", label: "UPI Apps", desc: "GPay, PhonePe", icon: <QrCode className="w-4 h-4" /> },
                                                { id: "card", label: "Cards", desc: "Credit / Debit", icon: <CreditCard className="w-4 h-4" /> },
                                                { id: "netbanking", label: "Banking", desc: "Net Banking", icon: <Truck className="w-4 h-4" /> }
                                            ].map((method) => (
                                                <button
                                                    key={method.id}
                                                    type="button"
                                                    onClick={() => setOnlineSubMethod(method.id as any)}
                                                    className={`flex-1 min-w-[120px] p-4 border-2 rounded-2xl text-left transition-all relative overflow-hidden ${onlineSubMethod === method.id
                                                        ? "border-primary bg-white shadow-md ring-4 ring-primary/5"
                                                        : "border-gray-100 bg-gray-50/50 hover:border-gray-200"
                                                        }`}
                                                >
                                                    <div className={`w-8 h-8 rounded-lg mb-3 flex items-center justify-center ${onlineSubMethod === method.id ? "bg-primary text-white" : "bg-white text-gray-400"}`}>
                                                        {method.icon}
                                                    </div>
                                                    <div className="font-extrabold text-sm text-gray-900">{method.label}</div>
                                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{method.desc}</div>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="p-2 bg-white rounded-[2rem] shadow-inner border-2 border-gray-50">
                                            <div className="p-6 md:p-8 space-y-8">
                                                {onlineSubMethod === "upi" && (
                                                    <div className="space-y-6">
                                                        <div className="flex bg-gray-50/80 p-1.5 rounded-2xl border-2 border-gray-100 max-w-sm mx-auto">
                                                            <button
                                                                type="button"
                                                                onClick={() => setUpiPaymentType("id")}
                                                                className={`flex-1 py-3 h-12 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${upiPaymentType === "id" ? "bg-white text-primary shadow-sm ring-1 ring-gray-100" : "text-gray-400 hover:text-gray-600"}`}
                                                            >
                                                                UPI ID
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setUpiPaymentType("qr")}
                                                                className={`flex-1 py-3 h-12 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${upiPaymentType === "qr" ? "bg-white text-primary shadow-sm ring-1 ring-gray-100" : "text-gray-400 hover:text-gray-600"}`}
                                                            >
                                                                Scan QR
                                                            </button>
                                                        </div>

                                                        {upiPaymentType === "id" ? (
                                                            <div className="space-y-4 animate-in zoom-in-95 duration-300 max-w-md mx-auto">
                                                                <div className="text-center mb-6">
                                                                    <div className="flex justify-center gap-4 mb-4 grayscale opacity-40">
                                                                        <div className="text-xl font-black italic">GPay</div>
                                                                        <div className="text-xl font-black italic">PhonePe</div>
                                                                        <div className="text-xl font-black italic">Paytm</div>
                                                                    </div>
                                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Enter Verified UPI ID</label>
                                                                </div>
                                                                <Input
                                                                    required={paymentMethod === "online" && onlineSubMethod === "upi" && upiPaymentType === "id"}
                                                                    placeholder="rahul@okaxis"
                                                                    className="h-14 rounded-2xl border-2 border-gray-100 focus:border-primary text-center text-lg font-bold"
                                                                />
                                                                <div className="flex items-center justify-center gap-2 text-green-600 text-[10px] font-black uppercase tracking-wider">
                                                                    <CheckCircle2 className="w-3 h-3" /> Auto-Verify Secured
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center space-y-6 animate-in zoom-in-95 duration-300">
                                                                <div className="relative p-6 bg-white rounded-[2.5rem] shadow-2xl border-2 border-gray-50 flex items-center justify-center">
                                                                    <div className="w-48 h-48 bg-gray-50 flex items-center justify-center relative overflow-hidden rounded-3xl border">
                                                                        <QrCode className="w-32 h-32 text-gray-200" />
                                                                        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 p-4">
                                                                            {Array.from({ length: 36 }).map((_, i) => (
                                                                                <div key={i} className={`border-[1.5px] border-gray-200 ${Math.random() > 0.4 ? 'bg-primary' : ''}`} />
                                                                            ))}
                                                                        </div>
                                                                        {/* Advanced Scan Line */}
                                                                        <div className="absolute inset-x-0 h-1 bg-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.5)] animate-scan-slow top-0" />
                                                                        <div className="absolute inset-x-0 h-40 bg-gradient-to-b from-primary/10 to-transparent top-0 animate-scan-shade" />
                                                                    </div>
                                                                    <div className="absolute -bottom-3 bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/40">
                                                                        Scan to Verify
                                                                    </div>
                                                                </div>
                                                                <div className="text-center space-y-2">
                                                                    <p className="text-xl font-black text-gray-900">₹{total.toLocaleString()}</p>
                                                                    <p className="text-xs font-bold text-gray-400 max-w-[200px] leading-relaxed">Scan with GPay, PhonePe, Paytm or any UPI App</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {onlineSubMethod === "card" && (
                                                    <div className="space-y-8 animate-in zoom-in-95 duration-300 max-w-md mx-auto">
                                                        <div className="relative h-56 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-8 text-white shadow-2xl overflow-hidden group">
                                                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                                                <CreditCard className="w-40 h-40 -mr-10 -mt-10" />
                                                            </div>
                                                            <div className="relative z-10 flex flex-col h-full">
                                                                <div className="flex justify-between items-start mb-auto">
                                                                    <div className="w-12 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center border border-amber-400/30">
                                                                        <div className="w-8 h-6 bg-amber-400/40 rounded-sm" />
                                                                    </div>
                                                                    <div className="italic font-black text-xl opacity-50 uppercase tracking-tighter">VrindaCare</div>
                                                                </div>
                                                                <div className="text-xl font-bold tracking-[0.25em] mb-6 font-mono">XXXX XXXX XXXX XXXX</div>
                                                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] opacity-60 font-mono">
                                                                    <div>Card Holder</div>
                                                                    <div>Valid Thru</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Card Number</label>
                                                                <Input required={paymentMethod === "online" && onlineSubMethod === "card"} placeholder="4123 4567 8901 2345" className="h-14 rounded-2xl border-2 border-gray-100 font-bold" />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Expiry Date</label>
                                                                    <Input required={paymentMethod === "online" && onlineSubMethod === "card"} placeholder="MM/YY" className="h-14 rounded-2xl border-2 border-gray-100 font-bold" />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">CVV</label>
                                                                    <Input required={paymentMethod === "online" && onlineSubMethod === "card"} type="password" placeholder="***" className="h-14 rounded-2xl border-2 border-gray-100 font-bold" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {onlineSubMethod === "netbanking" && (
                                                    <div className="space-y-6 animate-in zoom-in-95 duration-300">
                                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                            {[
                                                                { name: "SBI", icon: "🇮🇳" },
                                                                { name: "HDFC", icon: "🏛️" },
                                                                { name: "ICICI", icon: "🏦" },
                                                                { name: "Axis", icon: "💳" },
                                                                { name: "Kotak", icon: "💰" },
                                                                { name: "Other", icon: "🌐" }
                                                            ].map((bank) => (
                                                                <button
                                                                    key={bank.name}
                                                                    type="button"
                                                                    className="flex flex-col items-center justify-center p-4 border-2 border-gray-50 rounded-2xl hover:border-primary hover:bg-primary/[0.02] transition-all group"
                                                                >
                                                                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{bank.icon}</div>
                                                                    <div className="text-xs font-black text-gray-700">{bank.name}</div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button
                                type="submit"
                                form="checkout-form"
                                className="w-full h-16 rounded-[2rem] text-xl font-black shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all mt-10 group"
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                        Verifying...
                                    </div>
                                ) : upiPaymentType === "qr" && onlineSubMethod === "upi" && paymentMethod === "online" ? (
                                    "I have Paid"
                                ) : (
                                    <>
                                        Place Order
                                        <ArrowLeft className="h-6 w-6 ml-2 rotate-180 group-hover:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </section>
                </div>

                <div className="space-y-6">
                    <Card className="rounded-[2.5rem] border-2 border-gray-50 overflow-hidden shadow-xl">
                        <CardHeader className="bg-gray-50/50 pb-6">
                            <CardTitle className="text-xl font-black text-gray-900">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-900">{item.name}</span>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Qty: {item.quantity}</span>
                                    </div>
                                    <span className="font-black text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="border-t-2 border-dashed border-gray-100 pt-6 space-y-3">
                                <div className="flex justify-between text-sm font-bold text-gray-500">
                                    <span>Subtotal</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold">
                                    <span>Shipping</span>
                                    <span className="text-green-600 uppercase text-[10px] tracking-widest font-black">Free Delivery</span>
                                </div>
                                <div className="flex justify-between items-end pt-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Grand Total</span>
                                        <span className="text-3xl font-black text-gray-900">₹{total.toLocaleString()}</span>
                                    </div>
                                    <div className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest border border-primary/10">
                                        Inc. Taxes
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-blue-50/50 border-2 border-blue-100 p-6 rounded-[2rem] text-sm text-blue-900 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-black mb-1">Pharmacist Verified</p>
                            <p className="text-xs text-blue-700 font-medium leading-relaxed">Your privacy and safety are our top priorities. All orders are verified by certified experts.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
