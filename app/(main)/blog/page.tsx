import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const blogPosts = [
    {
        id: 1,
        title: "Top 10 Immune-Boosting Foods",
        excerpt: "Discover the best superfoods to strengthen your immune system naturally this winter.",
        date: "October 15, 2023",
        author: "Dr. Sarah Johnson",
        category: "Nutrition",
        image: "bg-orange-100",
    },
    {
        id: 2,
        title: "Understanding Diabetes Management",
        excerpt: "A comprehensive guide to managing blood sugar levels through diet and lifestyle changes.",
        date: "November 2, 2023",
        author: "Dr. Mark Davis",
        category: "Health Tips",
        image: "bg-blue-100",
    },
    {
        id: 3,
        title: "Benefits of Daily Exercise",
        excerpt: "Why 30 minutes of daily activity can transform your physical and mental health.",
        date: "November 20, 2023",
        author: "Fitness Expert Jane Doe",
        category: "Lifestyle",
        image: "bg-green-100",
    },
    {
        id: 4,
        title: "Skincare 101: The Basics",
        excerpt: "Everything you need to know about building a simple and effective skincare routine.",
        date: "December 5, 2023",
        author: "Dermatologist Dr. Lee",
        category: "Beauty",
        image: "bg-pink-100",
    },
]

export default function BlogPage() {
    return (
        <div className="container px-4 md:px-6 py-12">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Health & Wellness Blog</h1>
                <p className="text-muted-foreground max-w-[700px]">
                    Expert advice, health tips, and wellness news to help you live a healthier life.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <Card key={post.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                        <div className={`h-48 w-full ${post.image} flex items-center justify-center`}>
                            <span className="text-muted-foreground opacity-50 font-bold">Blog Image</span>
                        </div>
                        <CardHeader>
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                                <span className="text-primary font-medium">{post.category}</span>
                                <span>{post.date}</span>
                            </div>
                            <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <CardDescription className="line-clamp-3">
                                {post.excerpt}
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="border-t pt-4">
                            <div className="flex items-center justify-between w-full">
                                <span className="text-sm font-medium">By {post.author}</span>
                                <Button variant="link" size="sm" className="px-0">Read More</Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
