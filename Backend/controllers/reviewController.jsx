import Room from "../models/room";
import catchAsyncErrors from "../middleWares/errors/catchAsyncErrors";
import Booking from "../models/booking";

const createRoomReview = catchAsyncErrors(async (req, res) => {
  const { rating, comment, roomId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const room = await Room.findById(roomId);

  const isReviewed = room.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    room.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }

  room.ratings =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) /
    room.reviews.length;

  await room.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

const checkReviewAvailability = catchAsyncErrors(async (req, res) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ user: req.user._id, room: roomId });

  let isReviewAvailable = false;
  if (bookings.length > 0) isReviewAvailable = true;

  res.status(200).json({
    success: true,
    isReviewAvailable,
  });
});

const getRoomReviews = catchAsyncErrors(async (req, res) => {
  const room = await Room.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: room.reviews,
  });
});

const deleteReview = catchAsyncErrors(async (req, res) => {
  const room = await Room.findById(req.query.roomId);

  const reviews = room.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  await Room.findByIdAndUpdate(
    req.query.roomId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

export {
  createRoomReview,
  checkReviewAvailability,
  getRoomReviews,
  deleteReview,
};
