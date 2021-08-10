import nc from "next-connect";
import dbConnect from "../../Backend/database/dbConnect.jsx";
import { webhookCheckout } from "../../Backend/controllers/stripeController.jsx";
import onError from "../../Backend/middleWares/errors/error";

const handler = nc({ onError });

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(webhookCheckout);

export default handler;
