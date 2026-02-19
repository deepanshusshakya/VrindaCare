"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, Upload } from "lucide-react"
import Link from "next/link"

import { useState, useEffect } from "react"
import { store, type Prescription } from "@/lib/store"

export default function PrescriptionsPage() {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPrescriptions = async () => {
            const user = store.getCurrentUser()
            if (user) {
                const data = await store.getPrescriptions(user.email)
                setPrescriptions(data)
            }
            setIsLoading(false)
        }
        fetchPrescriptions()
    }, [])

    return (
        <div className="container px-4 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold">My Prescriptions</h1>
                </div>
                <Button asChild>
                    <Link href="/upload-prescription">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New Rx
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                    <div className="col-span-full text-center py-12">Loading your prescriptions...</div>
                ) : prescriptions.length === 0 ? (
                    <Card className="col-span-full">
                        <CardContent className="py-12 text-center text-muted-foreground">
                            No prescriptions uploaded yet.
                        </CardContent>
                    </Card>
                ) : (
                    prescriptions.map((rx) => (
                        <Card key={rx.id}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-semibold">{rx.id}</CardTitle>
                                <FileText className="h-5 w-5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 text-sm">
                                        <span className="text-muted-foreground">Date:</span>
                                        <span>{new Date(rx.time).toLocaleDateString()}</span>
                                        <span className="text-muted-foreground">Patient:</span>
                                        <span>{rx.patient}</span>
                                        <span className="text-muted-foreground">Status:</span>
                                        <span className={`font-medium ${rx.status === "Approved" ? "text-green-600" : rx.status === "Rejected" ? "text-rose-600" : "text-amber-600"}`}>
                                            {rx.status}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" className="flex-1" size="sm" disabled={!rx.image}>View image</Button>
                                        <Button variant="outline" className="flex-1" size="sm" disabled={!rx.image}>Download</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
