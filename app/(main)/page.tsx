"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search as SearchIcon, ShieldCheck as ShieldIcon, Truck as TruckIcon, Users as UsersIcon } from "lucide-react"
import { categories } from "@/lib/data"
import { useProducts } from "@/components/providers/product-provider"
import { useCart } from "@/components/providers/cart-provider"

export default function Home() {
  const { products } = useProducts()
  const { addItem } = useCart()
  const featuredDisplayProducts = products.slice(0, 4)

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    })
    alert(`${product.name} added to cart!`)
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-secondary/30 py-20 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-foreground">
                Your Health, Our Priority
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Genuine medicines, lab tests, and wellness products delivered to your doorstep.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-9 bg-background"
                    placeholder="Search medicines, health products..."
                    type="search"
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/upload-prescription">Upload Prescription</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <Link href="/products">Browse Medicines</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Shop by Category</h2>
            <Link href="/categories" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow border-none bg-muted/30 hover:bg-muted/50">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4">
                    <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center`}>
                      <span className="text-2xl font-bold text-foreground/50">{category.name[0]}</span>
                    </div>
                    <span className="font-medium text-foreground">{category.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
            <Link href="/products" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredDisplayProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden flex flex-col">
                <Link href={`/products/${product.id}`} className="flex-1">
                  <div className="aspect-square bg-muted flex items-center justify-center relative">
                    {product.image && product.image !== "/images/placeholder.jpg" ? (
                      <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-muted-foreground">Product Image</span>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">₹{product.price.toFixed(2)}</span>
                      <Button size="sm" variant="secondary" onClick={(e) => {
                        e.preventDefault()
                        handleAddToCart(product)
                      }}>Add</Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-4 bg-blue-50 rounded-full text-blue-600">
                <ShieldIcon className="h-8 w-8" />
              </div>
              <h3 className="font-bold">100% Genuine Medicines</h3>
              <p className="text-muted-foreground text-sm">Sourced directly from manufacturers.</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="p-4 bg-green-50 rounded-full text-green-600">
                <UsersIcon className="h-8 w-8" />
              </div>
              <h3 className="font-bold">Trusted by Millions</h3>
              <p className="text-muted-foreground text-sm">Over 10 million happy customers.</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="p-4 bg-orange-50 rounded-full text-orange-600">
                <TruckIcon className="h-8 w-8" />
              </div>
              <h3 className="font-bold">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm">Delivery within 24-48 hours.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


