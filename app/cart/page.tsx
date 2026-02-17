"use client"

import { useCart } from "@/components/providers/cart-provider"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingCart, Plus, Minus, ArrowRight, ChevronLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
    const { items, updateQuantity, removeItem, total, clearCart } = useCart()

    if (items.length === 0) {
        return (
            <div className="bg-gray-50/50 min-h-screen">
                <div className="container px-4 py-20 flex flex-col items-center justify-center min-h-[70vh] text-center">
                    <div className="w-32 h-32 bg-white rounded-[3rem] shadow-xl shadow-primary/5 flex items-center justify-center mb-10 border border-gray-100 group hover:scale-110 transition-transform duration-500">
                        <ShoppingCart className="h-14 w-14 text-gray-200 group-hover:text-primary transition-colors" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tight">Your Cart is <span className="text-primary">Empty</span></h1>
                    <p className="text-gray-500 mb-12 max-w-md mx-auto font-medium text-lg leading-relaxed">
                        Looks like you haven't added any medicines yet. Let's find what you need to stay healthy!
                    </p>
                    <Button asChild size="lg" className="rounded-2xl h-16 px-10 text-lg font-black shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95">
                        <Link href="/products" className="flex items-center gap-3">
                            Start Shopping
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50/50 min-h-screen">
            <div className="container px-4 md:px-6 py-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <Link href="/products" className="inline-flex items-center gap-2 text-sm font-black text-gray-400 hover:text-primary transition-colors mb-4 group">
                            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Medicines
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 flex items-center gap-4">
                            Shopping <span className="text-primary">Cart</span>
                            <span className="text-sm font-black bg-white border px-4 py-1.5 rounded-2xl shadow-sm text-gray-500">
                                {items.reduce((acc, item) => acc + item.quantity, 0)} Items
                            </span>
                        </h1>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={clearCart}
                        className="text-gray-400 hover:text-red-500 font-black text-xs uppercase tracking-widest gap-2 rounded-2xl hover:bg-red-50"
                    >
                        <Trash2 className="h-4 w-4" />
                        Clear All Items
                    </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item) => (
                            <div key={item.id} className="group relative bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 flex flex-col md:flex-row items-center gap-8">
                                {/* Image */}
                                <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-50 rounded-3xl overflow-hidden flex items-center justify-center p-6 border-2 border-transparent group-hover:border-primary/5 transition-colors">
                                    {item.image && item.image !== "/images/placeholder.jpg" ? (
                                        <img src={item.image} alt={item.name} className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2">
                                            <ShoppingCart className="h-10 w-10 text-gray-100" />
                                            <span className="text-[10px] font-black text-gray-200 uppercase tracking-widest">No Image</span>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-center md:text-left space-y-2">
                                    <div className="text-[10px] font-black text-primary uppercase tracking-widest">Medical Supply</div>
                                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors underline-offset-4 decoration-2 decoration-primary/20 hover:underline cursor-pointer">
                                        <Link href={`/products/${item.id}`}>{item.name}</Link>
                                    </h3>
                                    <p className="text-sm font-bold text-gray-400">Unit Price: ₹{item.price.toLocaleString()}</p>
                                </div>

                                {/* Controls */}
                                <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
                                    <div className="flex items-center justify-between md:justify-end gap-12 border-b border-gray-50 md:border-0 pb-4 md:pb-0 font-black">
                                        <div className="flex items-center bg-gray-50 rounded-2xl p-1.5 border border-gray-100">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-primary hover:shadow-md active:scale-90 transition-all border border-gray-100"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="w-14 text-center font-black text-gray-900 text-lg">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-primary hover:shadow-md active:scale-90 transition-all border border-gray-100"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="text-2xl font-black text-gray-900 min-w-[120px] text-right">
                                            ₹{(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="absolute top-8 right-8 md:static text-gray-200 hover:text-red-500 p-2 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Cart Badges */}
                        <div className="grid md:grid-cols-3 gap-6 pt-6">
                            {[
                                { icon: ShieldCheck, title: "Secure Checkout", desc: "Encoded with 256-bit SSL", color: "bg-blue-50 text-blue-600" },
                                { icon: Truck, title: "Free Express", desc: "Delivery on orders over ₹499", color: "bg-green-50 text-green-600" },
                                { icon: RotateCcw, title: "Easy Returns", desc: "10-day replacement policy", color: "bg-amber-50 text-amber-600" }
                            ].map((badge, i) => (
                                <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3">
                                    <div className={`w-12 h-12 rounded-2xl ${badge.color} flex items-center justify-center`}>
                                        <badge.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-black text-xs uppercase tracking-widest text-gray-900">{badge.title}</p>
                                        <p className="text-[10px] font-bold text-gray-400 mt-1">{badge.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-12 bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl shadow-primary/20 space-y-10 border border-white/5 overflow-hidden">
                            {/* Visual Decor */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[80px] rounded-full"></div>

                            <h3 className="text-3xl font-black relative">Order <span className="text-primary italic">Summary</span></h3>

                            <div className="space-y-6 relative">
                                <div className="flex justify-between items-center group">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                                    <span className="text-xl font-black">₹{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Shipping</span>
                                        <span className="text-[10px] text-green-400 font-black">Free Delivery</span>
                                    </div>
                                    <span className="text-xl font-black text-green-400 flex items-center gap-1 group">
                                        <Truck className="h-4 w-4" />
                                        FREE
                                    </span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Tax Estimate</span>
                                    <span className="text-xl font-black">₹{(total * 0.18).toFixed(0).toLocaleString()}</span>
                                </div>

                                <div className="pt-8 border-t border-white/10 flex flex-col gap-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-lg font-black uppercase tracking-[0.2em] text-primary">GRAND TOTAL</span>
                                        <span className="text-5xl font-black text-white">₹{(total + total * 0.18).toFixed(0).toLocaleString()}</span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-bold text-right italic">All prices include GST</p>
                                </div>
                            </div>

                            <Button className="w-full h-20 rounded-[1.5rem] bg-primary text-white hover:bg-white hover:text-primary text-xl font-black shadow-lg shadow-white/5 transition-all active:scale-95 group overflow-hidden relative" asChild>
                                <Link href="/checkout" className="flex items-center justify-center gap-3">
                                    Confirm Order
                                    <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />

                                    {/* Shining Effect */}
                                    <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[45deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000"></div>
                                </Link>
                            </Button>

                            <div className="flex items-center justify-center gap-4 pt-4 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                                <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-black italic">VISA</div>
                                <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-black italic">MASTERCARD</div>
                                <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-black italic">UPI</div>
                                <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[8px] font-black italic">GPAY</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
