import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getRoomReviews,
  deleteReview,
  clearErrors,
} from "../../redux/actions/reviewActions.jsx";
import { DELETE_REVIEW_RESET } from "../../redux/types/reviewTypes.jsx";
import styles from "../../styles/style.jsx";
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
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";

export default function RoomReviews() {
  const style = styles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [roomId, setRoomId] = useState("");

  const { loading, error, reviews } = useSelector((state) => state.roomReviews);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { id } = router.query;

  useEffect(() => {
    dispatch(getRoomReviews(id));
    setRoomId(id);

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, roomId, error, deleteError, isDeleted]);

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, roomId));
  };

  return (
    <div className={style.dashboardSection}>
      <Grid container spacing={1} className="pb-3">
        <Grid item md={12} xs={12}>
          <List>
            <ListItem>
              <Typography className={style.typography}>
                Rooms / Reviews
              </Typography>
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
                Number of reviews
                <span style={{ paddingLeft: "20px" }}>
                  {reviews && reviews.length}
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
            <Divider />
            <ListItem>
              <Typography className={style.error}>{error}</Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>USER</TableCell>
                      <TableCell>COMMENT</TableCell>
                      <TableCell>RATING</TableCell>
                      <TableCell>ACTIONS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reviews &&
                      reviews.map((reveiw) => (
                        <TableRow key={reveiw._id}>
                          <TableCell>{reveiw._id.substring(20, 24)}</TableCell>
                          <TableCell>{reveiw.name}</TableCell>
                          <TableCell>{reveiw.comment}</TableCell>
                          <TableCell>{reveiw.rating}</TableCell>

                          <TableCell>
                            <Grid container spacing={1}>
                              <Grid item>
                                <Button
                                  onClick={() =>
                                    deleteReviewHandler(reveiw._id)
                                  }
                                >
                                  <DeleteSharpIcon />
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
        </Grid>
      </Grid>
    </div>
  );
}
