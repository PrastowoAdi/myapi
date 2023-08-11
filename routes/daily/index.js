const express = require("express");
const { dailyAdd, dailyUpdate, getDaily } = require("../../controllers/daily");

const router = express.Router();

router.post("/", dailyAdd);
router.get("/:username", getDaily);
router.put("/:id", dailyUpdate);

module.exports = router;
