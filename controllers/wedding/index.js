const Wedding = require("../../models/wedding");
const bcrypt = require("bcrypt");
const decoded = require("jwt-decode");
const jwt = require("jsonwebtoken");

module.exports = {
  getListUser: async (req, res, next) => {
    try {
      const user = await Wedding.find().select("username");

      res.status(200).json({
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },

  getUserByUsernamePublic: async (req, res, next) => {
    try {
      const { username } = req.params;

      const user = await Wedding.findOne({
        username: username,
      }).select("-password -user_menu");

      res.status(200).json({
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },

  weddingUserLogin: async (req, res, next) => {
    try {
      const user = await Wedding.findOne({
        username: req.body.username,
      });

      if (!user) {
        res.status(400).json({
          isSuccess: false,
          message: "User tidak ditemukan!!!",
        });
      }

      const isCorrect = bcrypt.compareSync(req.body.password, user.password);

      if (!isCorrect) {
        res.status(400).json({
          isSuccess: false,
          message: "Wrong password or username!!!",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          user_menu: user.user_menu,
        },
        process.env.JWT_KEY
      );

      const { password, ...info } = user._doc;
      res.status(200).json({
        token,
      });
    } catch (err) {
      next(err);
    }
  },

  weddingRegisterUser: async (req, res, next) => {
    try {
      const hash = bcrypt.hashSync(req.body.password, 5);
      const newWedding = new Wedding({
        ...req.body,
        password: hash,
      });

      await newWedding.save();
      res.status(201).json({
        isSuccess: true,
        message: "Berhasil Register User",
      });
    } catch (err) {
      next(err);
    }
  },

  getUserByUsername: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;

      const tokenDecoded = decoded(token);

      const user = await Wedding.findOne({
        username: tokenDecoded.username,
      }).select("-password");

      res.status(200).json({
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },

  weddingUpdateLoveStory: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;

      const tokenDecoded = decoded(token);
      const { our_love_story } = req.body;

      await Wedding.findOneAndUpdate(
        {
          _id: tokenDecoded.id,
        },
        {
          our_love_story,
        }
      ).then(() => {
        res.status(200).json({
          isSuccess: true,
          message: "Success Update Love Story Form",
        });
      });
    } catch (err) {
      next(err);
    }
  },

  weddingUpdateShareLove: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;

      const tokenDecoded = decoded(token);
      const { share_love } = req.body;

      await Wedding.findOneAndUpdate(
        {
          _id: tokenDecoded.id,
        },
        {
          share_love,
        }
      ).then(() => {
        res.status(200).json({
          isSuccess: true,
          message: "Success Update Share Love Form",
        });
      });
    } catch (err) {
      next(err);
    }
  },

  weddingUpdateCountdown: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;

      const tokenDecoded = decoded(token);
      const { countdown } = req.body;

      await Wedding.findOneAndUpdate(
        {
          _id: tokenDecoded.id,
        },
        {
          countdown,
        }
      ).then(() => {
        res.status(200).json({
          isSuccess: true,
          message: "Success Update Information",
        });
      });
    } catch (err) {
      next(err);
    }
  },

  weddingUpdateBrideGroom: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;

      const tokenDecoded = decoded(token);
      const { bride_and_groom } = req.body;

      await Wedding.findOneAndUpdate(
        {
          _id: tokenDecoded.id,
        },
        {
          bride_and_groom,
        }
      ).then(() => {
        res.status(200).json({
          isSuccess: true,
          message: "Success Update Information",
        });
      });
    } catch (err) {
      next(err);
    }
  },
};
