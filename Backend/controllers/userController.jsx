import User from "../models/user.js";
import catchAsyncErrors from "../middleWares/errors/catchAsyncErrors";

const registerUser = catchAsyncErrors(async (req, res) => {
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

const currentUser = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

const userProfile = catchAsyncErrors(async (req, res) => {
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

const allAdminUsers = catchAsyncErrors(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

const getUserDetails = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.query.id);

  if (!user) {
    return next(new ErrorHandler("User not found with this ID.", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

const updateUser = catchAsyncErrors(async (req, res) => {
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

const deleteUser = catchAsyncErrors(async (req, res) => {
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
