import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Poll from "@/models/Poll";

export async function POST(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { optionIndex } = await request.json();

    const poll = await Poll.findById(id);
    if (!poll) {
      return NextResponse.json({ success: false, error: "Poll not found" }, { status: 404 });
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return NextResponse.json({ success: false, error: "Invalid option index" }, { status: 400 });
    }

    poll.options[optionIndex].votes += 1;
    await poll.save();

    return NextResponse.json({ success: true, data: poll });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
