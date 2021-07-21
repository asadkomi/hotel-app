import nextConnect from "next-connect";
import dbConnect from "../../../Backend/database/dbConnect.jsx";
import {
  getOneRoom,
  updateRoom,
  deleteRoom,
} from "../../../Backend/controllers/roomController.jsx";

const handler = nextConnect();
dbConnect();

handler.get(getOneRoom);
handler.put(updateRoom);
handler.delete(deleteRoom);

export default handler;
