import asyncErrors from "../middleWares/errors/asyncErrors";
import Room from "../models/room";
import User from "../models/user.js";
import Booking from "../models/booking";

const getDashboard = asyncErrors(async (req, res, next) => {
  const roomsCount = await Room.countDocuments();
  const usersCount = await User.countDocuments();
  const bookingsCount = await Booking.countDocuments();

  const bookingsPriceGroup = await Booking.aggregate([
    {
      $group: {
        _id: null,
        sales: { $sum: "$amountPaid" },
      },
    },
  ]);

  const bookingsPrice =
    bookingsPriceGroup.length > 0 ? bookingsPriceGroup[0].sales : 0;
  const salesData = await Booking.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        totalSales: { $sum: "$amountPaid" },
      },
    },
  ]);
  const users = await User.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        allUsers: { $sum: "$email" },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    roomsCount,
    usersCount,
    bookingsCount,
    bookingsPrice,
    salesData,
    users,
  });
});

export { getDashboard };
