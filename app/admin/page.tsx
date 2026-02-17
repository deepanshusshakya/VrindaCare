"use client"

import { useState, useEffect } from "react"
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
    Download,
    Pill,
    Mail,
    Bell,
    Settings,
    LogOut,
    Plus,
    Filter,
    MoreVertical,
    ExternalLink,
    ChevronRight,
    Eye
} from "lucide-react"
import { getAllProducts, categories } from "@/lib/data"
import { useProducts } from "@/components/providers/product-provider"
import { store, type Order, type Prescription, type Inquiry, type User } from "@/lib/store"

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard")
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const { products, addProduct, deleteProduct, updateProduct } = useProducts()

    const [orders, setOrders] = useState<Order[]>([])
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
    const [inquiries, setInquiries] = useState<Inquiry[]>([])
    const [users, setUsers] = useState<User[]>([])

    // UI States
    const [toast, setToast] = useState<{ message: string, type: "success" | "error" | "info" } | null>(null)
    const [modal, setModal] = useState<{
        type: "order" | "product" | "user" | "prescription" | "form" | "inquiry",
        data: any
    } | null>(null)

    // Form state for adding/editing product
    const [productForm, setProductForm] = useState({
        id: "",
        name: "",
        category: "Wellness",
        price: "",
        image: ""
    })

    useEffect(() => {
        refreshData()
    }, [])

    const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 3000)
    }

    const refreshData = () => {
        setOrders(store.getOrders())
        setPrescriptions(store.getPrescriptions())
        setInquiries(store.getInquiries())
        setUsers(store.getUsers())
    }

    // Dashboard stats
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
    const stats = {
        totalOrders: orders.length,
        ordersTrend: 12.5,
        totalRevenue: totalRevenue,
        revenueTrend: 8.2,
        activeUsers: 856,
        usersTrend: -2.4,
        pendingPrescriptions: prescriptions.filter(p => p.status === "Pending").length,
        prescriptionsTrend: 5.1
    }

    // Derived Filtered Data
    const filteredProducts = products.filter(p =>
        !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filteredOrders = orders.filter(o =>
        !searchQuery || o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.id.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filteredPrescriptions = prescriptions.filter(p =>
        !searchQuery || p.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filteredInquiries = inquiries.filter(i =>
        !searchQuery || i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filteredUsers = users.filter(u =>
        !searchQuery || u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const recentOrders = orders.slice(0, 5)

    const handleAddNew = () => {
        if (activeTab === "inventory") {
            setProductForm({ id: "", name: "", category: "Wellness", price: "", image: "" })
            setModal({ type: "form", data: {} })
        } else if (activeTab === "orders") {
            showToast("Orders are usually created by customers, but you can manually record one here.", "info")
            // Could open a manual order form here
        } else if (activeTab === "users") {
            showToast("User registration is handled via the front-end.", "info")
        } else {
            showToast(`Adding new ${activeTab} is not yet implemented.`, "info")
        }
    }

    // Action Handlers
    const handleApprovePrescription = (id: string) => {
        store.updatePrescriptionStatus(id, "Approved")
        refreshData()
        showToast(`Prescription ${id} approved`)
        setModal(null)
    }

    const handleRejectPrescription = (id: string) => {
        store.updatePrescriptionStatus(id, "Rejected")
        refreshData()
        showToast(`Prescription ${id} rejected`, "error")
        setModal(null)
    }

    const handleUpdateOrderStatus = (id: string, status: Order["status"]) => {
        store.updateOrderStatus(id, status)
        refreshData()
        showToast(`Order ${id} status updated to ${status}`)
        setModal(null)
    }

    const handleUpdateInquiryStatus = (id: string, status: Inquiry["status"]) => {
        store.updateInquiryStatus(id, status)
        refreshData()
        showToast(`Inquiry status updated to ${status}`)
        setModal(null)
    }

    const handleDeleteInquiry = (id: string) => {
        store.deleteInquiry(id)
        refreshData()
        showToast("Inquiry deleted", "info")
    }

    const handleDeleteUser = (id: string) => {
        store.deleteUser(id)
        refreshData()
        showToast("User deleted", "info")
    }

    const handleSaveProduct = () => {
        if (!productForm.name || !productForm.price) {
            showToast("Please fill name and price", "error")
            return
        }

        if (productForm.id) {
            updateProduct({
                id: productForm.id,
                name: productForm.name,
                category: productForm.category,
                price: parseFloat(productForm.price),
                image: productForm.image || "/images/placeholder.jpg",
                slug: productForm.name.toLowerCase().replace(/ /g, "-")
            })
            showToast("Product updated successfully")
        } else {
            addProduct({
                name: productForm.name,
                category: productForm.category,
                price: parseFloat(productForm.price),
                image: productForm.image || "/images/placeholder.jpg"
            })
            showToast("Product added successfully")
        }

        setModal(null)
        setProductForm({ id: "", name: "", category: "Wellness", price: "", image: "" })
    }

    const handleDeleteProduct = (productId: string, productName: string) => {
        deleteProduct(productId)
        showToast(`Product "${productName}" deleted`, "info")
    }

    const handleExport = (type: string) => {
        let dataToExport: any[] = []
        if (activeTab === "orders") dataToExport = orders
        else if (activeTab === "inventory") dataToExport = products
        else if (activeTab === "users") dataToExport = users
        else if (activeTab === "inquiries") dataToExport = inquiries
        else if (activeTab === "dashboard") dataToExport = orders

        if (dataToExport.length === 0) {
            showToast("No data to export", "error")
            return
        }

        const headers = Object.keys(dataToExport[0]).join(",")
        const rows = dataToExport.map(row =>
            Object.values(row).map(value =>
                typeof value === 'object' ? JSON.stringify(value).replace(/,/g, ';') : value
            ).join(",")
        ).join("\n")

        const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", `${activeTab}_export_${new Date().toISOString().slice(0, 10)}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        showToast(`Exporting ${type} successful`, "success")
    }

    const handleLogout = () => {
        showToast("Logging out...", "info")
        setTimeout(() => {
            window.location.href = "/"
        }, 1000)
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "shipped": return "bg-purple-100 text-purple-800 border-purple-200"
            case "delivered": return "bg-green-100 text-green-800 border-green-200"
            case "cancelled": return "bg-red-100 text-red-800 border-red-200"
            case "approved": return "bg-green-100 text-green-800 border-green-200"
            case "pending": return "bg-amber-100 text-amber-800 border-amber-200"
            case "rejected": return "bg-red-100 text-red-800 border-red-200"
            case "new": return "bg-blue-100 text-blue-800 border-blue-200"
            case "read": return "bg-gray-100 text-gray-800 border-gray-200"
            case "replied": return "bg-emerald-100 text-emerald-800 border-emerald-200"
            default: return "bg-blue-100 text-blue-800 border-blue-200"
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex overflow-hidden">
            {/* Toast Notification */}
            {toast && (
                <div className={`fixed bottom-4 right-4 z-[99] p-4 rounded-lg shadow-xl animate-in fade-in slide-in-from-bottom-5 duration-300 flex items-center gap-2 border ${toast.type === "success" ? "bg-green-50 text-green-800 border-green-200" : toast.type === "error" ? "bg-red-50 text-red-800 border-red-200" : "bg-blue-50 text-blue-800 border-blue-200"}`}>
                    {toast.type === "success" ? <Check className="h-5 w-5" /> : toast.type === "error" ? <X className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                    <span className="font-medium">{toast.message}</span>
                </div>
            )}

            {/* Modal Overlay */}
            {modal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b flex items-center justify-between bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-900 capitalize">
                                {modal.type === "form" ? (modal.data.id ? "Edit Product" : "Add New Product") : `${modal.type} Details`}
                            </h3>
                            <button onClick={() => setModal(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1">
                            {modal.type === "form" && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Product Name</label>
                                        <Input
                                            value={productForm.name}
                                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                            placeholder="Enter drug name"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">Category</label>
                                            <select
                                                className="w-full px-4 py-2 border rounded-lg outline-none text-sm"
                                                value={productForm.category}
                                                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                                            >
                                                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">Price (₹)</label>
                                            <Input
                                                type="number"
                                                value={productForm.price}
                                                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Image URL</label>
                                        <Input
                                            value={productForm.image}
                                            onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                                            placeholder="/images/example.jpg"
                                        />
                                    </div>
                                    <Button
                                        onClick={handleSaveProduct}
                                        className="w-full h-12 text-lg mt-4"
                                    >
                                        {productForm.id ? "Update Product" : "Save Product"}
                                    </Button>
                                </div>
                            )}

                            {modal.type === "order" && (
                                <div className="space-y-0">
                                    <div className="p-0 space-y-8">
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Customer Information</p>
                                                <div className="space-y-1">
                                                    <p className="font-black text-gray-900 text-lg uppercase tracking-tight">{modal.data.customer}</p>
                                                    <p className="text-sm font-bold text-gray-500 leading-relaxed">{modal.data.shippingAddress}</p>
                                                    <p className="text-[10px] font-black text-primary mt-2 uppercase tracking-tighter">Verified Account</p>
                                                </div>
                                            </div>
                                            <div className="space-y-4 text-right">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Transaction Meta</p>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-bold text-gray-900">Date: <span className="font-black">{modal.data.date}</span></p>
                                                    <p className="text-sm font-bold text-gray-900">Payment: <span className="font-black text-emerald-600">Prepaid Online</span></p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Order Items</p>
                                            <div className="bg-gray-50/50 rounded-2xl border p-2 overflow-hidden">
                                                <div className="divide-y">
                                                    {modal.data.items?.map((item: any, idx: number) => (
                                                        <div key={idx} className="flex justify-between items-center p-4 hover:bg-white transition-all">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 bg-white border rounded-xl flex items-center justify-center font-black text-primary text-xs shadow-sm">{idx + 1}</div>
                                                                <div>
                                                                    <p className="font-black text-gray-900 text-sm italic">{item.name}</p>
                                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                                                                </div>
                                                            </div>
                                                            <p className="font-black text-gray-900 tracking-tighter">₹{(item.price * item.quantity).toFixed(2)}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="p-6 bg-white border-t flex justify-between items-center">
                                                    <p className="text-lg font-black text-gray-900 uppercase tracking-tight">Total Amount</p>
                                                    <p className="text-3xl font-black text-primary tracking-tighter">₹{modal.data.total}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Update Order Status</p>
                                            <div className="flex gap-4">
                                                <Button variant="outline" onClick={() => handleUpdateOrderStatus(modal.data.id, "Shipped")} className="flex-1 h-14 font-black rounded-2xl border-gray-200 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all uppercase text-xs tracking-widest">Mark Shipped</Button>
                                                <Button onClick={() => handleUpdateOrderStatus(modal.data.id, "Delivered")} className="flex-1 h-14 font-black rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 uppercase text-xs tracking-widest">Success Deliver</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {modal.type === "prescription" && (
                                <div className="space-y-8">
                                    <div className="bg-white border-2 border-dashed border-emerald-100 rounded-[2rem] p-4 relative overflow-hidden group">
                                        <div className="w-full h-48 bg-gray-50 flex items-center justify-center rounded-2xl">
                                            <FileText className="h-12 w-12 text-emerald-200" />
                                            <p className="absolute bottom-10 text-[10px] font-black uppercase text-emerald-300 tracking-widest">Secure Verification Tunnel</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="p-6 bg-gray-50 rounded-2xl border">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Patient Detail</p>
                                            <p className="font-extrabold text-gray-900 text-lg uppercase tracking-tight">{modal.data.patient}</p>
                                            <p className="text-[10px] text-emerald-600 font-bold uppercase mt-1 tracking-widest">Medical History: Checked</p>
                                        </div>
                                        <div className="p-6 bg-gray-50 rounded-2xl border">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Arrival Timeline</p>
                                            <p className="font-extrabold text-gray-900 text-lg uppercase tracking-tight">{modal.data.time}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Priority: High</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-4 border-t">
                                        <Button variant="outline" onClick={() => handleRejectPrescription(modal.data.id)} className="flex-1 h-16 font-black rounded-2xl border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-400 transition-all uppercase text-xs tracking-widest">Reject Record</Button>
                                        <Button onClick={() => handleApprovePrescription(modal.data.id)} className="flex-1 h-16 font-black rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-200 hover:scale-105 transition-all active:scale-95 uppercase text-xs tracking-widest">Verify & Approve</Button>
                                    </div>
                                </div>
                            )}

                            {modal.type === "inquiry" && (
                                <div className="space-y-8">
                                    <div className="p-6 bg-white border shadow-sm rounded-2xl space-y-4">
                                        <div className="flex items-center gap-4 border-b pb-4">
                                            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-200">{modal.data.name[0]}</div>
                                            <div>
                                                <p className="font-black text-gray-900 text-lg tracking-tight">{modal.data.name}</p>
                                                <p className="text-xs font-bold text-blue-600">{modal.data.email}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Subject Header</p>
                                            <p className="font-extrabold text-gray-900 text-xl tracking-tight italic">"{modal.data.subject}"</p>
                                        </div>
                                        <div className="p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Message Body</p>
                                            <p className="text-gray-700 text-sm leading-relaxed font-medium capitalize">{modal.data.message}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-4 border-t">
                                        <Button variant="outline" onClick={() => handleUpdateInquiryStatus(modal.data.id, "Read")} className="flex-1 h-14 font-black rounded-2xl border-gray-200 hover:bg-gray-100 transition-all uppercase text-xs tracking-widest">Mark as Read</Button>
                                        <Button onClick={() => handleUpdateInquiryStatus(modal.data.id, "Replied")} className="flex-1 h-14 font-black rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-200 hover:scale-105 transition-all active:scale-95 uppercase text-xs tracking-widest">Mark as Replied</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-72' : 'w-24'} bg-white border-r transition-all duration-500 hidden md:flex flex-col z-40 shadow-sm relative`}>
                <div className="p-8 flex items-center justify-between">
                    {sidebarOpen ? (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                                <Pill className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xl font-black text-gray-900 tracking-tight">Vrindacare</span>
                        </div>
                    ) : (
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto border border-primary/20">
                            <Pill className="h-6 w-6 text-primary" />
                        </div>
                    )}
                </div>

                <nav className="flex-1 px-4 space-y-1.5 mt-4">
                    {[
                        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
                        { id: "orders", icon: ShoppingCart, label: "Orders" },
                        { id: "inventory", icon: Package, label: "Inventory" },
                        { id: "prescriptions", icon: FileText, label: "Prescriptions" },
                        { id: "inquiries", icon: Mail, label: "Inquiries" },
                        { id: "users", icon: Users, label: "Users" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold group relative ${activeTab === item.id ? "bg-primary text-white shadow-xl shadow-primary/25" : "text-gray-500 hover:bg-gray-50 hover:text-primary"}`}
                        >
                            <item.icon className={`h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${activeTab === item.id ? "text-white" : "text-gray-400 group-hover:text-primary"}`} />
                            {sidebarOpen && <span className="text-sm">{item.label}</span>}
                            {activeTab === item.id && (
                                <div className="absolute left-0 w-1.5 h-6 bg-white rounded-r-full" />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-4 mt-auto border-t bg-gray-50/50">
                    {sidebarOpen ? (
                        <div className="bg-white p-4 rounded-2xl border shadow-sm flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black shadow-lg shadow-primary/20">V</div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-black text-gray-900 truncate">Vrindacare Admin</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Super Admin</p>
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-red-500 transition-colors" onClick={handleLogout}>
                                <LogOut className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-black mx-auto shadow-lg shadow-primary/20 cursor-pointer">V</div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-24 bg-white/80 backdrop-blur-md border-b flex items-center justify-between px-10 z-30 sticky top-0">
                    <div className="flex items-center gap-6 flex-1">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2.5 hover:bg-gray-100 rounded-xl transition-all border shadow-sm active:scale-95 group">
                            <Menu className={`h-5 w-5 text-gray-600 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
                        </button>

                        <div className="flex items-center gap-4 bg-gray-100 px-5 py-3 rounded-2xl border border-transparent focus-within:border-primary/30 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-primary/5 transition-all w-full max-w-md group">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab}...`}
                                className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder:text-gray-400 text-gray-700"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            className="p-3 bg-gray-50 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all relative border shadow-sm"
                            onClick={() => showToast("You have 3 new notifications", "info")}
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <button
                            className="p-3 bg-gray-50 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all border shadow-sm"
                            onClick={() => showToast("Settings panel coming soon", "info")}
                        >
                            <Settings className="h-5 w-5" />
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8 space-y-8 bg-gray-50/50 scroll-smooth">
                    {activeTab === "dashboard" && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
                                    <p className="text-gray-500 font-medium mt-1">Real-time status of your store.</p>
                                </div>
                                <Button variant="outline" onClick={() => handleExport("Full Report")}>
                                    <Download className="h-4 w-4 mr-2" /> Export
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { label: "Orders", value: stats.totalOrders, icon: ShoppingCart, trend: stats.ordersTrend, color: "emerald", bg: "bg-emerald-50", text: "text-emerald-600" },
                                    { label: "Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, trend: stats.revenueTrend, color: "blue", bg: "bg-blue-50", text: "text-blue-600" },
                                    { label: "Users", value: stats.activeUsers, icon: Users, trend: stats.usersTrend, color: "purple", bg: "bg-purple-50", text: "text-purple-600" },
                                    { label: "Verification", value: stats.pendingPrescriptions, icon: Pill, trend: stats.prescriptionsTrend, color: "amber", bg: "bg-amber-50", text: "text-amber-600" },
                                ].map((stat, i) => (
                                    <Card key={i} className="border-none shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 cursor-default group overflow-hidden relative">
                                        <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-full -mr-12 -mt-12 transition-transform duration-500 group-hover:scale-110 opacity-50`} />
                                        <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                                            <CardTitle className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</CardTitle>
                                            <div className={`p-2.5 ${stat.bg} ${stat.text} rounded-xl`}>
                                                <stat.icon className="h-5 w-5" />
                                            </div>
                                        </CardHeader>
                                        <CardContent className="relative z-10">
                                            <div className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</div>
                                            <div className={`flex items-center gap-1.5 text-xs font-bold mt-2 ${stat.trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${stat.trend > 0 ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                                                    {stat.trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                                    {Math.abs(stat.trend)}%
                                                </div>
                                                <span className="text-gray-400 font-medium">vs last month</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card className="border-none shadow-sm overflow-hidden">
                                    <CardHeader className="flex flex-row items-center justify-between bg-gray-50/50 pb-6 border-b">
                                        <div>
                                            <CardTitle className="text-xl font-black text-gray-900">Recent Transactions</CardTitle>
                                            <CardDescription className="text-xs font-bold text-gray-400 uppercase mt-1">Incoming medicine orders</CardDescription>
                                        </div>
                                        <Button variant="ghost" className="text-primary font-black text-xs uppercase tracking-widest hover:bg-primary/5" onClick={() => setActiveTab("orders")}>View All</Button>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y">
                                            {recentOrders.map((order) => (
                                                <div
                                                    key={order.id}
                                                    className="flex items-center justify-between p-6 hover:bg-gray-50 transition-all cursor-pointer group"
                                                    onClick={() => setModal({ type: "order", data: order })}
                                                >
                                                    <div className="flex gap-4 items-center">
                                                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center border transition-colors group-hover:border-primary/20 group-hover:bg-primary/5">
                                                            <ShoppingCart className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-gray-900 leading-tight">{order.customer}</p>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className="text-[10px] font-black text-gray-400 uppercase">{order.id}</span>
                                                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase border ${getStatusColor(order.status)}`}>{order.status}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-black text-primary text-lg">₹{order.total}</p>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{order.date}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {recentOrders.length === 0 && <div className="p-12 text-center text-gray-400 italic">No orders yet</div>}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-sm overflow-hidden">
                                    <CardHeader className="flex flex-row items-center justify-between bg-gray-50/50 pb-6 border-b">
                                        <div>
                                            <CardTitle className="text-xl font-black text-gray-900">Pending Approvals</CardTitle>
                                            <CardDescription className="text-xs font-bold text-gray-400 uppercase mt-1">Prescriptions waiting for verification</CardDescription>
                                        </div>
                                        <Button variant="ghost" className="text-primary font-black text-xs uppercase tracking-widest hover:bg-primary/5" onClick={() => setActiveTab("prescriptions")}>Review All</Button>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y">
                                            {prescriptions.filter(p => p.status === "Pending").map((rx) => (
                                                <div
                                                    key={rx.id}
                                                    className="flex items-center justify-between p-6 hover:bg-gray-50 transition-all cursor-pointer group"
                                                    onClick={() => setModal({ type: "prescription", data: rx })}
                                                >
                                                    <div className="flex gap-4 items-center">
                                                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                                            <FileText className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-gray-900 leading-tight">{rx.patient}</p>
                                                            <p className="text-[10px] font-black text-gray-400 uppercase mt-1">Uploaded {rx.time}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-right hidden sm:block">
                                                            <p className="text-[10px] font-black text-emerald-600 uppercase">Emergency</p>
                                                            <p className="text-[10px] font-bold text-gray-400">Review Required</p>
                                                        </div>
                                                        <Button size="sm" className="h-9 px-4 text-[10px] font-black uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95">Open Rx</Button>
                                                    </div>
                                                </div>
                                            ))}
                                            {prescriptions.filter(p => p.status === "Pending").length === 0 && (
                                                <div className="p-20 text-center space-y-3">
                                                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                                                        <Check className="h-8 w-8 text-emerald-500" />
                                                    </div>
                                                    <p className="font-black text-emerald-600 text-sm">All clear! No pending prescriptions.</p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeTab === "inventory" && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Medicine Inventory</h1>
                                    <p className="text-gray-500 font-medium">Manage prices and products.</p>
                                </div>
                                <Button
                                    className="px-8 py-6 h-auto text-lg font-black rounded-2xl shadow-xl shadow-primary/20"
                                    onClick={() => {
                                        setProductForm({ id: "", name: "", category: "Wellness", price: "", image: "" })
                                        setModal({ type: "form", data: {} })
                                    }}
                                >
                                    <Package className="h-6 w-6 mr-2" /> Add Medicine
                                </Button>
                            </div>

                            <div className="bg-white rounded-[2rem] shadow-sm border overflow-hidden">
                                <div className="p-6 border-b bg-gray-50/50 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-white border rounded-xl shadow-sm">
                                            <Filter className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <div className="flex gap-2">
                                            {["All", "Medicines", "Wellness", "Wellness"].map(cat => (
                                                <button key={cat} className="px-4 py-1.5 bg-white border rounded-full text-xs font-bold text-gray-500 hover:border-primary hover:text-primary transition-all shadow-sm">
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{products.length} Products Found</p>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b bg-white text-gray-400">
                                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest">Product Information</th>
                                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest">Category</th>
                                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest">Price</th>
                                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest">Status</th>
                                                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest pr-12">Manage</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {filteredProducts.map((product) => (
                                                <tr key={product.id} className="hover:bg-gray-50/50 transition-all group">
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-14 h-14 bg-gray-100 rounded-2xl overflow-hidden border p-2 group-hover:border-primary/20 group-hover:bg-white transition-all duration-500">
                                                                <img src={product.image || "/images/placeholder.jpg"} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                                            </div>
                                                            <div>
                                                                <p className="font-extrabold text-gray-900 text-sm">{product.name}</p>
                                                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5 tracking-tight">ID: {product.id.slice(-6)}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <span className="px-3.5 py-1 bg-white border text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">{product.category}</span>
                                                    </td>
                                                    <td className="px-8 py-5 font-black text-gray-900">₹{product.price}</td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-1.5">
                                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">In Stock</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-right pr-12">
                                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                            <button
                                                                onClick={() => {
                                                                    setProductForm({
                                                                        id: product.id,
                                                                        name: product.name,
                                                                        category: product.category,
                                                                        price: product.price.toString(),
                                                                        image: product.image || ""
                                                                    })
                                                                    setModal({ type: "form", data: product })
                                                                }}
                                                                className="p-2.5 bg-white border text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
                                                            >
                                                                <TrendingUp className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteProduct(product.id, product.name)}
                                                                className="p-2.5 bg-white border text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {["orders", "prescriptions", "users", "inquiries"].includes(activeTab) && (
                        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
                            <div className="flex items-center justify-between px-2">
                                <div>
                                    <h1 className="text-4xl font-black text-gray-900 tracking-tight capitalize">{activeTab}</h1>
                                    <p className="text-gray-500 font-bold mt-1 uppercase text-[10px] tracking-[0.3em]">Secure Record Management</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button variant="outline" className="h-12 px-6 rounded-2xl font-bold border-gray-200 shadow-sm transition-all hover:bg-white active:scale-95" onClick={() => (handleExport as any)(activeTab)}>
                                        <Download className="h-4 w-4 mr-2" /> Export
                                    </Button>
                                    <Button className="h-12 px-8 rounded-2xl font-black shadow-xl shadow-primary/20 transition-all active:scale-95" onClick={handleAddNew}>
                                        <Plus className="h-5 w-5 mr-2" /> Add {activeTab === "users" ? "User" : "Record"}
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-white rounded-[2rem] shadow-sm border overflow-hidden">
                                <div className="p-6 border-b bg-gray-50/50 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-2">
                                            {["All", "Pending", "Success", "Secondary"].map(f => (
                                                <button key={f} className="px-5 py-2 bg-white border rounded-xl text-xs font-black text-gray-500 hover:border-primary hover:text-primary transition-all shadow-sm uppercase tracking-widest">
                                                    {f}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-2 bg-white border rounded-xl shadow-sm cursor-pointer hover:bg-gray-50">
                                        <Filter className="h-4 w-4 text-gray-400" />
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b bg-white text-gray-400">
                                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest">Core Information</th>
                                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest">ID / Type</th>
                                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest">Status / Value</th>
                                                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest">Date / Time</th>
                                                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest pr-12">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {activeTab === "orders" && filteredOrders.map((order) => (
                                                <tr key={order.id} className="hover:bg-gray-50/50 transition-all group cursor-pointer" onClick={() => setModal({ type: "order", data: order })}>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-black shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                                                <ShoppingCart className="h-5 w-5" />
                                                            </div>
                                                            <div>
                                                                <p className="font-extrabold text-gray-900 leading-tight">{order.customer}</p>
                                                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Pharmacy Order</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="text-xs font-black text-primary bg-primary/5 px-2 py-1 rounded-lg border border-primary/10">{order.id}</span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="space-y-1">
                                                            <span className={`px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>{order.status}</span>
                                                            <p className="text-sm font-black text-gray-900 tracking-tighter">₹{order.total}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="text-xs font-bold text-gray-700">{order.date}</p>
                                                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter mt-1">Recorded</p>
                                                    </td>
                                                    <td className="px-8 py-6 text-right pr-12">
                                                        <button className="p-3 bg-gray-100 text-gray-400 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all active:scale-95">
                                                            <ChevronRight className="h-5 w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {activeTab === "prescriptions" && filteredPrescriptions.map((prescription) => (
                                                <tr key={prescription.id} className="hover:bg-gray-50/50 transition-all group cursor-pointer" onClick={() => setModal({ type: "prescription", data: prescription })}>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                                                <FileText className="h-5 w-5" />
                                                            </div>
                                                            <div>
                                                                <p className="font-extrabold text-gray-900 leading-tight">{prescription.patient}</p>
                                                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Medical Record</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">{prescription.id}</span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border ${getStatusColor(prescription.status)}`}>{prescription.status}</span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="text-xs font-bold text-gray-700">{prescription.time}</p>
                                                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter mt-1">Uploaded</p>
                                                    </td>
                                                    <td className="px-8 py-6 text-right pr-12">
                                                        <button className="p-3 bg-gray-100 text-gray-400 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all active:scale-95">
                                                            <Eye className="h-5 w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {activeTab === "inquiries" && filteredInquiries.map((inquiry) => (
                                                <tr key={inquiry.id} className="hover:bg-gray-50/50 transition-all group cursor-pointer" onClick={() => setModal({ type: "inquiry", data: inquiry })}>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                                <Mail className="h-5 w-5" />
                                                            </div>
                                                            <div className="max-w-[200px] overflow-hidden">
                                                                <p className="font-extrabold text-gray-900 leading-tight truncate">{inquiry.subject}</p>
                                                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 italic">{inquiry.name}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100 truncate max-w-[150px] inline-block">{inquiry.email}</span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border ${getStatusColor(inquiry.status)}`}>{inquiry.status}</span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="text-xs font-bold text-gray-700">{inquiry.date}</p>
                                                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter mt-1">Inquiry Sent</p>
                                                    </td>
                                                    <td className="px-8 py-6 text-right pr-12 flex gap-2 justify-end">
                                                        <button
                                                            className="p-3 bg-rose-50 text-rose-400 rounded-2xl hover:bg-rose-600 hover:text-white transition-all active:scale-95"
                                                            onClick={(e) => { e.stopPropagation(); handleDeleteInquiry(inquiry.id); }}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                        <button className="p-3 bg-gray-100 text-gray-400 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all active:scale-95">
                                                            <ChevronRight className="h-5 w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {activeTab === "users" && filteredUsers.map((user) => (
                                                <tr key={user.id} className="hover:bg-gray-50/50 transition-all group">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center font-black shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-all">
                                                                <Users className="h-5 w-5" />
                                                            </div>
                                                            <div>
                                                                <p className="font-extrabold text-gray-900 leading-tight">{user.name}</p>
                                                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 italic">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="text-xs font-black text-purple-600 bg-purple-50 px-2 py-1 rounded-lg border border-purple-100">{user.id}</span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="space-y-1">
                                                            <span className="px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border bg-emerald-50 text-emerald-600 border-emerald-100">Active</span>
                                                            <p className="text-sm font-black text-gray-900 tracking-tighter">{user.orders} Orders</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="text-xs font-bold text-gray-700">{user.joined}</p>
                                                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter mt-1">Joined</p>
                                                    </td>
                                                    <td className="px-8 py-6 text-right pr-12">
                                                        <button
                                                            className="p-3 bg-rose-50 text-rose-400 rounded-2xl hover:bg-rose-600 hover:text-white transition-all active:scale-95"
                                                            onClick={() => handleDeleteUser(user.id)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
