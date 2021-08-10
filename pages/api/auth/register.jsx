import nc from "next-connect";
import dbConnect from "../../../Backend/database/dbConnect.jsx";

import { registerUser } from "../../../Backend/controllers/userController.jsx";

import onError from "../../../Backend/middleWares/errors/error.jsx";

const handler = nc({ onError });

dbConnect();

handler.post(registerUser);

export default handler;
