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
} from "../../types/reviewTypes.jsx";

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        loading: true,
      };

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case NEW_REVIEW_RESET:
      return {
        success: false,
      };

    case NEW_REVIEW_FAIL:
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

export const checkReviewReducer = (
  state = { reviewAvailable: null },
  action
) => {
  switch (action.type) {
    case REVIEW_AVAILABILITY_REQUEST:
      return {
        loading: true,
      };

    case REVIEW_AVAILABILITY_SUCCESS:
      return {
        loading: false,
        reviewAvailable: action.payload,
      };

    case REVIEW_AVAILABILITY_FAIL:
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

export const roomReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return {
        loading: true,
      };

    case GET_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };

    case GET_REVIEWS_FAIL:
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

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        loading: true,
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_REVIEW_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_REVIEW_FAIL:
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
