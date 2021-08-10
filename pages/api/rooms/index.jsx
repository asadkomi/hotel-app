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
import { v2 as cloudinary } from "cloudinary";

console.log("env ===============>", process.env.STRIPE_API_KEY);
const handler = nextConnect({ onError });
dbConnect();

handler.get(getAllRooms);
handler.use(isAuthenticatedUser, authorizeRoles("admin")).post(newRoom);

export default handler;
