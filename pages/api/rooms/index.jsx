import nextConnect from "next-connect";
import dbConnect from "../../../Backend/database/dbConnect.jsx";
import {
  getAllRooms,
  createRoom,
} from "../../../Backend/controllers/roomController.jsx";

const handler = nextConnect();
dbConnect();

handler.get(getAllRooms);
handler.post(createRoom);

export default handler;
