import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Prescription from "@/models/Prescription";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        await dbConnect();

        let query = {};
        if (email) {
            query = { uploadedBy: email };
        }

        const prescriptions = await Prescription.find(query).sort({ createdAt: -1 });
        return NextResponse.json(prescriptions);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await dbConnect();
        const prescription = await Prescription.create({
            ...body,
            time: body.time || new Date().toISOString()
        });
        return NextResponse.json(prescription);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { id, status } = await req.json();
        await dbConnect();
        const prescription = await Prescription.findOneAndUpdate(
            { id },
            { status },
            { new: true }
        );
        return NextResponse.json(prescription);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        await dbConnect();
        await Prescription.findOneAndDelete({ id });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
