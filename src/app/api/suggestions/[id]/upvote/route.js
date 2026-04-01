import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Suggestion from "@/models/Suggestion";

export async function POST(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const suggestion = await Suggestion.findByIdAndUpdate(
      id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    if (!suggestion) {
      return NextResponse.json({ success: false, error: "Suggestion not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: suggestion });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
