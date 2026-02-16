export interface Product {
    id: string
    name: string
    category: string
    price: number
    image?: string
    rating?: number
    slug?: string
    color?: string
}

export const categories = [
    { id: "1", name: "Wellness", slug: "wellness", image: "/images/wellness.jpg", color: "bg-blue-100" },
    { id: "2", name: "Diabetes", slug: "diabetes", image: "/images/diabetes.jpg", color: "bg-green-100" },
    { id: "3", name: "Baby Care", slug: "baby-care", image: "/images/baby.jpg", color: "bg-pink-100" },
    { id: "4", name: "Personal Care", slug: "personal-care", image: "/images/personal.jpg", color: "bg-purple-100" },
    { id: "5", name: "Ayurveda", slug: "ayurveda", image: "/images/ayurveda.jpg", color: "bg-orange-100" },
    { id: "6", name: "Homeopathy", slug: "homeopathy", image: "/images/homeopathy.jpg", color: "bg-yellow-100" },
    { id: "7", name: "Nutrition", slug: "nutrition", image: "/images/nutrition.jpg", color: "bg-teal-100" },
    { id: "8", name: "Devices", slug: "devices", image: "/images/devices.jpg", color: "bg-indigo-100" },
]

export const featuredProducts = [
    {
        id: "1",
        name: "Vitamin C Serum",
        category: "Wellness",
        price: 25.99,
        image: "/images/vitaminc.jpg",
        rating: 4.8,
    },
    {
        id: "2",
        name: "Digital Thermometer",
        category: "Devices",
        price: 15.50,
        image: "/images/thermometer.jpg",
        rating: 4.6,
    },
    {
        id: "3",
        name: "Whey Protein",
        category: "Nutrition",
        price: 45.00,
        image: "/images/whey.jpg",
        rating: 4.9,
    },
    {
        id: "4",
        name: "Diabetic Care Kit",
        category: "Diabetes",
        price: 30.00,
        image: "/images/diabetes-kit.jpg",
        rating: 4.7,
    },
]

export function getAllProducts() {
    return featuredProducts
}

export function getProduct(id: string) {
    return featuredProducts.find((product) => product.id === id)
}
