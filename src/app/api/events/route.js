import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET() {
  try {
    await dbConnect();
    // Fetch upcoming events sorted by date
    const events = await Event.find({}).sort({ date: 1 });
    return NextResponse.json({ success: true, data: events });
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
    const event = await Event.create(body);
    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
