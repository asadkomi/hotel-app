import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer } from "react";
import MoreSharpIcon from "@material-ui/icons/MoreSharp";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../redux/actions/bookingActions.jsx";
import VisibilityIcon from "@material-ui/icons/Visibility";
import GetAppIcon from "@material-ui/icons/GetApp";
import easyinvoice from "easyinvoice";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

import styles from "../../styles/style.jsx";

export default function MyBookings() {
  const style = styles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { bookings, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    closeSnackbar();
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors);
    }
  }, [dispatch]);

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
    <div className={style.section}>
      <Grid container spacing={1}>
        <Grid item md={2} xs={12}>
          <Card>
            <List>
              <NextLink href="/profile/profile" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Profile"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/bookings/user_bookings" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Bookings"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={10} xs={12}>
          <Card className="pb-5">
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Bookings
                </Typography>
              </ListItem>

              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>CHECK IN</TableCell>
                        <TableCell>CHECK OUT</TableCell>
                        <TableCell>AMOUNT</TableCell>
                        <TableCell align="center">ACTIONS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking._id}>
                          <TableCell>{booking._id.substring(20, 24)}</TableCell>
                          {/* <TableCell>
                            {booking.user ? booking.user.name : "DELETED USER"}
                          </TableCell> */}
                          <TableCell>{booking.checkInDate}</TableCell>
                          <TableCell>{booking.checkOutDate}</TableCell>
                          <TableCell>{booking.amountPaid}</TableCell>
                          <TableCell>
                            <Grid container spacing={2}>
                              <Grid item md={6}>
                                <NextLink
                                  href={`/bookings/${booking._id}`}
                                  passHref
                                >
                                  <Button>
                                    <VisibilityIcon />
                                  </Button>
                                </NextLink>
                              </Grid>
                              <Grid item md={6}>
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
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
