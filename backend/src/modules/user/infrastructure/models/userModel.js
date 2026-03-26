const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },

    xp: {
      type: Number,
      default: 0
    },

    level: {
      type: Number,
      default: 1
    },

    streak: {
      type: Number,
      default: 0
    },

    lastActiveDate: {
      type: Date,
      default: null
    },

    totalMinutes: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
