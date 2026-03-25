import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    type: {
      type: String,
      enum: ["focus", "short_break", "long_break"],
      default: "focus"
    },

    duration: {
      type: Number,
      required: true
    },

    xpEarned: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Session", sessionSchema);