"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Upload, FileText, CheckCircle } from "lucide-react"
import Link from "next/link"
import { store } from "@/lib/store"

export default function UploadPrescriptionPage() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    const handleFile = (file: File) => {
        setSelectedFile(file)
        if (file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            setPreviewUrl(null)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedFile) return

        // Save to store
        store.savePrescription({
            id: `RX-${Math.floor(100 + Math.random() * 899)}`,
            patient: "Current User", // In a real app, this would be from auth
            uploadedBy: "Self",
            time: "Just now",
            status: "Pending",
            notes: (document.getElementById("notes") as HTMLTextAreaElement)?.value || ""
        })

        // Mock API call
        setTimeout(() => setIsSubmitted(true), 1000)
    }

    if (isSubmitted) {
        return (
            <div className="container flex flex-col items-center justify-center min-h-[60vh] py-12 text-center space-y-4">
                <div className="p-4 bg-green-100 rounded-full text-green-600">
                    <CheckCircle className="h-12 w-12" />
                </div>
                <h1 className="text-3xl font-bold">Prescription Uploaded!</h1>
                <p className="text-muted-foreground max-w-md">
                    Your prescription has been sent to our pharmacists for verification.
                    We will update you shortly via SMS/Email.
                </p>
                <div className="flex gap-4">
                    <Button asChild variant="outline">
                        <Link href="/">Back to Home</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container max-w-2xl px-4 py-12">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Upload Prescription</CardTitle>
                    <CardDescription>
                        Upload a clear image of your doctor&apos;s prescription. Our pharmacists will verify and process your order.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid w-full items-center gap-1.5">
                            <label
                                htmlFor="dropzone-file"
                                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${dragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25 bg-muted/50 hover:bg-muted/70"
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {previewUrl ? (
                                        <div className="relative w-full h-32 mb-2">
                                            <img
                                                src={previewUrl}
                                                alt="Prescription preview"
                                                className="h-full object-contain mx-auto rounded-md"
                                            />
                                            <p className="text-xs text-center mt-1 text-muted-foreground">{selectedFile?.name}</p>
                                        </div>
                                    ) : selectedFile ? (
                                        <div className="flex flex-col items-center">
                                            <FileText className="w-10 h-10 mb-3 text-primary" />
                                            <p className="text-sm font-medium">{selectedFile.name}</p>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG or PDF (MAX. 5MB)</p>
                                        </>
                                    )}
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    onChange={handleChange}
                                    accept="image/*,.pdf"
                                />
                            </label>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="notes" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Additional Notes (Optional)
                            </label>
                            <textarea
                                id="notes"
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                                placeholder="Mention any specific medicines or quantities..."
                            ></textarea>
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={!selectedFile}>
                            <FileText className="mr-2 h-4 w-4" />
                            Submit Prescription
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
