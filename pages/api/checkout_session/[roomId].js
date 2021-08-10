import nc from "next-connect";
import dbConnect from "../../../Backend/database/dbConnect.jsx";
import { stripCheckoutSession } from "../../../Backend/controllers/stripeController.jsx";
import { isAuthenticatedUser } from "../../../Backend/middleWares/auth.jsx";
import onError from "../../../Backend/middleWares/errors/error";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(stripCheckoutSession);

export default handler;
