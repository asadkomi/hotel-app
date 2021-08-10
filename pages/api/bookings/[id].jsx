import nc from "next-connect";
import dbConnect from "../../../Backend/database/dbConnect.jsx";
import { getBookingDetails } from "../../../Backend/controllers/bookingController.jsx";
import { isAuthenticatedUser } from "../../../Backend/middleWares/auth.jsx";
import onError from "../../../Backend/middleWares/errors/error.jsx";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(getBookingDetails);

export default handler;
