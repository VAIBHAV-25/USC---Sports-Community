import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Participation from "@/models/Participation";

export async function GET() {
  try {
    await dbConnect();
    // Fetch all participations (usually for admin)
    const participations = await Participation.find({})
      .populate("eventId", "title date")
      .sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: participations });
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
    const participation = await Participation.create(body);
    return NextResponse.json({ success: true, data: participation }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
