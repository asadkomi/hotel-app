import nc from "next-connect";

import dbConnect from "../../Backend/database/dbConnect";
import { webhookCheckout } from "../../Backend/controllers/stripeController";

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
