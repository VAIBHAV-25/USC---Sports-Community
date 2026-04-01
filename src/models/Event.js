import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    mediaUrl: { type: String }, // optional image/video URL for past/featured events
    mediaType: { type: String, enum: ["image", "video"] },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
