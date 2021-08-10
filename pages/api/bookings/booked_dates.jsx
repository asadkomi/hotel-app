import nc from "next-connect";
import dbConnect from "../../../Backend/database/dbConnect.jsx";
import { checkBookedDatesOfRoom } from "../../../Backend/controllers/bookingController.jsx";
import onError from "../../../Backend/middleWares/errors/error.jsx";

const handler = nc({ onError });

dbConnect();

handler.get(checkBookedDatesOfRoom);

export default handler;
