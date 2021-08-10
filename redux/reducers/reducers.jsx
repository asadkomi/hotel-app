import { combineReducers } from "redux";
import {
  allRoomsReducer,
  roomDetailsReducer,
  newRoomReducer,
  roomReducer,
} from "./domainReducers/roomReducers";
import {
  registerReducer,
  loadedUserReducer,
  userReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./domainReducers/userReducers.jsx";

import {
  checkBookingReducer,
  bookedDatesReducer,
  bookingsReducer,
  bookingDetailsReducer,
  bookingReducer,
} from "./domainReducers/bookingReducers.jsx";

import {
  newReviewReducer,
  checkReviewReducer,
  roomReviewsReducer,
  reviewReducer,
} from "./domainReducers/reviewReducers.jsx";

import { dashboardReducer } from "./domainReducers/dashboardReducers.jsx";

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  register: registerReducer,
  loadedUser: loadedUserReducer,
  user: userReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  booking: bookingReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducer,
  checkReview: checkReviewReducer,
  newRoom: newRoomReducer,
  room: roomReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  roomReviews: roomReviewsReducer,
  review: reviewReducer,
  dashboard: dashboardReducer,
});

export default reducer;
