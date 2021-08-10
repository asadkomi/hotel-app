import nc from "next-connect";
import dbConnect from "../../../Backend/database/dbConnect.jsx";
import onError from "../../../Backend/middleWares/errors/error";
import { isAuthenticatedUser } from "../../../Backend/middleWares/auth.jsx";
import { checkReviewAvailability } from "../../../Backend/controllers/reviewController.jsx";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(checkReviewAvailability);

export default handler;
