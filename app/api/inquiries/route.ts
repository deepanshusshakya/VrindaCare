import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Inquiry from "@/models/Inquiry";

export async function GET() {
    try {
        await dbConnect();
        const inquiries = await Inquiry.find({}).sort({ date: -1 });
        return NextResponse.json(inquiries);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await dbConnect();
        const inquiry = await Inquiry.create({
            ...body,
            date: body.date || new Date().toISOString()
        });
        return NextResponse.json(inquiry);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { id, status } = await req.json();
        await dbConnect();
        const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
        return NextResponse.json(inquiry);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        await dbConnect();
        await Inquiry.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
