import nc from "next-connect";
import dbConnect from "../../../../Backend/database/dbConnect.jsx";
import { allAdminRooms } from "../../../../Backend/controllers/roomController.jsx";
import onError from "../../../../Backend/middleWares/errors/error.jsx";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../Backend/middleWares/auth.jsx";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminRooms);

export default handler;
