"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Package } from "lucide-react"
import Link from "next/link"

import { useState, useEffect } from "react"
import { store, type Order } from "@/lib/store"

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            const user = store.getCurrentUser()
            if (user) {
                const data = await store.getOrders(user.email)
                setOrders(data)
            }
            setIsLoading(false)
        }
        fetchOrders()
    }, [])

    return (
        <div className="container px-4 py-8">
            <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold mb-8">My Orders</h1>

            <div className="space-y-6">
                {isLoading ? (
                    <div className="text-center py-12">Loading your orders...</div>
                ) : orders.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center text-muted-foreground">
                            You haven't placed any orders yet.
                        </CardContent>
                    </Card>
                ) : (
                    orders.map((order) => (
                        <Card key={order.id}>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-lg">{order.id}</CardTitle>
                                    <p className="text-sm text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString()}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                                    }`}>
                                    {order.status}
                                </span>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <Package className="h-5 w-5 mr-3 text-muted-foreground" />
                                        <div className="text-sm">
                                            <p className="font-medium truncate max-w-[200px] md:max-w-md">
                                                {order.items.map(i => i.name).join(", ")}
                                            </p>
                                            <p className="text-muted-foreground pt-1">Total: ₹{order.total}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/dashboard/orders/${order.id}`}>Order Details</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
