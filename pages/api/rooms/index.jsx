import nextConnect from "next-connect";
import dbConnect from "../../../Backend/database/dbConnect.jsx";
import {
  getAllRooms,
  newRoom,
} from "../../../Backend/controllers/roomController";
import onError from "../../../Backend/middleWares/errors/error";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../Backend/middleWares/auth.jsx";

const handler = nextConnect({ onError });
dbConnect();

handler.get(getAllRooms);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).post(newRoom);

export default handler;
