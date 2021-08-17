import Room from "../models/room";
import User from "../models/user";
import Booking from "../models/booking";
import getRawBody from "raw-body";

import catchAsyncErrors from "../middleWares/errors/catchAsyncErrors";
import absoluteUrl from "next-absolute-url";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripCheckoutSession = catchAsyncErrors(async (req, res) => {
  // Get room details
<<<<<<< HEAD
=======

  console.log(
    "session started===============>",
    process.env.STRIPE_WEBHOOK_SECRET
  );
>>>>>>> stripe payment gateways fixed
  const room = await Room.findById(req.query.roomId);

  const { checkInDate, checkOutDate, daysOfStay } = req.query;

  // Get origin
  const { origin } = absoluteUrl(req);

  // Create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${origin}/bookings/user_bookings`,
    cancel_url: `${origin}/room/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: { checkInDate, checkOutDate, daysOfStay },
    line_items: [
      {
        name: room.name,
        images: [`${room.images[0].url}`],
        amount: req.query.amount * 100,
        currency: "usd",
        quantity: 1,
      },
    ],
  });

  res.status(200).json(session);
});

// Create new booking after payment   =>   /api/webhook
const webhookCheckout = catchAsyncErrors(async (req, res) => {
<<<<<<< HEAD
  if (req.method === "POST") {
    const rawBody = await getRawBody(req);
    const signature = req.headers["stripe-signature"];

    let event = Stripe.event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        "whsec_khQgTsj9GATLdBG1DNHEhFtFNr2hpE1M"
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        const room = session.client_reference_id;
        const user = (await User.findOne({ email: session.customer_email })).id;

        const amountPaid = session.amount_total / 100;

        const paymentInfo = {
          id: session.payment_intent,
          status: session.payment_status,
        };

        const checkInDate = session.metadata.checkInDate;
        const checkOutDate = session.metadata.checkOutDate;
        const daysOfStay = session.metadata.daysOfStay;

        const booking = await Booking.create({
          room,
          user,
          checkInDate,
          checkOutDate,
          daysOfStay,
          amountPaid,
          paymentInfo,
          paidAt: Date.now(),
        });

        res.status(200).json({ success: true });
      }
    } catch (error) {
      console.log("Error in Stripe Checkout Payment => ", error);
    }
=======
  console.log(
    "webhookCheckout===============>",
    process.env.STRIPE_WEBHOOK_SECRET
  );

  const rawBody = await getRawBody(req);

  try {
    const signature = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const room = session.client_reference_id;
      const user = (await User.findOne({ email: session.customer_email })).id;

      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const checkInDate = session.metadata.checkInDate;
      const checkOutDate = session.metadata.checkOutDate;
      const daysOfStay = session.metadata.daysOfStay;

      const booking = await Booking.create({
        room,
        user,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });

      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log("Error in Stripe Checkout Payment => ", error);
>>>>>>> stripe payment gateways fixed
  }
});

export { stripCheckoutSession, webhookCheckout };
