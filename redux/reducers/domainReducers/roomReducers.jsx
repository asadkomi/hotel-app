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
} from "../../types/roomTypes";

export const allRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ADMIN_ROOMS_REQUEST:
      return {
        loading: true,
      };

    case ALL_ROOMS_SUCCESS:
      return {
        roomsCount: action.payload.roomsCount,
        // resPerPage: action.payload.resPerPage,
        // filteredRoomsCount: action.payload.filteredRoomsCount,
        rooms: action.payload.rooms,
      };

    case ADMIN_ROOMS_SUCCESS:
      return {
        loading: false,
        rooms: action.payload,
      };

    case ALL_ROOMS_FAIL:
    case ADMIN_ROOMS_FAIL:
      return {
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

export const roomDetailsReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case ROOMS_DETAILS_SUCCESS:
      return {
        room: action.payload,
      };

    case ROOMS_DETAILS_FAIL:
      return {
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

export const newRoomReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case NEW_ROOM_REQUEST:
      return {
        loading: true,
      };

    case NEW_ROOM_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        room: action.payload.room,
      };

    case NEW_ROOM_RESET:
      return {
        success: false,
      };

    case NEW_ROOM_FAIL:
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

export const roomReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ROOM_REQUEST:
    case DELETE_ROOM_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_ROOM_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ROOM_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ROOM_RESET:
      return {
        isUpdated: false,
      };

    case DELETE_ROOM_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case UPDATE_ROOM_FAIL:
    case DELETE_ROOM_FAIL:
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
