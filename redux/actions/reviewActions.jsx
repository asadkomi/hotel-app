import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAIL,
  REVIEW_AVAILABILITY_REQUEST,
  REVIEW_AVAILABILITY_SUCCESS,
  REVIEW_AVAILABILITY_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../types/reviewTypes.jsx";

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/reviews`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const checkReviewAvailability = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_AVAILABILITY_REQUEST });

    const { data } = await axios.get(
      `/api/reviews/check_reviews?roomId=${roomId}`
    );

    dispatch({
      type: REVIEW_AVAILABILITY_SUCCESS,
      payload: data.isReviewAvailable,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_AVAILABILITY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getRoomReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });

    const { data } = await axios.get(`/api/reviews/?id=${id}`);

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteReview = (id, roomId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/reviews/?id=${id}&roomId=${roomId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
