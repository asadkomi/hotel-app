import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  newReview,
  checkReviewAvailability,
  clearErrors,
} from "../../redux/actions/reviewActions.jsx";
import { NEW_REVIEW_RESET } from "../../redux/types/reviewTypes.jsx";
import { useSnackbar } from "notistack";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import styles from "../../styles/style.jsx";

import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const Review = () => {
  const style = styles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { error, success } = useSelector((state) => state.newReview);
  const { reviewAvailable } = useSelector((state) => state.checkReview);

  const { id } = router.query;

  useEffect(() => {
    if (id !== undefined) {
      dispatch(checkReviewAvailability(id));
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      enqueueSnackbar("Review is posted.", { variant: "success" });
      dispatch({ type: NEW_REVIEW_RESET });

      router.push(`/room/${id}`);
    }
  }, [dispatch, success, error, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const reviewData = {
      rating,
      comment,
      roomId: id,
    };

    dispatch(newReview(reviewData));
    setOpen(false);
    setComment("");
    setRating(0);
  };

  return (
    <>
      {reviewAvailable && (
        <div className="pb-5">
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Submit a review
          </Button>
        </div>
      )}

      <Modal
        id="ratingModal"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={style.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={style.paper}>
            <Typography className="pb-3" variant="h6">
              Write a review
            </Typography>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating
                size="large"
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Box>
            <Box>
              <textarea
                name="review"
                id="review"
                className="form-control mt-1"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>

              <div className="pt-3">
                <Button
                  // className="btn  float-right review-btn px-4 text-white"
                  color="primary"
                  variant="contained"
                  onClick={submitHandler}
                >
                  Submit
                </Button>
              </div>
            </Box>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default Review;
