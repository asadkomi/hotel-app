import {
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAIL,
  CLEAR_ERRORS,
} from "../../types/dashboardTypes";

export const dashboardReducer = (state = { summary: [] }, action) => {
  switch (action.type) {
    case DASHBOARD_REQUEST:
      return {
        loading: true,
      };

    case DASHBOARD_SUCCESS:
      return {
        loading: false,
        summary: action.payload.summary,
        salesData: action.payload.salesData,
        roomsCount: action.payload.roomsCount,
        usersCount: action.payload.usersCount,
        bookingsCount: action.payload.bookingsCount,
        bookingsPrice: action.payload.bookingsPrice,
        users: action.payload.users,
      };

    case DASHBOARD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
