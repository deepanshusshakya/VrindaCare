import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        const { email, name } = await req.json();
        await dbConnect();

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                joined: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
            });
        }

        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
