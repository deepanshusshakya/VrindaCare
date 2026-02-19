import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    patient: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: String, // User Email
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    image: {
        type: String,
    },
    notes: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.models.Prescription || mongoose.model("Prescription", PrescriptionSchema);
