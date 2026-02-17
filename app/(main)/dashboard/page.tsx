import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Package, User } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
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
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">
                            +1 mock order from last month
                        </p>
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm border-b pb-2">
                                <span>#ORD-1234</span>
                                <span className="text-green-600">Delivered</span>
                            </div>
                            <div className="flex justify-between text-sm border-b pb-2">
                                <span>#ORD-5678</span>
                                <span className="text-blue-600">Processing</span>
                            </div>
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
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">
                            All active prescriptions
                        </p>
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm border-b pb-2">
                                <span>Rx: Dr. Smith</span>
                                <span className="text-green-600">Verified</span>
                            </div>
                            <div className="flex justify-between text-sm border-b pb-2">
                                <span>Rx: Dr. Doe</span>
                                <span className="text-yellow-600">Pending</span>
                            </div>
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
                                JD
                            </div>
                            <div>
                                <p className="font-medium">John Doe</p>
                                <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                            </div>
                        </div>
                        <div className="text-sm space-y-2">
                            <p className="text-muted-foreground">Phone: +1 234 567 890</p>
                            <p className="text-muted-foreground">Address: 123 Main St, New York</p>
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
