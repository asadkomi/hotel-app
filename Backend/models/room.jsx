import mongoose from "mongoose";

const room = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the name of the room"],
    trim: true,
    maxLength: [100, "Name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter the description of the room"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the price of the room"],
    maxLength: [5, "Name cannot exceed 5 characters"],
    default: 0.0,
  },
  address: {
    type: String,
    required: [true, "Please enter the address of the room"],
  },
  beds: {
    type: Number,
    required: [true, "Please enter the number of beds"],
  },
  guests: {
    type: Number,
    required: [true, "Please enter the number of guests"],
  },
  wifi: {
    type: Boolean,
    default: false,
  },
  conditioning: {
    type: Boolean,
    default: false,
  },
  heating: {
    type: Boolean,
    default: false,
  },
  tv: {
    type: Boolean,
    default: false,
  },
  pets: {
    type: Boolean,
    default: false,
  },

  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter the category of room"],
    enum: {
      values: ["King", "Queen", "Full"],
      message: "Pleas select a room size",
    },
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Room || mongoose.model("Room", room);
