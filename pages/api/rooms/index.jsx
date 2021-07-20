import nextConnect from "next-connect";
import { getAllRooms } from "../../../Backend/api/roomController.jsx";

const handler = nextConnect();
handler.get(getAllRooms);

export default handler;
