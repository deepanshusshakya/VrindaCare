"use client"

export type Order = {
    id: string
    customer: string
    items: any[]
    total: number
    status: "Processing" | "Shipped" | "Delivered" | "Cancelled"
    date: string
    paymentMethod: string
    shippingAddress: string
}

export type Prescription = {
    id: string
    patient: string
    uploadedBy: string
    time: string
    status: "Pending" | "Approved" | "Rejected"
    image?: string
    notes?: string
}

export type Inquiry = {
    id: string
    name: string
    email: string
    subject: string
    message: string
    date: string
    status: "New" | "Read" | "Replied"
}

export type User = {
    id: string
    name: string
    email: string
    orders: number
    joined: string
}

const ORDERS_KEY = "vrindacare_orders"
const PRESCRIPTIONS_KEY = "vrindacare_prescriptions"
const INQUIRIES_KEY = "vrindacare_inquiries"
const USERS_KEY = "vrindacare_users"

export const store = {
    getOrders: (): Order[] => {
        if (typeof window === "undefined") return []
        const saved = localStorage.getItem(ORDERS_KEY)
        return saved ? JSON.parse(saved) : []
    },
    saveOrder: (order: Order) => {
        const orders = store.getOrders()
        localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...orders]))
    },
    updateOrderStatus: (id: string, status: Order["status"]) => {
        const orders = store.getOrders()
        const updated = orders.map(o => o.id === id ? { ...o, status } : o)
        localStorage.setItem(ORDERS_KEY, JSON.stringify(updated))
    },
    getPrescriptions: (): Prescription[] => {
        if (typeof window === "undefined") return []
        const saved = localStorage.getItem(PRESCRIPTIONS_KEY)
        return saved ? JSON.parse(saved) : []
    },
    savePrescription: (prescription: Prescription) => {
        const prescriptions = store.getPrescriptions()
        localStorage.setItem(PRESCRIPTIONS_KEY, JSON.stringify([prescription, ...prescriptions]))
    },
    updatePrescriptionStatus: (id: string, status: Prescription["status"]) => {
        const prescriptions = store.getPrescriptions()
        const updated = prescriptions.map(p => p.id === id ? { ...p, status } : p)
        localStorage.setItem(PRESCRIPTIONS_KEY, JSON.stringify(updated))
    },
    getInquiries: (): Inquiry[] => {
        if (typeof window === "undefined") return []
        const saved = localStorage.getItem(INQUIRIES_KEY)
        return saved ? JSON.parse(saved) : []
    },
    saveInquiry: (inquiry: Inquiry) => {
        const inquiries = store.getInquiries()
        localStorage.setItem(INQUIRIES_KEY, JSON.stringify([inquiry, ...inquiries]))
    },
    updateInquiryStatus: (id: string, status: Inquiry["status"]) => {
        const inquiries = store.getInquiries()
        const updated = inquiries.map(i => i.id === id ? { ...i, status } : i)
        localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated))
    },
    deleteInquiry: (id: string) => {
        const inquiries = store.getInquiries()
        const updated = inquiries.filter(i => i.id !== id)
        localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated))
    },
    getUsers: (): User[] => {
        if (typeof window === "undefined") return []
        const saved = localStorage.getItem(USERS_KEY)
        if (!saved) {
            const initialUsers: User[] = [
                { id: "USR-001", name: "Rahul Verma", email: "rahul@example.com", orders: 12, joined: "Jan 2024" },
                { id: "USR-002", name: "Anita Desai", email: "anita@example.com", orders: 8, joined: "Feb 2024" },
                { id: "USR-003", name: "Karan Mehta", email: "karan@example.com", orders: 15, joined: "Dec 2023" },
                { id: "USR-004", name: "Pooja Iyer", email: "pooja@example.com", orders: 5, joined: "Mar 2024" },
            ]
            localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers))
            return initialUsers
        }
        return JSON.parse(saved)
    },
    saveUser: (user: User) => {
        const users = store.getUsers()
        localStorage.setItem(USERS_KEY, JSON.stringify([user, ...users]))
    },
    deleteUser: (id: string) => {
        const users = store.getUsers()
        const updated = users.filter(u => u.id !== id)
        localStorage.setItem(USERS_KEY, JSON.stringify(updated))
    }
}
