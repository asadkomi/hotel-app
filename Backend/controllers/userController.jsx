import User from "../models/user.js";
import asyncErrors from "../middleWares/errors/asyncErrors.jsx";

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

// // Forgot password   =>   /api/password/forgot
// const forgotPassword = asyncErrors(async (req, res, next) => {

//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//         return next(new ErrorHandler('User not found with this email', 404))
//     }

//     // Get reset token
//     const resetToken = user.getResetPasswordToken();

//     await user.save({ validateBeforeSave: false })

//     // Get origin
//     const { origin } = absoluteUrl(req)

//     // Create reset password url
//     const resetUrl = `${origin}/password/reset/${resetToken}`

//     const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n\ If you have not requested this email, then ignore it.`

//     try {
//         await sendEmail({
//             email: user.email,
//             subject: 'BookIT Password Recovery',
//             message
//         })

//         res.status(200).json({
//             success: true,
//             message: `Email sent to: ${user.email}`
//         })

//     } catch (error) {
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;

//         await user.save({ validateBeforeSave: false })

//         return next(new ErrorHandler(error.message, 500))
//     }

// })

// // Reset password   =>   /api/password/reset/:token
// const resetPassword = asyncErrors(async (req, res, next) => {

//     // Hash URL token
//     const resetPasswordToken = crypto.createHash('sha256').update(req.query.token).digest('hex');

//     const user = await User.findOne({
//         resetPasswordToken,
//         resetPasswordExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//         return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
//     }

//     if (req.body.password !== req.body.confirmPassword) {
//         return next(new ErrorHandler('Password does not match', 400))
//     }

//     // Setup the new password
//     user.password = req.body.password

//     user.resetPasswordToken = undefined
//     user.resetPasswordExpire = undefined

//     await user.save();

//     res.status(200).json({
//         success: true,
//         message: 'Password updated successfully'
//     })

// })

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

  // // Remove avatar
  // const image_id = user.avatar.public_id;
  // await cloudinary.v2.uploader.destroy(image_id)

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
  // forgotPassword,
  // resetPassword,
  allAdminUsers,
  getUserDetails,
  updateUser,
  deleteUser,
};
