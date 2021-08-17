/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import DatePicker from "react-datepicker";
import { useSnackbar } from "notistack";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { Typography, Button, Grid, Card } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { clearErrors } from "../../../redux/actions/roomActions";
import RoomAmenities from "./RoomAmenities";
import {
  checkBooking,
  getBookedDates,
} from "../../../redux/actions/bookingActions";
import { CHECK_BOOKING_RESET } from "../../../redux/types/bookingTypes";
import getStripe from "../../../utitlies/getStripe";
import Review from "../../review/Review";
import ListReviews from "../../review/ListReviews";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../../styles/style";

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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { id } = router.query;
  const { available, loading: bookingLoading } = useSelector(
    (state) => state.checkBooking
  );

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

  const bookRoom = async (id, price) => {
    closeSnackbar();
    setPaymentLoading(true);
    const amount = price * daysOfStay;

    try {
      const link = `/api/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`;
      const { data } = await axios.get(link, { params: { amount } });

      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId: data.id });

      setPaymentLoading(false);
    } catch (error) {
      setPaymentLoading(false);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  useEffect(() => {
    dispatch(getBookedDates(id));

    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    return () => {
      dispatch({ type: CHECK_BOOKING_RESET });
    };
  }, [dispatch, id, error, enqueueSnackbar]);
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
                      <img src={image.url} alt={room.name} layout="cover" />
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
