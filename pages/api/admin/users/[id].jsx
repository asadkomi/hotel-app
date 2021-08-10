import nc from "next-connect";
import dbConnect from "../../../../Backend/database/dbConnect.jsx";
import {
  getUserDetails,
  updateUser,
  deleteUser,
} from "../../../../Backend/controllers/userController.jsx";
import onError from "../../../../Backend/middleWares/errors/error.jsx";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../Backend/middleWares/auth.jsx";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(getUserDetails);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).put(updateUser);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteUser);

export default handler;
