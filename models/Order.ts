import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
    id: string;
    customer: string;
    customerEmail: string;
    items: any[];
    total: number;
    status: string;
    date: string;
    paymentMethod: string;
    shippingAddress: string;
}

const OrderSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    customer: { type: String, required: true },
    customerEmail: { type: String, required: true },
    items: { type: Array, required: true },
    total: { type: Number, required: true },
    status: { type: String, required: true, default: "Processing" },
    date: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    shippingAddress: { type: String, required: true },
});

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
