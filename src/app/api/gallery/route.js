import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

export async function GET() {
  try {
    await dbConnect();
    const items = await Gallery.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const item = await Gallery.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
