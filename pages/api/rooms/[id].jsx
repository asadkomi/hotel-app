import nextConnect from "next-connect";
import dbConnect from "../../../Backend/database/dbConnect.jsx";
import {
  getOneRoom,
  updateRoom,
  deleteRoom,
} from "../../../Backend/controllers/roomController.jsx";
import onError from "../../../Backend/middleWares/errors/error";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../Backend/middleWares/auth.jsx";

const handler = nextConnect({ onError });
dbConnect();

handler.get(getOneRoom);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).put(updateRoom);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteRoom);

export default handler;
