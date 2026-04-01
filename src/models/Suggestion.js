import mongoose from "mongoose";

const SuggestionSchema = new mongoose.Schema(
  {
    sportName: { type: String, required: true },
    description: { type: String },
    upvotes: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Suggestion ||
  mongoose.model("Suggestion", SuggestionSchema);
