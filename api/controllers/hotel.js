const Hotel = require("../models/Hotel");

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    next(error);
  }
};

const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "resort", count: resortCount },
      { type: "apartment", count: apartmentCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHotel,
  deleteHotel,
  updateHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
};
