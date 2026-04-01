import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    mediaUrl: { type: String, required: true },
    mediaType: { type: String, enum: ["image", "video"], required: true },
    description: { type: String },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" }, // optional link to a past event
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
