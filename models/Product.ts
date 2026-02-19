import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    category: string;
    price: number;
    image?: string;
    rating?: number;
    description?: string;
    dosage?: string;
    safetyWarning?: string;
    stockStatus?: string;
    sku?: string;
    manufacturer?: string;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    rating: { type: Number, default: 4.5 },
    description: { type: String },
    dosage: { type: String },
    safetyWarning: { type: String },
    stockStatus: { type: String, default: 'In Stock' },
    sku: { type: String },
    manufacturer: { type: String },
});

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
