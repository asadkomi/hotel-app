import nextConnect from "next-connect";
import dbConnect from "../../../Backend/database/dbConnect.jsx";
import { getAllRooms } from "../../../Backend/api/roomController.jsx";

const handler = nextConnect();
dbConnect();

handler.get(getAllRooms);

export default handler;
