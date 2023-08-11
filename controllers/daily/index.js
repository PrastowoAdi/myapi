const Daily = require("../../models/daily");

module.exports = {
  dailyAdd: async (req, res, next) => {
    try {
      const { activity } = req.body;
      if (activity === "") {
        res.status(400).json({
          isSuccess: false,
          message: "Activity is required!!!",
        });
      }
      const newDaily = new Daily({
        ...req.body,
      });
      await newDaily.save();
      res.status(201).json({
        isSuccess: true,
        message: "Berhasil Tambah Aktivitas",
      });
    } catch (err) {
      next(err);
    }
  },
  dailyUpdate: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { activity, work, date } = req.body;

      const dateTime = new Date();
      const dateUpdate = date + " " + dateTime.toLocaleTimeString();

      await Daily.findOneAndUpdate(
        {
          _id: id,
        },
        {
          activity,
          work,
          date: dateUpdate,
        }
      ).then(() => {
        res.status(200).json({
          isSuccess: true,
          message: "Success Update Activity",
          // data: { activity },
        });
      });
    } catch (err) {
      next(err);
    }
  },
  getDaily: async (req, res, next) => {
    try {
      const { username } = req.params;
      const user = await Daily.find({
        username,
      }).sort({ date: "ascending" });

      res.status(200).json({
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },
};
