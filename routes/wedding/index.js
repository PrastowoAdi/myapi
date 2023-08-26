const express = require("express");
const {
  weddingUserLogin,
  getUserByUsername,
  getUserByUsernamePublic,
  weddingRegisterUser,
  weddingUpdateBrideGroom,
  weddingUpdateCountdown,
  weddingUpdateLoveStory,
  weddingUpdateShareLove,
  getListUser,
} = require("../../controllers/wedding");
const { verifyToken } = require("../../middleware");
const { guestAdd, guestGet } = require("../../controllers/wedding/guestBook");
const router = express.Router();

router.get("/", getListUser);
router.get("/detail/:username", getUserByUsernamePublic);
router.get("/user", verifyToken, getUserByUsername);
router.post("/login", weddingUserLogin);
router.post("/register", weddingRegisterUser);
router.put("/user-love-story", verifyToken, weddingUpdateLoveStory);
router.put("/user-share-love", verifyToken, weddingUpdateShareLove);
router.put("/user-countdown", verifyToken, weddingUpdateCountdown);
router.put("/user-bridegroom", verifyToken, weddingUpdateBrideGroom);

router.post("/guestbook", guestAdd);
router.get("/guestbook/:id", guestGet);

module.exports = router;
