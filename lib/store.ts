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

const ORDERS_KEY = "vrindacare_orders"
const PRESCRIPTIONS_KEY = "vrindacare_prescriptions"
const INQUIRIES_KEY = "vrindacare_inquiries"

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
    }
}
