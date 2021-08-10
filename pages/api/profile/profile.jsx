import nextConnect from "next-connect";
import dbConnect from "../../../Backend/database/dbConnect.jsx";
import { userProfile } from "../../../Backend/controllers/userController";
import onError from "../../../Backend/middleWares/errors/error";
import { isAuthenticatedUser } from "../../../Backend/middleWares/auth.jsx";

const handler = nextConnect({ onError });
dbConnect();

handler.use(isAuthenticatedUser).put(userProfile);

export default handler;
