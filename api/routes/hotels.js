const express = require("express");
const {
  createHotel,
  deleteHotel,
  updateHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
} = require("../controllers/hotel");
const { verifyAdmin } = require("../utils/verifyToken");
const router = express.Router();

router.route("/").post(verifyAdmin, createHotel).get(getHotels);

router.get("/find/:id", getHotel);
router.delete("/:id", verifyAdmin, deleteHotel);
router.put("/:id", verifyAdmin, updateHotel);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

module.exports = router;
