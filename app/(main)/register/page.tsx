"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Mail, Lock, ArrowRight, Github, Chrome, Facebook } from "lucide-react"
import { store } from "@/lib/store"
import { Logo } from "@/components/ui/logo"

export default function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        // Simulate API call
        setTimeout(() => {
            if (name && email && password.length >= 6) {
                // Mock successful registration
                store.login(email, name)
                router.push("/")
            } else {
                setError("Please fill all fields. Password must be at least 6 characters.")
            }
            setIsLoading(false)
        }, 1500)
    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-6">
                        <Logo />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create an account</h1>
                    <p className="text-slate-500">Enter your details to get started with VrindaCare</p>
                </div>

                {/* Card */}
                <div className="bg-white p-8 rounded-2xl shadow-xl shadow-emerald-900/5 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    className="pl-10 h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-10 h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
                                {error}
                            </div>
                        )}

                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" className="border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600" required />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600"
                            >
                                I agree to the <Link href="/terms" className="text-emerald-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creating account...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    Create account <ArrowRight className="h-4 w-4" />
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 text-slate-500 font-medium">Or sign up with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-11 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all">
                            <div className="flex items-center gap-2">
                                <Chrome className="h-4 w-4 text-slate-600" />
                                <span className="text-slate-700">Google</span>
                            </div>
                        </Button>
                        <Button variant="outline" className="h-11 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all">
                            <div className="flex items-center gap-2">
                                <Facebook className="h-4 w-4 text-emerald-600" />
                                <span className="text-slate-700">Facebook</span>
                            </div>
                        </Button>
                    </div>
                </div>

                {/* Footer Link */}
                <p className="text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
