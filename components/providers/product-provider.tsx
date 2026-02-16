"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Product, featuredProducts } from "@/lib/data"

interface ProductContextType {
    products: Product[]
    addProduct: (product: Omit<Product, "id">) => void
    deleteProduct: (id: string) => void
    updateProduct: (product: Product) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([])
    const [isInitialized, setIsInitialized] = useState(false)

    // Initialize products from localStorage or static data
    useEffect(() => {
        const storedProducts = localStorage.getItem("vrindacare_products")
        if (storedProducts) {
            try {
                setProducts(JSON.parse(storedProducts))
            } catch (error) {
                console.error("Failed to parse products from localStorage:", error)
                setProducts(featuredProducts)
            }
        } else {
            setProducts(featuredProducts)
        }
        setIsInitialized(true)
    }, [])

    // Save to localStorage whenever products change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("vrindacare_products", JSON.stringify(products))
        }
    }, [products, isInitialized])

    const addProduct = (newProduct: Omit<Product, "id">) => {
        const productWithId: Product = {
            ...newProduct,
            id: Date.now().toString(),
            slug: newProduct.name.toLowerCase().replace(/ /g, "-"),
            rating: 4.5, // Default rating
        }
        setProducts((prev) => [productWithId, ...prev])
    }

    const deleteProduct = (id: string) => {
        setProducts((prev) => prev.filter((p) => p.id !== id))
    }

    const updateProduct = (updatedProduct: Product) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        )
    }

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
            {children}
        </ProductContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductContext)
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductProvider")
    }
    return context
}
