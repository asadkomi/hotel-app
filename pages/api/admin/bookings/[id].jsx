import nc from "next-connect";
import dbConnect from "../../../../Backend/database/dbConnect.jsx";
import { deleteBooking } from "../../../../Backend/controllers/bookingController.jsx";
import onError from "../../../../Backend/middleWares/errors/error.jsx";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../Backend/middleWares/auth.jsx";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteBooking);

export default handler;
