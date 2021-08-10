import User from "../models/user.js";
import asyncErrors from "../middleWares/errors/asyncErrors";

const registerUser = asyncErrors(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    success: true,
    message: "Account Registered successfully",
  });
});

const currentUser = asyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

const userProfile = asyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;

    if (req.body.password) user.password = req.body.password;
  }

  await user.save();

  res.status(200).json({
    success: true,
  });
});

const allAdminUsers = asyncErrors(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

const getUserDetails = asyncErrors(async (req, res) => {
  const user = await User.findById(req.query.id);

  if (!user) {
    return next(new ErrorHandler("User not found with this ID.", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

const updateUser = asyncErrors(async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.query.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

const deleteUser = asyncErrors(async (req, res) => {
  const user = await User.findById(req.query.id);

  if (!user) {
    return next(new ErrorHandler("User not found with this ID.", 404));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    user,
  });
});

export {
  registerUser,
  currentUser,
  userProfile,
  allAdminUsers,
  getUserDetails,
  updateUser,
  deleteUser,
};
