import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAIL,
  CLEAR_ERRORS,
} from "../types/dashboardTypes.jsx";

export const getDashboard = () => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_REQUEST });

    const { data } = await axios.get(`/api/admin/dashboard`);

    dispatch({
      type: DASHBOARD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: DASHBOARD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
