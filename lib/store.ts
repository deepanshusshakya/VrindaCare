"use client"

export type Order = {
    id: string
    customer: string
    customerEmail: string
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
    phone?: string
    address?: string
}

export const store = {
    // ASYNC API METHODS

    // ORDERS
    getOrders: async (email?: string): Promise<Order[]> => {
        try {
            const url = email ? `/api/orders?email=${email}` : '/api/orders';
            const res = await fetch(url);
            if (!res.ok) return [];
            return await res.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    },
    saveOrder: async (order: Order) => {
        try {
            await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            });
        } catch (e) {
            console.error(e);
        }
    },
    updateOrderStatus: async (id: string, status: Order["status"]) => {
        try {
            await fetch('/api/orders', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
        } catch (e) {
            console.error(e);
        }
    },

    // PRESCRIPTIONS
    getPrescriptions: async (email?: string): Promise<Prescription[]> => {
        try {
            const url = email ? `/api/prescriptions?email=${email}` : '/api/prescriptions';
            const res = await fetch(url);
            if (!res.ok) return [];
            return await res.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    },
    savePrescription: async (prescription: Prescription) => {
        try {
            await fetch('/api/prescriptions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(prescription)
            });
        } catch (e) {
            console.error(e);
        }
    },
    updatePrescriptionStatus: async (id: string, status: Prescription["status"]) => {
        try {
            await fetch('/api/prescriptions', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
        } catch (e) {
            console.error(e);
        }
    },
    deletePrescription: async (id: string) => {
        try {
            await fetch(`/api/prescriptions?id=${id}`, { method: 'DELETE' });
        } catch (e) {
            console.error(e);
        }
    },

    // INQUIRIES
    getInquiries: async (): Promise<Inquiry[]> => {
        try {
            const res = await fetch('/api/inquiries');
            if (!res.ok) return [];
            return await res.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    },
    saveInquiry: async (inquiry: Inquiry) => {
        try {
            await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inquiry)
            });
        } catch (e) {
            console.error(e);
        }
    },
    updateInquiryStatus: async (id: string, status: Inquiry["status"]) => {
        try {
            await fetch('/api/inquiries', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
        } catch (e) {
            console.error(e);
        }
    },
    deleteInquiry: async (id: string) => {
        try {
            await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' });
        } catch (e) {
            console.error(e);
        }
    },

    // USERS
    getUsers: async (): Promise<User[]> => {
        try {
            const res = await fetch('/api/users');
            if (!res.ok) return [];
            return await res.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    },
    saveUser: async (user: User) => {
        // This is usually handled by auth/login, but for admin manual creation:
        try {
            await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
        } catch (e) {
            console.error(e);
        }
    },
    deleteUser: async (id: string) => {
        try {
            await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
        } catch (e) {
            console.error(e);
        }
    },

    // AUTH (Using localStorage for session persistence)
    getCurrentUser: (): User | null => {
        if (typeof window === "undefined") return null
        const saved = localStorage.getItem("vrindacare_current_user")
        return saved ? JSON.parse(saved) : null
    },
    login: async (email: string, name: string) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name })
            });
            const user = await res.json();
            localStorage.setItem("vrindacare_current_user", JSON.stringify(user))
            window.dispatchEvent(new Event("auth-change"))
            return user;
        } catch (e) {
            console.error(e);
            return null;
        }
    },
    logout: () => {
        localStorage.removeItem("vrindacare_current_user")
        window.dispatchEvent(new Event("auth-change"))
    }
}
