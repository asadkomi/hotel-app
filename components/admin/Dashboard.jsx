import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import NextLink from "next/link";
import { toast } from "react-toastify";
import { getDashboard } from "../../redux/actions/dashboardActions.jsx";

import styles from "../../styles/style.jsx";
import { Bar } from "react-chartjs-2";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  CardContent,
  CardActions,
  Divider,
} from "@material-ui/core";

export default function Dashboard() {
  const style = styles();
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading,
    error,
    salesData,
    roomsCount,
    usersCount,
    bookingsCount,
    bookingsPrice,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboard());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch]);

  return (
    <div className={style.dashboardSection}>
      <Grid container spacing={1} className="pb-3">
        <Grid item md={12} xs={12}>
          <List>
            <ListItem>
              <Typography className={style.typography}>Dashboard</Typography>
              <div className={style.gap}></div>
            </ListItem>
          </List>
          <Divider />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item md={12} xs={12}>
          <List>
            <ListItem>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography className={style.error}>{error}</Typography>
              ) : (
                <Grid container spacing={1}>
                  <Grid item md={3} xs={12}>
                    <Card
                      style={{ backgroundColor: "#ec407a", color: "#fff" }}
                      raised
                    >
                      <CardContent>
                        <Typography variant="h5">${bookingsPrice}</Typography>
                        <Typography>Sales</Typography>
                      </CardContent>
                      <CardActions>
                        <NextLink href="/admin/bookings" passHref>
                          <Button size="small" color="primary">
                            View sales
                          </Button>
                        </NextLink>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <Card
                      raised
                      style={{ backgroundColor: "#2196f3", color: "#fff" }}
                    >
                      <CardContent>
                        <Typography variant="h5">{bookingsCount}</Typography>
                        <Typography>Bookings</Typography>
                      </CardContent>
                      <CardActions>
                        <NextLink href="/admin/bookings" passHref>
                          <Button size="small" color="primary">
                            View bookings
                          </Button>
                        </NextLink>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <Card
                      raised
                      style={{ backgroundColor: "#43a047", color: "#fff" }}
                    >
                      <CardContent>
                        <Typography variant="h5">{roomsCount}</Typography>
                        <Typography>Rooms</Typography>
                      </CardContent>
                      <CardActions>
                        <NextLink href="/admin/rooms" passHref>
                          <Button size="small" color="primary">
                            View Room
                          </Button>
                        </NextLink>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <Card
                      raised
                      style={{ backgroundColor: "#ef6c00", color: "#fff" }}
                    >
                      <CardContent>
                        <Typography variant="h5">{usersCount}</Typography>
                        <Typography>Users</Typography>
                      </CardContent>
                      <CardActions>
                        <NextLink href="/admin/users" passHref>
                          <Button size="small" color="primary">
                            View users
                          </Button>
                        </NextLink>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              )}
            </ListItem>
            <ListItem>
              <Typography variant="h5">Sales Chart</Typography>
            </ListItem>

            <ListItem>
              <Bar
                data={{
                  labels: salesData && salesData.map((x) => x._id),
                  datasets: [
                    {
                      label: "Sales",
                      backgroundColor: "rgba(162, 222, 208, 1)",
                      data: salesData && salesData.map((x) => x.totalSales),
                    },
                  ],
                }}
                options={{
                  legend: { display: true, position: "left" },
                }}
              ></Bar>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
}
