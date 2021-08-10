import Booking from "../models/booking.jsx";

import ErrorHandler from "../errors/errorHandler.jsx";
import asyncErrors from "../middleWares/errors/asyncErrors.jsx";

import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

const newBooking = asyncErrors(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });

  res.status(200).json({
    success: true,
    booking,
  });
});

const checkRoomBookingAvailability = asyncErrors(async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.query;

  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate,
        },
      },
      {
        checkOutDate: {
          $gte: checkInDate,
        },
      },
    ],
  });

  let isAvailable;

  if (bookings && bookings.length === 0) {
    isAvailable = true;
  } else {
    isAvailable = false;
  }

  res.status(200).json({
    success: true,
    isAvailable,
  });
});

const checkBookedDatesOfRoom = asyncErrors(async (req, res) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ room: roomId });

  let bookedDates = [];

  const timeDiffernece = moment().utcOffset() / 60;

  bookings.forEach((booking) => {
    const checkInDate = moment(booking.checkInDate).add(
      timeDiffernece,
      "hours"
    );
    const checkOutDate = moment(booking.checkOutDate).add(
      timeDiffernece,
      "hours"
    );

    const range = moment.range(moment(checkInDate), moment(checkOutDate));

    const dates = Array.from(range.by("day"));
    bookedDates = bookedDates.concat(dates);
  });

  res.status(200).json({
    success: true,
    bookedDates,
  });
});

const myBookings = asyncErrors(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate({
      path: "room",
      select: "name price images",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    success: true,
    bookings,
  });
});

const getBookingDetails = asyncErrors(async (req, res) => {
  const booking = await Booking.findById(req.query.id)
    .populate({
      path: "room",
      select: "name price images",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    success: true,
    booking,
  });
});

const allAdminBookings = asyncErrors(async (req, res) => {
  const bookings = await Booking.find()
    .populate({
      path: "room",
      select: "name price images",
    })
    .populate({
      path: "user",
      select: "name email",
    });

  res.status(200).json({
    success: true,
    bookings,
  });
});

const deleteBooking = asyncErrors(async (req, res, next) => {
  const booking = await Booking.findById(req.query.id);

  if (!booking) {
    return next(new ErrorHandler("Booking not found with this ID", 404));
  }

  await booking.remove();

  res.status(200).json({
    success: true,
  });
});

export {
  newBooking,
  checkRoomBookingAvailability,
  checkBookedDatesOfRoom,
  myBookings,
  getBookingDetails,
  allAdminBookings,
  deleteBooking,
};