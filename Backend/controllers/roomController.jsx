import Room from "../models/room";
import ErrorHandler from "../errors/errorHandler";
import catchAsyncErrors from "../middleWares/errors/catchAsyncErrors";
import Utilities from "../utilities/utilities.jsx";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllRooms = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 6;
  const roomsCount = await Room.countDocuments();
  const utilities = new Utilities(Room.find(), req.query).search().filter();
  let rooms = await utilities.query;
  let filterdRoom = rooms.length;

  utilities.pagination(resultPerPage);
  rooms = await utilities.query;

  res.status(200).json({
    success: true,
    roomsCount,
    resultPerPage,
    filterdRoom,
    rooms,
  });
});

const getOneRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room not found", 404));
  }
  res.status(200).json({
    success: true,
    room,
  });
});

const allAdminRooms = catchAsyncErrors(async (req, res) => {
  const rooms = await Room.find();

  res.status(200).json({
    success: true,
    rooms,
  });
});

const newRoom = catchAsyncErrors(async (req, res) => {
  const images = req.body.images;

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "hotels/rooms",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user._id;

  const room = await Room.create(req.body);

  res.status(200).json({
    success: true,
    room,
  });
});

const updateRoom = catchAsyncErrors(async (req, res) => {
  let room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this ID", 404));
  }

  if (req.body.images) {
    for (let i = 0; i < room.images.length; i++) {
      await cloudinary.v2.uploader.destroy(room.images[i]);
    }

    let imagesLinks = [];
    const images = req.body.images;

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "bookit/rooms",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    room,
  });
});

const deleteRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room not found", 404));
  }

  for (let i = 0; i < room.images.length; i++) {
    await cloudinary.v2.uploader.destroy(room.images[i].public_id);
  }
  await room.remove();

  res.status(200).json({
    success: true,
    message: "Room removed",
  });
});

export {
  getAllRooms,
  getOneRoom,
  updateRoom,
  deleteRoom,
  allAdminRooms,
  newRoom,
};
