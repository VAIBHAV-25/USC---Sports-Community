import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Poll from "@/models/Poll";

export async function GET() {
  try {
    await dbConnect();
    const polls = await Poll.find({ active: true }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: polls });
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
    const poll = await Poll.create(body);
    return NextResponse.json({ success: true, data: poll }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
