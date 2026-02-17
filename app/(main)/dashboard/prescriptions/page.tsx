"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, Upload } from "lucide-react"
import Link from "next/link"

export default function PrescriptionsPage() {
    const prescriptions = [
        { id: "RX-9921", date: "Feb 05, 2026", doctor: "Dr. Smith", status: "Verified" },
        { id: "RX-8842", date: "Feb 12, 2026", doctor: "Dr. Doe", status: "Pending Review" }
    ]

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
                {prescriptions.map((rx) => (
                    <Card key={rx.id}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-semibold">{rx.id}</CardTitle>
                            <FileText className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 text-sm">
                                    <span className="text-muted-foreground">Date:</span>
                                    <span>{rx.date}</span>
                                    <span className="text-muted-foreground">Doctor:</span>
                                    <span>{rx.doctor}</span>
                                    <span className="text-muted-foreground">Status:</span>
                                    <span className={rx.status === "Verified" ? "text-green-600" : "text-yellow-600 font-medium"}>
                                        {rx.status}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="flex-1" size="sm">View image</Button>
                                    <Button variant="outline" className="flex-1" size="sm">Download</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
