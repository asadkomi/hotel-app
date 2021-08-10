/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import { toast } from "react-toastify";
import { clearErrors } from "../../../redux/actions/roomActions.jsx";
// import { Carousel } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useSnackbar } from "notistack";
import RoomAmenities from "./RoomAmenities.jsx";
import { Button } from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {
  checkBooking,
  getBookedDates,
} from "../../../redux/actions/bookingActions.jsx";
import { CHECK_BOOKING_RESET } from "../../../redux/types/bookingTypes.jsx";
import getStripe from "../../../utitlies/getStripe";
import Review from "../../review/Review.jsx";
import ListReviews from "../../review/ListReviews.jsx";
import { Typography } from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "../../../styles/style.jsx";
import { Grid, Card } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const RoomDetails = () => {
  const style = styles();
  const router = useRouter();
  const dispatch = useDispatch();

  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [daysOfStay, setDaysOfStay] = useState();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const { room, error } = useSelector((state) => state.roomDetails);
  const { user } = useSelector((state) => state.loadedUser);
  const { dates } = useSelector((state) => state.bookedDates);

  const { available, loading: bookingLoading } = useSelector(
    (state) => state.checkBooking
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const excludedDates = [];
  dates.forEach((date) => {
    excludedDates.push(new Date(date));
  });

  const onChange = (dates) => {
    const [checkInDate, checkOutDate] = dates;
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      const days = Math.floor(
        (new Date(checkOutDate) - new Date(checkInDate)) / 86400000 + 1
      );
      setDaysOfStay(days);
      dispatch(
        checkBooking(id, checkInDate.toISOString(), checkOutDate.toISOString())
      );
    }
  };

  const { id } = router.query;

  const newBookingHandler = async () => {
    const bookingData = {
      room: router.query.id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: 90,
      paymentInfo: {
        id: "STRIPE_PAYMENT_ID",
        status: "STRIPE_PAYMENT_STATUS",
      },
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/bookings", bookingData, config);

      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const bookRoom = async (id, price) => {
    // closeSnackbar();
    setPaymentLoading(true);
    const amount = price * daysOfStay;

    try {
      const link = `/api/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`;
      const { data } = await axios.get(link, { params: { amount } });
      console.log("data ======================>", data);
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId: data.id });

      setPaymentLoading(false);
    } catch (error) {
      setPaymentLoading(false);
      console.log("error=========>", error);
      toast.error(error.message);
      // enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  useEffect(() => {
    dispatch(getBookedDates(id));
    toast.error(error);
    // enqueueSnackbar(error, { variant: "error" });
    dispatch(clearErrors());

    return () => {
      dispatch({ type: CHECK_BOOKING_RESET });
    };
  }, [dispatch, id]);
  return (
    <>
      <Head>
        <title>{room.name}</title>
      </Head>
      <section className=" pb-5 w-100 " id="about">
        <div className="container pt-5">
          <div className="row">
            <div className="col-md">
              <Typography variant="h4">{room.name}</Typography>
              <div className="row pt-3">
                <div className="col-md">
                  <Typography>
                    <LocationOnIcon /> {room.address}
                  </Typography>
                </div>
                <div className="col-md text-sm-end">
                  <div className="ratings mt-auto mb-3">
                    <div className="r main-outer">
                      <div
                        className="main-inner"
                        style={{ width: `${(room.ratings / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span id="no_of_reviews">
                      ({room.numOfReviews} Reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md">
              <Carousel showArrows={true}>
                {room.images &&
                  room.images.map((image) => (
                    <div key={image._id}>
                      <img
                        // className="d-block m-auto"
                        src={image.url}
                        alt={room.name}
                        layout="cover"
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
          </div>

          <Grid container spacing={1}>
            <Grid item md={8} xs={12}>
              <Typography className="pb-3" variant="h4">
                Description
              </Typography>
              <Typography>{room.description}</Typography>
              <hr />
              <RoomAmenities room={room} />
              <hr />
              {room.reviews && room.reviews.length > 0 ? (
                <ListReviews reviews={room.reviews} />
              ) : (
                <Typography>
                  <b>No Reviews on this room</b>
                </Typography>
              )}
              <hr />
              <Review />
            </Grid>
            <Grid item md={4} xs={12}>
              <Card className="p-3">
                <Typography align="left" className="price-per-night">
                  <b>${room.price}</b> / night
                </Typography>
                <hr />
                <Typography align="left" className="mt-2 mb-3">
                  Pick Check In & Check Out Date
                </Typography>
                <DatePicker
                  // color="#972479"
                  style={{ color: "#972479" }}
                  className="w-100 mb-3 "
                  selected={checkInDate}
                  onChange={onChange}
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={new Date()}
                  excludeDates={excludedDates}
                  selectsRange
                  inline
                />
                {available === true && (
                  <div className="alert alert-success my-3 font-weight-bold">
                    Room is available. Book now.
                  </div>
                )}

                {available === false && (
                  <div className="alert alert-danger my-3 font-weight-bold">
                    Room not available. Try different dates.
                  </div>
                )}

                {available && !user && (
                  <div className="alert alert-danger my-3 font-weight-bold">
                    Login to book room.
                  </div>
                )}

                {available && user && (
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={() => bookRoom(room._id, room.price)}
                    disabled={bookingLoading || paymentLoading ? true : false}
                  >
                    Pay | ${daysOfStay * room.price}
                  </Button>
                )}
              </Card>
            </Grid>
          </Grid>
        </div>
      </section>
    </>
  );
};

export default RoomDetails;
