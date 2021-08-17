import nc from "next-connect";
<<<<<<< HEAD
import dbConnect from "../../Backend/database/dbConnect.jsx";
import { webhookCheckout } from "../../Backend/controllers/stripeController.jsx";
=======
import dbConnect from "../../Backend/database/dbConnect";
import { webhookCheckout } from "../../Backend/controllers/stripeController";
>>>>>>> stripe payment gateways fixed
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
