"use client"

import Link from "next/link"
import { Search, ShoppingCart, User, Menu, Pill } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/providers/cart-provider"
import { useState, useEffect, useRef } from "react"
import { useProducts } from "@/components/providers/product-provider"
import { type Product } from "@/lib/data"
import { useRouter, usePathname } from "next/navigation"

export function SiteHeader() {
    const { items } = useCart()
    const { products: allProducts } = useProducts()
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<Product[]>([])
    const [showResults, setShowResults] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const pathname = usePathname()

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setSearchQuery(query)
        if (query.length > 0) {
            const results = allProducts.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            )
            setSearchResults(results)
            setShowResults(true)
        } else {
            setShowResults(false)
        }
    }

    const handleProductClick = (id: string) => {
        router.push(`/products/${id}`)
        setShowResults(false)
        setSearchQuery("")
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            if (searchResults.length > 0) {
                // Navigate to first result
                handleProductClick(searchResults[0].id)
            } else if (searchQuery.trim()) {
                // Navigate to products page with search query
                router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
                setShowResults(false)
            }
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-bold text-primary text-xl">
                        <Pill className="h-6 w-6" />
                        <span>VrindaCare</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <Link
                            href="/"
                            className={`hover:text-primary transition-colors ${pathname === "/" ? "text-primary font-semibold" : ""
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className={`hover:text-primary transition-colors ${pathname === "/products" ? "text-primary font-semibold" : ""
                                }`}
                        >
                            Medicines
                        </Link>
                        <Link
                            href="/wellness"
                            className={`hover:text-primary transition-colors ${pathname === "/wellness" ? "text-primary font-semibold" : ""
                                }`}
                        >
                            Wellness
                        </Link>
                        <Link
                            href="/lab-tests"
                            className={`hover:text-primary transition-colors ${pathname === "/lab-tests" ? "text-primary font-semibold" : ""
                                }`}
                        >
                            Lab Tests
                        </Link>
                    </nav>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-sm relative" ref={searchRef}>
                        <div className="relative w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search for medicines..."
                                className="w-full pl-9 bg-muted/50 focus:bg-background"
                                value={searchQuery}
                                onChange={handleSearch}
                                onFocus={() => searchQuery.length > 0 && setShowResults(true)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        {showResults && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-md shadow-lg z-50 max-h-60 overflow-auto">
                                {searchResults.length > 0 ? (
                                    <ul>
                                        {searchResults.map(product => (
                                            <li key={product.id} className="p-2 hover:bg-muted cursor-pointer flex items-center gap-2" onClick={() => handleProductClick(product.id)}>
                                                <div className="h-8 w-8 bg-muted rounded flex items-center justify-center text-xs">IMG</div>
                                                <div>
                                                    <p className="text-sm font-medium">{product.name}</p>
                                                    <p className="text-xs text-muted-foreground">{product.category}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-4 text-sm text-center text-muted-foreground">No results found.</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="relative">
                            <Link href="/cart">
                                <ShoppingCart className="h-5 w-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 text-white text-[10px] rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                                <span className="sr-only">Cart</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/dashboard">
                                <User className="h-5 w-5" />
                                <span className="sr-only">Account</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                        <Button className="hidden md:inline-flex" asChild>
                            <Link href="/upload-prescription">Upload Prescription</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
