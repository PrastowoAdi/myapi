const express = require("express");
const {
  weddingUserLogin,
  getUserByUsername,
  weddingRegisterUser,
  weddingUpdateBrideGroom,
  weddingUpdateCountdown,
  weddingUpdateLoveStory,
  weddingUpdateShareLove,
} = require("../../controllers/wedding");
const { verifyToken } = require("../../middleware");
const router = express.Router();

router.post("/login", weddingUserLogin);
router.post("/register", weddingRegisterUser);
router.post("/register", weddingRegisterUser);
router.get("/user", verifyToken, getUserByUsername);
router.put("/user-love-story", verifyToken, weddingUpdateLoveStory);
router.put("/user-share-love", verifyToken, weddingUpdateShareLove);
router.put("/user-countdown", verifyToken, weddingUpdateCountdown);
router.put("/user-bridegroom", verifyToken, weddingUpdateBrideGroom);

module.exports = router;
