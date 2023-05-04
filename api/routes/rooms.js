const express = require("express");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
} = require("../controllers/room");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);
router.get("/", getRooms);

router.route("/:id").get(getRoom).put(verifyAdmin, updateRoom);
router.route("/:id/:hotelid").delete(verifyAdmin, deleteRoom);

module.exports = router;
