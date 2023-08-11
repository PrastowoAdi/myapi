const mongoose = require("mongoose");
const { Schema } = mongoose;

const DailySchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    activity: {
      type: String,
      required: true,
    },
    work: {
      type: String,
      required: true,
      default: "WFH",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Daily", DailySchema);
