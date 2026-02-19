"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Package, User } from "lucide-react"
import Link from "next/link"
import { store, type User as UserType } from "@/lib/store"

export default function DashboardPage() {
    const [user, setUser] = useState<UserType | null>(null)
    const [orderCount, setOrderCount] = useState(0)
    const [prescriptionCount, setPrescriptionCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const currentUser = store.getCurrentUser()
        if (!currentUser) {
            router.push("/login")
            return
        }

        setUser(currentUser)

        const fetchStats = async () => {
            const [orders, prescriptions] = await Promise.all([
                store.getOrders(currentUser.email),
                store.getPrescriptions(currentUser.email)
            ])
            setOrderCount(orders.length)
            setPrescriptionCount(prescriptions.length)
            setIsLoading(false)
        }

        fetchStats()
    }, [router])

    if (!user) return null

    return (
        <div className="container px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Orders Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Recent Orders
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{isLoading ? "..." : orderCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Welcome back, {user.name}!
                        </p>
                        <div className="mt-4 space-y-2">
                            <p className="text-sm text-muted-foreground italic">Your recent activity will appear here.</p>
                        </div>
                        <Button className="w-full mt-4" variant="outline" size="sm" asChild>
                            <Link href="/dashboard/orders">View All Orders</Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Prescriptions Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            My Prescriptions
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{isLoading ? "..." : prescriptionCount}</div>
                        <p className="text-xs text-muted-foreground">
                            All active prescriptions
                        </p>
                        <div className="mt-4 space-y-2">
                            <p className="text-sm text-muted-foreground italic">No prescriptions uploaded yet.</p>
                        </div>
                        <Button className="w-full mt-4" variant="outline" size="sm" asChild>
                            <Link href="/dashboard/prescriptions">Manage Prescriptions</Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Profile Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Profile Details
                        </CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                        <div className="text-sm space-y-2">
                            <p className="text-muted-foreground">Phone: {user.phone}</p>
                            <p className="text-muted-foreground truncate">Address: {user.address}</p>
                        </div>
                        <Button className="w-full mt-4" variant="outline" size="sm" asChild>
                            <Link href="/dashboard/profile">Edit Profile</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
