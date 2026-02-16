"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Package,
    FileText,
    Truck,
    Check,
    X,
    Search,
    Users,
    LayoutDashboard,
    TrendingUp,
    TrendingDown,
    ShoppingCart,
    DollarSign,
    Activity,
    Menu,
    Download
} from "lucide-react"
import { getAllProducts, categories } from "@/lib/data"
import { useProducts } from "@/components/providers/product-provider"

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard")
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const { products, addProduct, deleteProduct, updateProduct } = useProducts()

    // Form state for adding product
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "Wellness",
        price: "",
        image: ""
    })

    const [prescriptions, setPrescriptions] = useState([
        { id: "RX-001", patient: "Vikram Singh", uploadedBy: "Self", time: "5 mins ago" },
        { id: "RX-002", patient: "Meera Joshi", uploadedBy: "Family", time: "12 mins ago" },
        { id: "RX-003", patient: "Arjun Nair", uploadedBy: "Self", time: "25 mins ago" },
    ])

    // Mock data for dashboard
    const stats = {
        totalOrders: 1234,
        ordersTrend: 12.5,
        totalRevenue: 45678.90,
        revenueTrend: 8.2,
        activeUsers: 856,
        usersTrend: -2.4,
        pendingPrescriptions: prescriptions.length,
        prescriptionsTrend: 5.1
    }

    const recentOrders = [
        { id: "ORD-1001", customer: "Rajesh Kumar", status: "Processing", total: 1250.00, date: "2 mins ago" },
        { id: "ORD-1002", customer: "Priya Sharma", status: "Shipped", total: 890.50, date: "15 mins ago" },
        { id: "ORD-1003", customer: "Amit Patel", status: "Delivered", total: 2340.00, date: "1 hour ago" },
        { id: "ORD-1004", customer: "Sneha Reddy", status: "Processing", total: 567.25, date: "2 hours ago" },
    ]

    const users = [
        { id: 1, name: "Rahul Verma", email: "rahul@example.com", orders: 12, joined: "Jan 2024" },
        { id: 2, name: "Anita Desai", email: "anita@example.com", orders: 8, joined: "Feb 2024" },
        { id: 3, name: "Karan Mehta", email: "karan@example.com", orders: 15, joined: "Dec 2023" },
        { id: 4, name: "Pooja Iyer", email: "pooja@example.com", orders: 5, joined: "Mar 2024" },
    ]

    // Action Handlers
    const handleApprovePrescription = (id: string) => {
        setPrescriptions(prescriptions.filter(rx => rx.id !== id))
        alert(`✅ Prescription ${id} approved successfully!`)
    }

    const handleRejectPrescription = (id: string) => {
        setPrescriptions(prescriptions.filter(rx => rx.id !== id))
        alert(`❌ Prescription ${id} rejected.`)
    }

    const handleViewPrescription = (id: string) => {
        alert(`📄 Viewing prescription ${id}\n\nIn a real app, this would open a modal or new page with prescription details.`)
    }

    const handleEditProduct = (productId: string, productName: string) => {
        alert(`✏️ Edit Product: ${productName}`)
    }

    const handleDeleteProduct = (productId: string, productName: string) => {
        if (confirm(`Are you sure you want to delete "${productName}"?`)) {
            deleteProduct(productId)
            alert(`🗑️ Product "${productName}" deleted successfully!`)
        }
    }

    const handleViewOrder = (orderId: string) => {
        alert(`📦 Viewing Order ${orderId}`)
    }

    const handleViewUser = (userId: number, userName: string) => {
        alert(`👤 Viewing User: ${userName}`)
    }

    const handleEditUser = (userId: number, userName: string) => {
        alert(`✏️ Edit User: ${userName}`)
    }

    const handleExport = (type: string) => {
        alert(`📥 Exporting ${type}...`)
    }

    const handleAddProduct = () => {
        if (!newProduct.name || !newProduct.price) {
            alert("Please fill name and price")
            return
        }

        addProduct({
            name: newProduct.name,
            category: newProduct.category,
            price: parseFloat(newProduct.price),
            image: newProduct.image || "/images/placeholder.jpg",
        })

        setNewProduct({ name: "", category: "Wellness", price: "", image: "" })
        setIsAddModalOpen(false)
        alert("✅ Product added successfully!")
    }

    const handleFilter = () => {
        alert(`🔍 Filter Options`)
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "processing": return "bg-blue-100 text-blue-800"
            case "shipped": return "bg-purple-100 text-purple-800"
            case "delivered": return "bg-green-100 text-green-800"
            case "cancelled": return "bg-red-100 text-red-800"
            default: return "bg-gray-100 text-gray-800"
        }
    }

    // Filter data based on search
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filteredOrders = recentOrders.filter(o =>
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden relative">
            {/* Add Product Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md animate-in fade-in zoom-in duration-200">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Add New Product</CardTitle>
                                <CardDescription>Enter details for the new product</CardDescription>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsAddModalOpen(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Product Name</label>
                                <Input
                                    placeholder="e.g. Paracetamol"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <select
                                    className="w-full p-2 rounded-md border text-sm"
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Price (₹)</label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Image URL (Optional)</label>
                                <Input
                                    placeholder="https://..."
                                    value={newProduct.image}
                                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <Button variant="outline" className="flex-1" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                            <Button className="flex-1" onClick={handleAddProduct}>Add Product</Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r transition-all duration-300 flex flex-col`}>
                <div className="p-4 border-b flex items-center justify-between">
                    {sidebarOpen && <h2 className="font-bold text-xl text-primary">VrindaCare Admin</h2>}
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Button
                        variant={activeTab === "dashboard" ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveTab("dashboard")}
                    >
                        <LayoutDashboard className="h-5 w-5 mr-2" />
                        {sidebarOpen && "Dashboard"}
                    </Button>
                    <Button
                        variant={activeTab === "orders" ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveTab("orders")}
                    >
                        <Truck className="h-5 w-5 mr-2" />
                        {sidebarOpen && "Orders"}
                    </Button>
                    <Button
                        variant={activeTab === "inventory" ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveTab("inventory")}
                    >
                        <Package className="h-5 w-5 mr-2" />
                        {sidebarOpen && "Inventory"}
                    </Button>
                    <Button
                        variant={activeTab === "prescriptions" ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveTab("prescriptions")}
                    >
                        <FileText className="h-5 w-5 mr-2" />
                        {sidebarOpen && "Prescriptions"}
                    </Button>
                    <Button
                        variant={activeTab === "users" ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveTab("users")}
                    >
                        <Users className="h-5 w-5 mr-2" />
                        {sidebarOpen && "Users"}
                    </Button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    {/* Dashboard Tab */}
                    {activeTab === "dashboard" && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                                <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stats.totalOrders}</div>
                                        <div className="flex items-center text-xs text-green-600 mt-1">
                                            <TrendingUp className="h-3 w-3 mr-1" />
                                            +{stats.ordersTrend}% from last month
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
                                        <div className="flex items-center text-xs text-green-600 mt-1">
                                            <TrendingUp className="h-3 w-3 mr-1" />
                                            +{stats.revenueTrend}% from last month
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stats.activeUsers}</div>
                                        <div className="flex items-center text-xs text-red-600 mt-1">
                                            <TrendingDown className="h-3 w-3 mr-1" />
                                            {stats.usersTrend}% from last month
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending Prescriptions</CardTitle>
                                        <Activity className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stats.pendingPrescriptions}</div>
                                        <div className="flex items-center text-xs text-green-600 mt-1">
                                            <TrendingUp className="h-3 w-3 mr-1" />
                                            +{stats.prescriptionsTrend}% from last week
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Recent Activity */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Orders</CardTitle>
                                        <CardDescription>Latest customer orders</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {recentOrders.map((order) => (
                                                <div
                                                    key={order.id}
                                                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                                                    onClick={() => handleViewOrder(order.id)}
                                                >
                                                    <div>
                                                        <p className="font-medium">{order.id}</p>
                                                        <p className="text-sm text-muted-foreground">{order.customer} • {order.date}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold">₹{order.total.toFixed(2)}</p>
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Pending Prescriptions</CardTitle>
                                        <CardDescription>Awaiting verification</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {prescriptions.map((rx) => (
                                                <div key={rx.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                            <FileText className="h-5 w-5 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{rx.id}</p>
                                                            <p className="text-sm text-muted-foreground">{rx.patient} • {rx.time}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50" onClick={() => handleRejectPrescription(rx.id)}>
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApprovePrescription(rx.id)}>
                                                            <Check className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === "orders" && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
                                    <p className="text-muted-foreground">Manage and track all customer orders</p>
                                </div>
                                <Button onClick={() => handleExport('Orders')}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Export Orders
                                </Button>
                            </div>

                            <Card>
                                <CardHeader>
                                    <div className="flex gap-4">
                                        <Input
                                            placeholder="Search orders..."
                                            className="max-w-sm"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <Button variant="outline" onClick={handleFilter}>Filter</Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-md border">
                                        <div className="grid grid-cols-5 p-4 font-medium bg-muted">
                                            <div>Order ID</div>
                                            <div>Customer</div>
                                            <div>Date</div>
                                            <div>Status</div>
                                            <div>Total</div>
                                        </div>
                                        <div className="divide-y">
                                            {filteredOrders.map((order) => (
                                                <div
                                                    key={order.id}
                                                    className="grid grid-cols-5 p-4 hover:bg-muted/50 items-center cursor-pointer"
                                                    onClick={() => handleViewOrder(order.id)}
                                                >
                                                    <div className="font-medium">{order.id}</div>
                                                    <div>{order.customer}</div>
                                                    <div className="text-sm text-muted-foreground">{order.date}</div>
                                                    <div>
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <div className="font-semibold">₹{order.total.toFixed(2)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Inventory Tab */}
                    {activeTab === "inventory" && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
                                    <p className="text-muted-foreground">Manage products and stock levels</p>
                                </div>
                                <Button onClick={() => setIsAddModalOpen(true)}>Add Product</Button>
                            </div>

                            <Card>
                                <CardHeader>
                                    <div className="flex gap-4">
                                        <Input
                                            placeholder="Search products..."
                                            className="max-w-sm"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <Button variant="outline" onClick={handleFilter}>Filter by Category</Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-md border">
                                        <div className="grid grid-cols-5 p-4 font-medium bg-muted">
                                            <div>Product Name</div>
                                            <div>Category</div>
                                            <div>Price</div>
                                            <div>Stock</div>
                                            <div>Actions</div>
                                        </div>
                                        <div className="divide-y">
                                            {filteredProducts.map((product) => (
                                                <div key={product.id} className="grid grid-cols-5 p-4 hover:bg-muted/50 items-center">
                                                    <div className="font-medium">{product.name}</div>
                                                    <div className="text-sm text-muted-foreground">{product.category}</div>
                                                    <div className="font-semibold">₹{product.price.toFixed(2)}</div>
                                                    <div className="text-green-600">In Stock</div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="outline" onClick={() => handleEditProduct(product.id, product.name)}>Edit</Button>
                                                        <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDeleteProduct(product.id, product.name)}>Delete</Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Prescriptions Tab */}
                    {activeTab === "prescriptions" && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Prescription Verification</h1>
                                <p className="text-muted-foreground">Review and approve customer prescriptions</p>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Pending Verifications ({prescriptions.length})</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {prescriptions.map((rx) => (
                                            <div key={rx.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <FileText className="h-6 w-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">{rx.id}</h3>
                                                        <p className="text-sm text-muted-foreground">Patient: {rx.patient}</p>
                                                        <p className="text-xs text-muted-foreground">Uploaded by {rx.uploadedBy} • {rx.time}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="outline" onClick={() => handleViewPrescription(rx.id)}>View Details</Button>
                                                    <Button variant="outline" className="text-red-600 hover:bg-red-50" onClick={() => handleRejectPrescription(rx.id)}>
                                                        <X className="h-4 w-4 mr-1" /> Reject
                                                    </Button>
                                                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleApprovePrescription(rx.id)}>
                                                        <Check className="h-4 w-4 mr-1" /> Approve
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === "users" && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">User Management</h1>
                                    <p className="text-muted-foreground">Manage customer accounts and activity</p>
                                </div>
                                <Button onClick={() => handleExport("Users")}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Export Users
                                </Button>
                            </div>

                            <Card>
                                <CardHeader>
                                    <div className="flex gap-4">
                                        <Input
                                            placeholder="Search users..."
                                            className="max-w-sm"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <Button variant="outline" onClick={handleFilter}>Filter</Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-md border">
                                        <div className="grid grid-cols-5 p-4 font-medium bg-muted">
                                            <div>Name</div>
                                            <div>Email</div>
                                            <div>Total Orders</div>
                                            <div>Joined</div>
                                            <div>Actions</div>
                                        </div>
                                        <div className="divide-y">
                                            {filteredUsers.map((user) => (
                                                <div key={user.id} className="grid grid-cols-5 p-4 hover:bg-muted/50 items-center">
                                                    <div className="font-medium">{user.name}</div>
                                                    <div className="text-sm text-muted-foreground">{user.email}</div>
                                                    <div>{user.orders}</div>
                                                    <div className="text-sm text-muted-foreground">{user.joined}</div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="outline" onClick={() => handleViewUser(user.id, user.name)}>View</Button>
                                                        <Button size="sm" variant="outline" onClick={() => handleEditUser(user.id, user.name)}>Edit</Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
