import mongoose from "mongoose";

const ParticipationSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: false }, // Optional, could just be general
    name: { type: String, required: true },
    contact: { type: String, required: true }, // email or phone
    preferredSport: { type: String, required: true },
    availability: { type: String, required: true },
    requirements: { type: String }, // any other requirements
  },
  { timestamps: true }
);

export default mongoose.models.Participation ||
  mongoose.model("Participation", ParticipationSchema);
