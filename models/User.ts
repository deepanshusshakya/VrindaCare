import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    orders: number;
    joined: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: "+91 98765 43210" },
    address: { type: String, default: "123 Health Dr, Wellness City, India" },
    orders: { type: Number, default: 0 },
    joined: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
