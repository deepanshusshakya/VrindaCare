"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, Package, MapPin, CreditCard } from "lucide-react"
import Link from "next/link"

export default function OrderDetailsPage() {
    const params = useParams()
    const id = params.id as string

    // Mock data for the specific order
    const orderDetails = {
        id: id,
        date: "Feb 10, 2026",
        status: id === "ORD-1234" ? "Delivered" : "Processing",
        total: id === "ORD-1234" ? "₹210.00" : "₹150.00",
        shippingAddress: "123 Main St, New York, NY 10001",
        paymentMethod: "Cash on Delivery",
        items: [
            { name: "Paracetamol", price: "₹100.00", quantity: 2 },
            { name: "Vitamin C", price: "₹110.00", quantity: 1 }
        ]
    }

    const handleDownloadInvoice = () => {
        window.print()
    }

    return (
        <div className="container px-4 py-8">
            <Link href="/dashboard/orders" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 print:hidden">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Orders
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Order Details</h1>
                    <p className="text-muted-foreground">Order ID: {id}</p>
                </div>
                <div className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium print:hidden">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{orderDetails.status}</span>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center">
                                <Package className="mr-2 h-5 w-5" />
                                Order Items
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="divide-y">
                            {orderDetails.items.map((item, index) => (
                                <div key={index} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                    </div>
                                    <span className="font-semibold">{item.price}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center">
                                <MapPin className="mr-2 h-5 w-5" />
                                Shipping Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-1">Address:</p>
                            <p className="font-medium">{orderDetails.shippingAddress}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span>{orderDetails.total}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Shipping Fees</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                <span>Total Amount</span>
                                <span>{orderDetails.total}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center">
                                <CreditCard className="mr-2 h-5 w-5" />
                                Payment details
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm font-medium text-primary bg-primary/5 p-3 rounded border border-primary/20">
                                {orderDetails.paymentMethod}
                            </p>
                        </CardContent>
                    </Card>

                    <Button className="w-full print:hidden" variant="outline" onClick={handleDownloadInvoice}>
                        Download Invoice
                    </Button>
                </div>
            </div>
        </div>
    )
}
