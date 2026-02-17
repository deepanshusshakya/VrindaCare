import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/data"

export default function CategoriesPage() {
    return (
        <div className="container px-4 md:px-6 py-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Shop by Category</h1>
                <p className="text-muted-foreground">Find the right medicines and products for your needs.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <Link key={category.id} href={`/category/${category.slug}`}>
                        <Card className="h-full hover:shadow-lg transition-shadow border-none bg-muted/30 hover:bg-muted/50">
                            <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                                <div className={`w-20 h-20 rounded-full ${category.color} flex items-center justify-center`}>
                                    <span className="text-3xl font-bold text-foreground/50">{category.name[0]}</span>
                                </div>
                                <span className="font-semibold text-lg text-foreground">{category.name}</span>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
