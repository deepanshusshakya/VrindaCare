"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useProducts } from "@/components/providers/product-provider"

export default function WellnessPage() {
    const { products: allProducts } = useProducts()
    const products = allProducts.filter(p => p.category === "Wellness" || p.category === "Personal Care")

    return (
        <div className="container px-4 md:px-6 py-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Wellness Products</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Explore our range of vitamins, supplements, and personal care products for a healthier you.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="aspect-square bg-muted flex items-center justify-center relative">
                                {product.image && product.image !== "/images/placeholder.jpg" ? (
                                    <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                                ) : (
                                    <div className="text-muted-foreground text-xs">Product Image</div>
                                )}
                            </div>
                            <CardContent className="p-4">
                                <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
                                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="font-bold text-primary">₹{product.price.toFixed(2)}</span>
                                    <Button size="sm" variant="secondary" asChild>
                                        <Link href={`/products/${product.id}`}>View Details</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10">
                        <p className="text-muted-foreground">No wellness products found at the moment.</p>
                        <Button asChild className="mt-4">
                            <Link href="/products">View All Medicines</Link>
                        </Button>
                    </div>
                )}
            </div>

            {/* Wellness Categories */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Shop by Concern</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Immunity", "Digestion", "Skin Care", "Multivitamins"].map((item) => (
                        <Card key={item} className="bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer border-none">
                            <CardContent className="flex items-center justify-center p-6">
                                <span className="font-semibold">{item}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}

