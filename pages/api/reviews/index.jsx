import nc from "next-connect";
import dbConnect from "../../../Backend/database/dbConnect.jsx";
import onError from "../../../Backend/middleWares/errors/error";
import { isAuthenticatedUser } from "../../../Backend/middleWares/auth.jsx";
import {
  createRoomReview,
  getRoomReviews,
  deleteReview,
} from "../../../Backend/controllers/reviewController.jsx";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(createRoomReview);

handler.use(isAuthenticatedUser).get(getRoomReviews);

handler.use(isAuthenticatedUser).delete(deleteReview);

export default handler;
