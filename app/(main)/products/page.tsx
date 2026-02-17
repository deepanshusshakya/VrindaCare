"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useProducts } from "@/components/providers/product-provider"
import { useCart } from "@/components/providers/cart-provider"
import { ShoppingCart, Check, Star, Filter, ArrowUpDown } from "lucide-react"

export default function ProductsPage() {
    const { products } = useProducts()
    const { addItem } = useCart()
    const [toast, setToast] = useState<string | null>(null)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [sortBy, setSortBy] = useState<string>("Featured")

    const handleAddToCart = (e: React.MouseEvent, product: any) => {
        e.preventDefault()
        e.stopPropagation()
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        })

        setToast(`${product.name} added to cart!`)
        setTimeout(() => setToast(null), 3000)
    }

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        )
    }

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products]

        // Filter by categories
        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category))
        }

        // Sort
        if (sortBy === "Price: Low to High") {
            result.sort((a, b) => a.price - b.price)
        } else if (sortBy === "Price: High to Low") {
            result.sort((a, b) => b.price - a.price)
        }

        return result
    }, [products, selectedCategories, sortBy])

    return (
        <div className="bg-gray-50/50 min-h-screen">
            <div className="container px-4 md:px-6 py-12">
                {/* Local Toast Feedback */}
                {toast && (
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 flex items-center gap-2 font-bold text-sm">
                        <Check className="h-4 w-4 text-green-400" />
                        {toast}
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="w-full md:w-72 space-y-8">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border">
                            <h3 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Filters</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-tighter mb-4">Categories</p>
                                    <div className="space-y-3">
                                        {["Wellness", "Diabetes", "Baby Care", "Personal Care", "Nutrition", "Ayurveda"].map((cat) => (
                                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(cat)}
                                                    onChange={() => toggleCategory(cat)}
                                                    className="w-5 h-5 rounded-lg border-gray-200 text-primary focus:ring-primary/20 transition-all cursor-pointer"
                                                />
                                                <span className={`${selectedCategories.includes(cat) ? 'text-primary font-bold' : 'text-sm font-medium text-gray-600'} group-hover:text-primary transition-colors`}>{cat}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900">All <span className="text-primary">Medicines</span></h1>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Showing {filteredAndSortedProducts.length} Results</p>
                            </div>
                            <div className="hidden md:flex gap-2">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-white border text-sm font-bold px-4 py-2 rounded-xl outline-none focus:border-primary transition-all cursor-pointer"
                                >
                                    <option>Sort by: Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredAndSortedProducts.length > 0 ? (
                                filteredAndSortedProducts.map((product) => (
                                    <Link key={product.id} href={`/products/${product.id}`} className="group">
                                        <Card className="overflow-hidden border-2 border-transparent hover:border-primary/10 transition-all duration-500 h-full flex flex-col rounded-[2.5rem] bg-white shadow-sm hover:shadow-2xl">
                                            <div className="aspect-square bg-gray-50 flex items-center justify-center p-8 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                                {product.image && product.image !== "/images/placeholder.jpg" ? (
                                                    <img src={product.image} alt={product.name} className="object-contain w-full h-full" />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-2 text-gray-300">
                                                        <ShoppingCart className="h-12 w-12" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">No Image</span>
                                                    </div>
                                                )}
                                                <div className="absolute top-4 left-4">
                                                    <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                                                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                                                        <span className="text-[10px] font-black text-gray-900">{product.rating || "4.5"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <CardContent className="p-8 pt-6 flex flex-col flex-1">
                                                <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">{product.category}</div>
                                                <h3 className="font-bold text-lg text-gray-900 mb-6 group-hover:text-primary transition-colors leading-tight line-clamp-2">{product.name}</h3>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Best Price</span>
                                                        <span className="font-black text-2xl text-gray-900">₹{product.price.toLocaleString()}</span>
                                                    </div>
                                                    <Button
                                                        size="icon"
                                                        className="w-12 h-12 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-90 transition-all"
                                                        onClick={(e) => handleAddToCart(e, product)}
                                                    >
                                                        <ShoppingCart className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                                        <Filter className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">No products found</h3>
                                    <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                                    <Button
                                        variant="outline"
                                        className="mt-6 rounded-xl"
                                        onClick={() => {
                                            setSelectedCategories([])
                                            setSortBy("Featured")
                                        }}
                                    >
                                        Clear all filters
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


