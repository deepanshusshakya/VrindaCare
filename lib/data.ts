export interface Product {
    id: string
    name: string
    category: string
    price: number
    image?: string
    rating?: number
    slug?: string
    color?: string
    description?: string
    dosage?: string
    safetyWarning?: string
    stockStatus?: 'In Stock' | 'Out of Stock' | 'Only 2 Left'
    sku?: string
    manufacturer?: string
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

export const featuredProducts: Product[] = [
    {
        id: "1",
        name: "Vitamin C Serum",
        category: "Wellness",
        price: 25.99,
        image: "/images/vitaminc.jpg",
        rating: 4.8,
        description: "A potent Vitamin C serum that brightens skin tone and reduces signs of aging. Formulated with pure L-Ascorbic Acid for maximum effectiveness.",
        dosage: "Apply 2-3 drops to clean skin in the morning before moisturizer and sunscreen.",
        safetyWarning: "For external use only. Avoid contact with eyes. If irritation occurs, discontinue use.",
        stockStatus: 'In Stock',
        sku: "VC-SRM-001",
        manufacturer: "GlowHealth Labs"
    },
    {
        id: "1771266152659", // Dolo-650 ID from previous screen or similar
        name: "dolo 650",
        category: "Wellness",
        price: 150,
        image: "https://vcareforu.com/wp-content/uploads/2021/07/dolo-650-600x400.jpg",
        rating: 4.5,
        description: "Dolo 650 Tablet helps relieve pain and fever by blocking the release of certain chemical messengers responsible for fever and pain.",
        dosage: "Take 1 tablet every 4-6 hours as needed, or as directed by your physician. Do not exceed 4g in 24 hours.",
        safetyWarning: "May cause liver damage if taken in excess. Avoid alcohol while taking this medication.",
        stockStatus: 'In Stock',
        sku: "DOLO-650-TAB",
        manufacturer: "Micro Labs Ltd"
    },
    {
        id: "2",
        name: "Digital Thermometer",
        category: "Devices",
        price: 15.50,
        image: "/images/thermometer.jpg",
        rating: 4.6,
        description: "Fast and accurate digital thermometer for oral, underarm, or rectal use. Features a clear LCD display and fever alarm.",
        dosage: "Clean the tip before and after each use. Place under tongue or underarm for 60 seconds or until it beeps.",
        safetyWarning: "Do not allow children to use without supervision. Do not bite the thermometer.",
        stockStatus: 'Only 2 Left',
        sku: "DIG-THERM-88",
        manufacturer: "MediTech Solutions"
    },
    {
        id: "3",
        name: "Whey Protein",
        category: "Nutrition",
        price: 45.00,
        image: "/images/whey.jpg",
        rating: 4.9,
        description: "High-quality whey protein isolate for muscle recovery and growth. Low in fat and lactose, high in essential amino acids.",
        dosage: "Mix one scoop with 200ml of water or milk. Consume within 30 minutes post-workout.",
        safetyWarning: "This product contains milk and soy. Not intended as a sole source of nutrition.",
        stockStatus: 'In Stock',
        sku: "WHEY-ISO-2KG",
        manufacturer: "NutraVibe"
    },
    {
        id: "4",
        name: "Diabetic Care Kit",
        category: "Diabetes",
        price: 30.00,
        image: "/images/diabetes-kit.jpg",
        rating: 4.7,
        description: "Comprehensive kit for monitoring blood glucose levels. Includes meter, lancing device, and 50 test strips.",
        dosage: "Use according to the included user manual. Best results when taken before meals.",
        safetyWarning: "Consult your doctor for interpreting results. Keep strips in original container.",
        stockStatus: 'In Stock',
        sku: "DIA-KIT-PLUS",
        manufacturer: "GlucoseGuard"
    },
]

export function getAllProducts() {
    return featuredProducts
}

export function getProduct(id: string) {
    return featuredProducts.find((product) => product.id === id)
}
