const mongoose = require("mongoose");
const { Schema } = mongoose;

const GuestBook = new Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    kedatangan: {
      type: Boolean,
      required: true,
    },
    jumlah: {
      type: Number,
      required: true,
    },
    ucapan: {
      type: String,
      required: true,
    },
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GuestBook", GuestBook);
