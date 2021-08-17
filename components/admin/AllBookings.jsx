import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminBookings,
  clearErrors,
  deleteBooking,
} from "../../redux/actions/bookingActions.jsx";
import VisibilityIcon from "@material-ui/icons/Visibility";
import GetAppIcon from "@material-ui/icons/GetApp";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import easyinvoice from "easyinvoice";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { DELETE_BOOKING_RESET } from "../../redux/types/bookingTypes.jsx";
import styles from "../../styles/style.jsx";

export default function AllBookings() {
  const style = styles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();
  const { bookings, error, loading } = useSelector((state) => state.bookings);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    dispatch(getAdminBookings());
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (deleteError) {
      enqueueSnackbar(deleteError, { variant: "error" });
      dispatch(clearErrors());
    }
    if (isDeleted) {
      router.push("/admin/bookings");
      dispatch({ type: DELETE_BOOKING_RESET });
    }
  }, [dispatch, deleteError, isDeleted, enqueueSnackbar, error, router]);

  const deleteBookingHandler = (id) => {
    dispatch(deleteBooking(id));
  };

  const downloadInvoice = async (booking) => {
    const data = {
      documentTitle: "Booking INVOICE",
      currency: "USD",
      taxNotation: "vat",
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo: "https://res.cloudinary.com/asadkomi/image/upload/v1628051734/logo2_rc6ski.png",
      sender: {
        company: "Hotels Co.",
        address: "124 Hyland Ave, Ames IA",
        zip: "50014",
        city: "Ames",
        country: "United States",
      },
      client: {
        company: `${booking.user.name}`,
        address: `${booking.user.email}`,
        zip: "",
        city: `Check In: ${new Date(booking.checkInDate).toLocaleString(
          "en-US"
        )}`,
        country: `Check In: ${new Date(booking.checkOutDate).toLocaleString(
          "en-US"
        )}`,
      },
      invoiceNumber: `${booking._id}`,
      invoiceDate: `${new Date(Date.now()).toLocaleString("en-US")}`,
      products: [
        {
          quantity: `${booking.daysOfStay}`,
          description: `${booking.room.name}`,
          tax: 0,
          price: booking.room.price,
        },
      ],
      bottomNotice:
        "This is auto generated Invoice of your booking on Hotels Co.",
    };

    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
  };

  return (
    <div className={style.dashboardSection}>
      <Grid container spacing={1} className="pb-3">
        <Grid item md={12} xs={12}>
          <List>
            <ListItem>
              <Typography className={style.typography}>Bookings</Typography>
            </ListItem>
          </List>
          <Divider />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item md={12} xs={12}>
          <List>
            <ListItem>
              <Typography className={style.typographyMain}>
                Number of bookings
                <span style={{ paddingLeft: "15px" }}>
                  {bookings && bookings.length}
                </span>
              </Typography>
              <div className={style.gap}></div>
            </ListItem>

            <ListItem>
              {loading && <CircularProgress></CircularProgress>}
              {error && (
                <Typography className={style.error}>{error}</Typography>
              )}
            </ListItem>

            <ListItem>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>NAME</TableCell>
                      <TableCell>CHECK IN</TableCell>
                      <TableCell>CHECK OUT</TableCell>
                      <TableCell>AMOUNT</TableCell>
                      <TableCell align="center">ACTIONS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings &&
                      bookings.map((booking) => (
                        <TableRow key={booking._id}>
                          <TableCell>{booking._id.substring(20, 24)}</TableCell>
                          <TableCell>
                            {booking.user ? booking.user.name : "DELETED USER"}
                          </TableCell>
                          <TableCell>{booking.checkInDate}</TableCell>
                          <TableCell>{booking.checkOutDate}</TableCell>
                          <TableCell align="center">
                            ${booking.amountPaid}
                          </TableCell>
                          <TableCell>
                            <Grid align="center" container spacing={2}>
                              <Grid item md={4} xs={4}>
                                <NextLink
                                  href={`/admin/bookings/${booking._id}`}
                                  passHref
                                >
                                  <Button>
                                    <VisibilityIcon />
                                  </Button>
                                </NextLink>
                              </Grid>
                              <Grid item md={4} xs={4}>
                                <Button
                                  onClick={() =>
                                    deleteBookingHandler(booking._id)
                                  }
                                >
                                  <DeleteSharpIcon />
                                </Button>
                              </Grid>
                              <Grid item md={4} xs={4}>
                                <Button
                                  onClick={() => downloadInvoice(booking)}
                                >
                                  <GetAppIcon />
                                </Button>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* )} */}
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
}
