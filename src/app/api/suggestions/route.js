import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Suggestion from "@/models/Suggestion";

export async function GET() {
  try {
    await dbConnect();
    const suggestions = await Suggestion.find({}).sort({ upvotes: -1 });
    return NextResponse.json({ success: true, data: suggestions });
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
    const suggestion = await Suggestion.create(body);
    return NextResponse.json({ success: true, data: suggestion }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
