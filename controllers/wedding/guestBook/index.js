const mongoose = require("mongoose");
const GuestBook = require("../../../models/wedding/guestBook");

module.exports = {
  guestAdd: async (req, res, next) => {
    try {
      const newGuest = new GuestBook({
        ...req.body,
      });
      await newGuest.save();
      res.status(201).json({
        isSuccess: true,
        message: "Berhasil Tambah Daftar Kehadiran",
      });
    } catch (err) {
      next(err);
    }
  },

  guestGet: async (req, res, next) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(200).json({ data: [] });

      const guest = await GuestBook.find({
        weddingId: id,
      }).sort({
        createdAt: "descending",
      });

      res.status(200).json({
        data: guest,
      });
    } catch (err) {
      next(err);
    }
  },
};
