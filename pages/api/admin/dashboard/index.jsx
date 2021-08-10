import nc from "next-connect";
import dbConnect from "../../../../Backend/database/dbConnect.jsx";
import { getDashboard } from "../../../../Backend/controllers/dashboardController.jsx";
import onError from "../../../../Backend/middleWares/errors/error.jsx";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../Backend/middleWares/auth.jsx";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(getDashboard);

export default handler;
