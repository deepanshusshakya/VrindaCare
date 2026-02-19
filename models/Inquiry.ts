import mongoose, { Schema, Document } from "mongoose";

export interface IInquiry extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    date: string;
}

const InquirySchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "New" },
    date: { type: String, required: true },
});

export default mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
