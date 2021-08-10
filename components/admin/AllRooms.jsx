import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import NextLink from "next/link";
import { toast } from "react-toastify";
import { getAdminRooms, deleteRoom } from "../../redux/actions/roomActions.jsx";
import { DELETE_ROOM_RESET } from "../../redux/types/roomTypes.jsx";
import styles from "../../styles/style.jsx";
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
  Tooltip,
  Divider,
} from "@material-ui/core";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import RateReviewIcon from "@material-ui/icons/RateReview";
import AddIcon from "@material-ui/icons/Add";

export default function AllRooms() {
  const style = styles();
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, rooms } = useSelector((state) => state.allRooms);
  const { error: deleteError, isDeleted } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getAdminRooms());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.erroe(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      router.push("/admin/rooms");
      dispatch({ type: DELETE_ROOM_RESET });
    }
  }, [dispatch, deleteError, isDeleted]);

  const deleteRoomHandler = (id) => {
    dispatch(deleteRoom(id));
  };

  return (
    <div className={style.dashboardSection}>
      <Grid container spacing={1} className="pb-3">
        <Grid item md={12} xs={12}>
          <List>
            <ListItem>
              <Typography className={style.typography}>Rooms</Typography>
              <div className={style.gap}></div>

              <NextLink href="/admin/rooms/new-room" passHref>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#972479",
                    color: "#fff",
                    textTransform: "none",
                    margin: "0",
                  }}
                >
                  <AddIcon /> New Room
                </Button>
              </NextLink>
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
                Number of rooms
                <span style={{ paddingLeft: "15px" }}>
                  {rooms && rooms.length}
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
                      <TableCell>PRICE</TableCell>
                      <TableCell>CATEGORY</TableCell>

                      <TableCell align="center">ACTIONS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rooms &&
                      rooms.map((room) => (
                        <TableRow key={room._id}>
                          <TableCell>{room._id.substring(20, 24)}</TableCell>
                          <TableCell>{room.name}</TableCell>
                          <TableCell align="center">${room.price}</TableCell>
                          <TableCell align="center">{room.category}</TableCell>

                          <TableCell>
                            <Grid container spacing={2}>
                              <Grid item md={4}>
                                <NextLink
                                  href={`/admin/reviews/${room._id}`}
                                  passHref
                                >
                                  <Tooltip title="Reviews">
                                    <Button>
                                      <RateReviewIcon />
                                    </Button>
                                  </Tooltip>
                                </NextLink>
                              </Grid>
                              <Grid item md={4}>
                                <NextLink
                                  href={`/admin/rooms/${room._id}`}
                                  passHref
                                >
                                  <Tooltip title="Edit Room">
                                    <Button>
                                      <EditSharpIcon />
                                    </Button>
                                  </Tooltip>
                                </NextLink>
                              </Grid>
                              <Grid item md={4}>
                                <Tooltip title="Delete">
                                  <Button
                                    onClick={() => deleteRoomHandler(room._id)}
                                  >
                                    <DeleteSharpIcon />
                                  </Button>
                                </Tooltip>
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
        </Grid>
      </Grid>
    </div>
    //   </div>
    // </main>
  );
}
