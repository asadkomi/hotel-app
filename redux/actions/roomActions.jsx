import axios from "axios";
import absoluteUrl from "next-absolute-url";

import {
  ALL_ROOMS_SUCCESS,
  ALL_ROOMS_FAIL,
  ROOMS_DETAILS_SUCCESS,
  ROOMS_DETAILS_FAIL,
  ADMIN_ROOMS_REQUEST,
  ADMIN_ROOMS_SUCCESS,
  ADMIN_ROOMS_FAIL,
  NEW_ROOM_REQUEST,
  NEW_ROOM_SUCCESS,
  NEW_ROOM_RESET,
  NEW_ROOM_FAIL,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS,
  UPDATE_ROOM_RESET,
  UPDATE_ROOM_FAIL,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_RESET,
  DELETE_ROOM_FAIL,
  CLEAR_ERRORS,
} from "../types/roomTypes";

export const getRooms =
  (req, currentPage = 1, location = "", guests, category) =>
  async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req);

      let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`;

      if (guests) link = link.concat(`&guestCapacity=${guests}`);
      if (category) link = link.concat(`&category=${category}`);

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_ROOMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ROOMS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getRoomDetails = (req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    let url;

    if (req) {
      url = `${origin}/api/rooms/${id}`;
    } else {
      url = `/api/rooms/${id}`;
    }

    const { data } = await axios.get(url);

    dispatch({
      type: ROOMS_DETAILS_SUCCESS,
      payload: data.room,
    });
  } catch (error) {
    dispatch({
      type: ROOMS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminRooms = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ROOMS_REQUEST });

    const { data } = await axios.get(`/api/admin/rooms`);

    dispatch({
      type: ADMIN_ROOMS_SUCCESS,
      payload: data.rooms,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: ADMIN_ROOMS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const newRoom = (roomData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ROOM_REQUEST });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/rooms`, roomData, config);

    dispatch({
      type: NEW_ROOM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateRoom = (id, roomData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ROOM_REQUEST });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/rooms/${id}`, roomData, config);

    dispatch({
      type: UPDATE_ROOM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteRoom = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ROOM_REQUEST });

    const { data } = await axios.delete(`/api/rooms/${id}`);

    dispatch({
      type: DELETE_ROOM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ROOM_FAIL,
      payload: error.response.data.message,
    });
  }
};
