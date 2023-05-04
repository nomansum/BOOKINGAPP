const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

const createError = require("../utils/error");

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const saveRoom = await newRoom.save();

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: saveRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(saveRoom);
  } catch (error) {
    next(error);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateRoom);
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;

  try {
    await Room.findByIdAndDelete(req.params.id);

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }

    res.status(200).json("Room has been deleted");
  } catch (error) {
    next(error);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
};
