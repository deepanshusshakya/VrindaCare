"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/components/providers/product-provider"
import { useCart } from "@/components/providers/cart-provider"
import { ShoppingCart, Heart, Share2, ArrowLeft, Check, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Product } from "@/lib/data"

export default function ProductPage() {
    const params = useParams()
    const router = useRouter()
    const { products } = useProducts()
    const { addItem } = useCart()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [toast, setToast] = useState<string | null>(null)

    useEffect(() => {
        if (params.id && products.length > 0) {
            const foundProduct = products.find(p => p.id === params.id)
            setProduct(foundProduct || null)
            setLoading(false)
        } else if (products.length > 0) {
            setLoading(false)
        }
    }, [params.id, products])

    if (loading) {
        return (
            <div className="container px-4 md:px-6 py-20 flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading medicine details...</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container px-4 md:px-6 py-20 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-6">
                    <ShoppingCart className="h-10 w-10 text-red-500" />
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-4">Product Not Found</h1>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">The medicine you are looking for might have been removed or is temporarily unavailable.</p>
                <Button
                    size="lg"
                    className="rounded-2xl px-8"
                    onClick={() => router.push("/products")}
                >
                    Back to Medicines
                </Button>
            </div>
        )
    }

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image
        })

        setToast(`${quantity} x ${product.name} added to your cart`)
        setTimeout(() => setToast(null), 3000)
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: `Check out ${product.name} on VrindaCare!`,
                    url: window.location.href,
                })
            } catch (err) {
                console.log("Error sharing:", err)
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href)
            setToast("Link copied to clipboard!")
            setTimeout(() => setToast(null), 2000)
        }
    }

    return (
        <div className="bg-gray-50/50 min-h-screen">
            {/* Professional Toast Notification */}
            {toast && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-gray-900/95 backdrop-blur-md text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/10">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
                            <Check className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-bold text-sm">{toast}</span>
                    </div>
                </div>
            )}

            <div className="container px-4 md:px-6 py-12">
                <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors group mb-10">
                    <div className="w-8 h-8 rounded-xl bg-white shadow-sm border flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    <span>Back to Medicines</span>
                </Link>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Professional Image Gallery/View */}
                    <div className="space-y-6">
                        <div className="aspect-square bg-white rounded-[3rem] shadow-sm border-2 border-white overflow-hidden flex items-center justify-center p-12 relative group">
                            {product.image && product.image !== "/images/placeholder.jpg" ? (
                                <img src={product.image} alt={product.name} className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-700" />
                            ) : (
                                <div className="text-center space-y-4">
                                    <ShoppingCart className="h-24 w-24 text-gray-100 mx-auto" />
                                    <p className="text-gray-300 font-black uppercase tracking-widest text-xs">No Image Available</p>
                                </div>
                            )}

                            <div className="absolute top-8 left-8">
                                <span className="bg-primary/10 text-primary px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-primary/20 backdrop-blur-sm">
                                    {product.category}
                                </span>
                            </div>

                            {/* Floating Badges */}
                            <div className="absolute top-8 right-8 flex flex-col gap-3">
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center transition-all active:scale-90 ${isWishlisted ? 'bg-red-500 text-white shadow-red-500/20' : 'bg-white text-gray-400 hover:text-red-500 border border-gray-100'}`}
                                >
                                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="w-12 h-12 bg-white rounded-2xl border border-gray-100 shadow-lg text-gray-400 hover:text-primary flex items-center justify-center transition-all active:scale-90"
                                >
                                    <Share2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Quick Trust Badges */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { icon: Check, label: "Verified Pharma", color: "text-blue-500" },
                                { icon: Star, label: `Rated ${product.rating || '4.5'}/5`, color: "text-amber-500" },
                                { icon: ShoppingCart, label: "Fast Delivery", color: "text-green-500" }
                            ].map((badge, i) => (
                                <div key={i} className="bg-white p-4 rounded-3xl border border-gray-100 flex flex-col items-center gap-2 text-center shadow-sm">
                                    <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center ${badge.color}`}>
                                        <badge.icon className="h-4 w-4" />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-900 uppercase tracking-tighter">{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Info and Purchase */}
                    <div className="space-y-10">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${product.stockStatus === 'Out of Stock' ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-green-50 text-green-500 border border-green-100'}`}>
                                    {product.stockStatus || 'In Stock'}
                                </span>
                                {product.manufacturer && (
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        By {product.manufacturer}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
                                {product.name}
                            </h1>
                            <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-xl">
                                {product.description || `High-quality ${product.name} for your health and wellness. This product is sourced from trusted manufacturers and follows all safety standards.`}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-baseline gap-4">
                            <span className="text-5xl font-black text-gray-900 leading-none">₹{product.price.toLocaleString()}</span>
                            <span className="text-gray-400 line-through font-bold text-xl">₹{(product.price * 1.25).toFixed(0)}</span>
                            <span className="text-green-500 font-black text-sm bg-green-50 px-3 py-1.5 rounded-xl uppercase tracking-widest border border-green-100">
                                Save 25%
                            </span>
                        </div>

                        {/* Interactive Area */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
                            <div className="flex items-center gap-12">
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Quantity</p>
                                    <div className="flex items-center bg-gray-50 rounded-2xl p-1.5 border">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-primary active:scale-95 transition-all text-xl font-bold"
                                        >
                                            -
                                        </button>
                                        <span className="w-14 text-center font-black text-gray-900">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-primary active:scale-95 transition-all text-xl font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3 flex-1 lg:max-w-[200px]">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subtotal</p>
                                    <div className="text-2xl font-black text-gray-900 px-1 pt-1.5">
                                        ₹{(product.price * quantity).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className="w-full h-16 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart className="mr-3 h-6 w-6" />
                                Add to Cart
                            </Button>
                        </div>

                        {/* Detailed Tabs/Sections */}
                        <div className="space-y-8">
                            {/* Product Info Table */}
                            <div className="grid grid-cols-2 gap-px bg-gray-100 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                                {[
                                    { label: 'SKU', value: product.sku || 'N/A' },
                                    { label: 'Category', value: product.category },
                                    { label: 'Manufacturer', value: product.manufacturer || 'General Medicine' },
                                    { label: 'Tax Status', value: 'Includes GST' }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white p-6 flex flex-col gap-1">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</span>
                                        <span className="font-bold text-gray-900">{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1.5 h-4 bg-primary rounded-full"></div>
                                        Dosage Instruction
                                    </h3>
                                    <p className="text-gray-500 font-medium leading-relaxed bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                        {product.dosage || "Take as directed by your physician or as indicated on the packaging. Standard dosage is once daily with water."}
                                    </p>
                                </div>

                                <div className="bg-amber-50/50 border-2 border-dashed border-amber-200 p-6 rounded-3xl">
                                    <h4 className="text-amber-700 font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                        Safety Information
                                    </h4>
                                    <p className="text-amber-800 text-sm font-bold leading-relaxed">
                                        {product.safetyWarning || "Keep out of reach of children. Consult a doctor before use if pregnant, nursing, or have a pre-existing medical condition. Store in a cool, dry place."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

